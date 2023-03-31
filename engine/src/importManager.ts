import { Component, GameObjectBase, System } from "./ecs.js";
import { PrefabFactory } from "./prefabs.js";
import { PostProcess } from "./renderer/post_process.js";
import { TypedConstructor } from "./typedConstructor.js";
import { StringUtils } from "./utils/baseutils.js";

const nw = (window as any).nw;
let fs;
if (nw) {
    fs = nw.require("fs");
} else {
    fs = require("fs");
}

class ProjectFiles {
    project: string;
    scripts: string[];
    scenes: string[];
    prefabs: string[];

    constructor() {
        this.project = null;
        this.scripts = [];
        this.scenes = [];
        this.prefabs = [];
    }

    combine(other: ProjectFiles) {
        this.project = other.project || this.project;
        this.scripts.push(...other.scripts);
        this.scenes.push(...other.scenes);
        this.prefabs.push(...other.prefabs);
    }
}

type ImportType = Component | System | GameObjectBase | PostProcess;

class ImportRecord {
    name: string;
    map: Map<string, TypedConstructor<ImportType>>;
    type: string;

    constructor(name: string, map: Map<string, TypedConstructor<ImportType>>, type: string) {
        this.name = name;
        this.map = map;
        this.type = type;
    }

    remove() {
        this.map.delete(this.name);
    }
}

export class ImportManager {
    private static components = new Map<string, TypedConstructor<Component>>();
    private static systems = new Map<string, TypedConstructor<System>>();
    private static entities = new Map<string, TypedConstructor<GameObjectBase>>();
    private static shaders = new Map<string, TypedConstructor<PostProcess>>();

    private static cached_imports = new Map<string, ImportRecord>();
    
    static getFilePaths(srcPath: string) {
        function getScripts(srcPath: string, relPath: string) {
            const files = fs.readdirSync(srcPath + relPath) as string[];
            const projFiles = new ProjectFiles();

            files.forEach((file) => {
                // if its a folder, recursively search it for scripts
                if (fs.lstatSync(srcPath + relPath + file).isDirectory()) {
                    projFiles.combine(getScripts(srcPath, relPath + file + "/"));
                } 
                
                // otherwise append the script with its relative path
                else {
                    const fileName = file.split(".")[0];
                    if (StringUtils.isPostfix(file, ".js")) {
                        projFiles.scripts.push(relPath + fileName);
                    }
                    else if (StringUtils.isPostfix(file, ".proj")) {
                        if (projFiles.project) {
                            console.trace(`Error: multiple project files found in ${srcPath + relPath}`);
                            return;
                        }
                        projFiles.project = relPath + fileName;
                    }
                    else if (StringUtils.isPostfix(file, ".scene")) {
                        projFiles.scenes.push(relPath + fileName);
                    }
                    else if (StringUtils.isPostfix(file, ".prefab")) {
                        projFiles.prefabs.push(relPath + fileName);
                    }
                }
            });
            
            return projFiles;
        }
        
        return getScripts(srcPath, "");
    }
    
    /**
    * Get the relevant import map for an import. i.e. if the default import is a component, then return the component map.
    */
    static getMapFromImport(imp: any) {
        // need to use the prototype of the class with `instanceof` because it's not an instance of the class yet
        if (imp.prototype instanceof Component)
            return this.components;
        else if (imp.prototype instanceof System)
            return this.systems;
        else if (imp.prototype instanceof GameObjectBase)
            return this.entities;
        else if (imp.prototype instanceof PostProcess)
            return this.shaders;
        else
            console.trace(`Error importing ${imp.name}: invalid script class: ${imp.prototype.name}`);
            return undefined;
    }

    static getScriptTypeFromImport(imp: any) {
        if (imp.prototype instanceof Component)
            return "component";
        else if (imp.prototype instanceof System)
            return "system";
        else if (imp.prototype instanceof GameObjectBase)
            return "entity";
        else if (imp.prototype instanceof PostProcess)
            return "shader";
        else
            console.trace(`Error importing ${imp.name}: invalid script class: ${imp.prototype.name}`);
            return undefined;
    }
    
    static async importProjectScripts(project: string, mode = "dev") {
        let scripts: string[];
        let projFiles: ProjectFiles;
        try {
            // note that the fs reading will occur from the apps working directory, 
            // whereas the dynamic importing is done from the engine's src directory, hence the paths differ
            projFiles = this.getFilePaths(`./projects/${project}/`);
            scripts = projFiles.scripts;
        } catch (e) {
            console.trace(e);
            return;
        }

        // await the import of all scripts before loading prefabs
        await Promise.all(scripts.map((script) => this.importScript(project, script, mode)));

        // load prefabs once all scripts have been loaded
        for (const prefab of projFiles.prefabs) {
            PrefabFactory.loadPrefab(`./projects/${project}/` + prefab + ".prefab");
        }
    }

    static async importScript(project: string, script: string, mode = "dev") {
        let a: any;
        if (mode === "dev") {
            a = await import(/* webpackIgnore: true */`./projects/${project}/${script}.js?${Date.now()}`);
        } else if (mode === "built") {
            /* adding a query string to the end of the import path forces the browser to reload the script
            this is necessary because the browser caches scripts, so if you change a script and reload the page,
            the browser will still use the cached version of the script */
            a = await import(/* webpackIgnore: true */ `../projects/${project}/${script}.js?${Date.now()}`);
        } else if (mode === "test") {
            a = await import(`../../tests/projects/${project}/${script}.js`);
        } else {
            console.trace(`Error: invalid mode '${mode}'`);
            return;
        }
        const typed_constr = new TypedConstructor(a.default.arg_names, a.default.arg_types, a.default);
        // work out what kind of script this is (component, system, etc.)
        const map = this.getMapFromImport(a.default);
        if (map) {
            // we know the types are correct here if map exists (see getMapFromImport), so we can use map as any
            (map as any).set(a.default.name, typed_constr);
            const record = new ImportRecord(a.default.name, map, this.getScriptTypeFromImport(a.default));
            this.cached_imports.set(script, record);
        }
    }

    static removeScript(script: string) {
        const record = this.cached_imports.get(script);
        if (record) {
            record.remove();
        }
        this.cached_imports.delete(script);
    }

    static getRecord(script: string) {
        return this.cached_imports.get(script);
    }


    static async importGameScripts() {
        let scripts: string[];
        let projFiles: ProjectFiles;
        try {
            projFiles = this.getFilePaths("./game/");
            scripts = projFiles.scripts;
        } catch (e) {
            console.trace(e);
            return;
        }

        // dynamically import the default exports of the script
        for (const script of scripts) {
            const a = await import(/* webpackIgnore: true */ `../game/${script}.js`);
            const typed_constr = new TypedConstructor(a.default.arg_names, a.default.arg_types, a.default);
            // work out what kind of script this is (component, system, etc.)
            const map = this.getMapFromImport(a.default);
            if (map) {
                // we know the types are correct here if map exists (see getMapFromImport), so we can use map as any
                (map as any).set(a.default.name, typed_constr);
            }
        }

        // load prefabs once all scripts have been loaded
        for (const prefab of projFiles.prefabs) {
            PrefabFactory.loadPrefab(`./game/` + prefab + ".prefab");
        }
    }

    static getComponent(component: string): TypedConstructor<Component> {
        if (this.components.has(component))
            return this.components.get(component);
        console.trace("Cannot find component '" + component + "'.");
        return null;
    }
    static hasComponent(component: string): boolean {
        return this.components.has(component);
    }
    static getAllComponents(): string[] {
        return Array.from(this.components.keys());
    }

    static getSystem(system: string): TypedConstructor<System> {
        if (this.systems.has(system)) return this.systems.get(system);
        console.trace("Cannot find system '" + system + "'.");
        return null;
    }
    static hasSystem(system: string): boolean {
        return this.systems.has(system);
    }

    static getEntity(entity: string): TypedConstructor<GameObjectBase> {
        if (this.entities.has(entity)) return this.entities.get(entity);
        console.trace("Cannot find entity '" + entity + "'.");
        return null;
    }
    static hasEntity(entity: string): boolean {
        return this.entities.has(entity);
    }
    static getAllEntities(): string[] {
        return Array.from(this.entities.keys());
    }

    static getShader(shader: string): TypedConstructor<PostProcess> {
        if (this.shaders.has(shader)) return this.shaders.get(shader);
        console.trace("Cannot find shader '" + shader + "'.");
        return null;
    }
    static hasShader(shader: string): boolean {
        return this.shaders.has(shader);
    }
}

/**
* Import user scripts for given project name. For use in app context only, for built game imports, see `doGameImports()`.   
* **NOTE:** This function assumes the relative path of the project to the engine source will be `../../pixelot/projects/<project>`
*/
export async function doProjectImports(project: string, mode = "dev") {
    await ImportManager.importProjectScripts(project, mode);
}

/**
 * Import all scripts for the game. For use in built game context only, for app imports, see `doProjectImports()`.
 */
export async function doGameImports() {
    await ImportManager.importGameScripts();
}
