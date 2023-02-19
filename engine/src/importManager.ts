import { Component, GameObjectBase, System } from "./ecs.js";
import { PostProcess } from "./renderer/post_process.js";
import { TypedConstructor } from "./typedConstructor.js";
import { StringUtils } from "./utils/baseutils.js";

const nw = (window as any).nw;
const fs = nw.require("fs");

class ProjectFiles {
    project: string;
    scripts: string[];
    scenes: string[];

    constructor() {
        this.project = null;
        this.scripts = [];
        this.scenes = [];
    }

    combine(other: ProjectFiles) {
        this.project = other.project || this.project;
        this.scripts.push(...other.scripts);
        this.scenes.push(...other.scenes);
    }
}

export class ImportManager {
    private static components = new Map<string, TypedConstructor<Component>>();
    private static systems = new Map<string, TypedConstructor<System>>();
    private static entities = new Map<string, TypedConstructor<GameObjectBase>>();
    private static shaders = new Map<string, TypedConstructor<PostProcess>>();
    
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
    
    static async importProjectScripts(project: string) {
        let scripts: string[];
        try {
            // note that the fs reading will occur from the apps working directory, 
            // whereas the dynamic importing is done from the engine's src directory, hence the paths differ
            scripts = this.getFilePaths(`./projects/${project}/`).scripts;
        } catch (e) {
            console.trace(e);
            return;
        }
        
        // dynamically import the default exports of the script
        for (const script of scripts) {
            // dynamic imports must have a static string beginning in order for webpack to load them
            const a = await import(`../../sugma/projects/${project}/${script}.js`);
            const typed_constr = new TypedConstructor(a.default.arg_names, a.default.arg_types, a.default);
            // work out what kind of script this is (component, system, etc.)
            const map = this.getMapFromImport(a.default);
            if (map) {
                // we know the types are correct here if map exists (see getMapFromImport), so we can use map as any
                (map as any).set(a.default.name, typed_constr);
            }
        }
    }

    static async importGameScripts() {
        let scripts: string[];
        try {
            scripts = this.getFilePaths("./game/").scripts;
        } catch (e) {
            console.trace(e);
            return;
        }

        // dynamically import the default exports of the script
        for (const script of scripts) {
            // dynamic imports must have a static string beginning in order for webpack to load them
            console.log(`importing ${script}`);
            const a = await import(`../../runner/game/${script}.js`);
            const typed_constr = new TypedConstructor(a.default.arg_names, a.default.arg_types, a.default);
            // work out what kind of script this is (component, system, etc.)
            const map = this.getMapFromImport(a.default);
            if (map) {
                // we know the types are correct here if map exists (see getMapFromImport), so we can use map as any
                (map as any).set(a.default.name, typed_constr);
            }
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
* **NOTE:** This function assumes the relative path of the project to the engine source will be `../../sugma/projects/<project>`
*/
export async function doProjectImports(project: string) {
    await ImportManager.importProjectScripts(project);
}

/**
 * Import all scripts for the game. For use in built game context only, for app imports, see `doProjectImports()`.
 */
export async function doGameImports() {
    await ImportManager.importGameScripts();
}
