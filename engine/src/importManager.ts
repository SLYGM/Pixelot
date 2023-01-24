import { Component, GameObjectBase, System } from "./ecs.js";
import { PostProcess } from "./renderer/post_process.js";
import { TypedConstructor } from "./typedConstructor.js";
import { StringUtils } from "./utils/baseutils.js";

const nw = (window as any).nw;

export class ImportManager {
    private static components = new Map<string, TypedConstructor<Component>>();
    private static systems = new Map<string, TypedConstructor<System>>();
    private static entities = new Map<string, TypedConstructor<GameObjectBase>>();
    private static shaders = new Map<string, TypedConstructor<PostProcess>>();
    private static componentsFolder = "components/";
    private static systemsFolder = "systems/";
    private static entitiesFolder = "entities/";
    private static shadersFolder = "shaders/";

    static async importProjectScripts(
{ scriptTypeMap, src }: { scriptTypeMap: Map<string, TypedConstructor<Object>>; src: string; }    ) {
        const fs = nw.require("fs");
        let files: any[];
        // get the list of scripts in the directory
        try {
            // note that the fs reading will occur from the apps working directory, 
            // whereas the dynamic importing is done from the engine's src directory, hence the paths differ
            files = fs.readdirSync("./projects/" + src) as string[];
        } catch (e) {
            console.trace(e);
            return;
        }
        
        // extract the script names for .js files only
        const scriptsList: string[] = [];
        files.forEach((file) => {
            const fileName = file.split(".")[0];
            if (StringUtils.isPostfix(file, ".js")) {
                scriptsList.push(fileName);
            }
        });
        
        // dynamically import the default exports of the script
        for (const script of scriptsList) {
            // dynamic imports must have a static string beginning in order for webpack to load them
            const a = await import(`../../sugma/projects/${src}${script}.js`);
            const typed_constr = new TypedConstructor(a.default.arg_names, a.default.arg_types, a.default);
            scriptTypeMap.set(a.default.name, typed_constr);
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

    static getShader(shader: string): TypedConstructor<PostProcess> {
        if (this.shaders.has(shader)) return this.shaders.get(shader);
        console.trace("Cannot find shader '" + shader + "'.");
        return null;
    }
    static hasShader(shader: string): boolean {
        return this.shaders.has(shader);
    }

    static async importProjectComponents(project: string) {
        await this.importProjectScripts({ scriptTypeMap: this.components, src: `${project}/scripts/${this.componentsFolder}` });
    }

    static async importProjectSystems(project: string) {
        await this.importProjectScripts({ scriptTypeMap: this.systems, src: `${project}/scripts/${this.systemsFolder}` });
    }

    static async importProjectEntities(project: string) {
        await this.importProjectScripts({ scriptTypeMap: this.entities, src: `${project}/scripts/${this.entitiesFolder}` });
    }

    static async importProjectShaders(project: string) {
        await this.importProjectScripts({ scriptTypeMap: this.shaders, src: `${project}/scripts/${this.shadersFolder}` });
    }
}

/**
* Import user scripts for given project name. For use in app context only, for built game imports, see `doGameImports()`.   
* **NOTE:** This function assumes the relative path of the project to the engine source will be `../../sugma/projects/<project>`
*/
export async function doProjectImports(project: string) {
    await Promise.all([
        ImportManager.importProjectComponents(project),
        ImportManager.importProjectSystems(project),
        ImportManager.importProjectEntities(project),
        ImportManager.importProjectShaders(project)
    ]);
}


export async function doGameImports() {
    // TODO:
    console.log("The doGameImports() function hasn't been implemented");
}
