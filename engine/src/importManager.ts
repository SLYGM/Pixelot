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

    static async importScripts(
{ scriptTypeMap, src }: { scriptTypeMap: Map<string, TypedConstructor<Object>>; src: string; }    ) {
        const fs = nw.require("fs");
        let files: any[];
        try {
            files = fs.readdirSync("../engine/build/" + src) as string[];
            console.log(files);
        } catch (e) {
            console.trace(e);
            return;
        }
        const scriptsList: string[] = [];
        files.forEach((file) => {
            const fileName = file.split(".")[0];
            if (StringUtils.isPostfix(file, ".js")) {
                scriptsList.push(fileName);
            }
        });
        for (const script of scriptsList) {
            const a = await import("./" + src + script + ".js");
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

    static async importComponents() {
        await this.importScripts({ scriptTypeMap: this.components, src: this.componentsFolder });
    }

    static async importSystems() {
        await this.importScripts({ scriptTypeMap: this.systems, src: this.systemsFolder });
    }

    static async importEntities() {
        await this.importScripts({ scriptTypeMap: this.entities, src: this.entitiesFolder });
    }

    static async importShaders() {
        await this.importScripts({ scriptTypeMap: this.shaders, src: this.shadersFolder });
    }
}

export async function doImports() {
    await ImportManager.importComponents();
    await ImportManager.importSystems();
    await ImportManager.importEntities();
    await ImportManager.importShaders();
}
