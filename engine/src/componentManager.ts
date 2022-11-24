import { Component, GameObjectBase, System } from "./ecs.js";
import { PostProcess } from "./renderer/post_process.js";
import { Constructor } from "./types.js";
import { StringUtils } from "./utils/baseutils.js";

export class ImportManager {
    private static components = new Map<string, Constructor<Component>>();
    private static systems = new Map<string, Constructor<System>>();
    private static entities = new Map<string, Constructor<GameObjectBase>>();
    private static shaders = new Map<string, Constructor<PostProcess>>();
    private static componentsFolder = "components/";
    private static systemsFolder = "systems/";
    private static entitiesFolder = "entities/";
    private static shadersFolder = "renderer/post effects/";

    static async importScripts(
        scriptTypeMap: Map<string, Constructor<Object>>,
        src: string
    ) {
        const fs = require("fs");
        let files;
        try {
            files = fs.readdirSync("./build/" + src) as string[];
        } catch (e) {
            console.trace(e);
            return;
        }
        let scriptsList: string[] = [];
        files.forEach((file) => {
            let fileName = file.split(".")[0];
            if (StringUtils.isPostfix(file, ".js")) {
                scriptsList.push(fileName);
            }
        });
        for (let script of scriptsList) {
            let a = await import("./" + src + script + ".js");
            scriptTypeMap.set(script, a.default);
        }
    }

    static getComponent(component: string): Constructor<Component> {
        if (this.components.has(component))
            return this.components.get(component);
        console.trace("Cannot find component '" + component + "'.");
        return null;
    }
    static hasComponent(component: string): boolean {
        return this.components.has(component);
    }

    static getSystem(system: string): Constructor<System> {
        if (this.systems.has(system)) return this.systems.get(system);
        console.trace("Cannot find system '" + system + "'.");
        return null;
    }
    static hasSystem(system: string): boolean {
        return this.systems.has(system);
    }

    static getEntity(entity: string): Constructor<GameObjectBase> {
        if (this.entities.has(entity)) return this.entities.get(entity);
        console.trace("Cannot find entity '" + entity + "'.");
        return null;
    }
    static hasEntity(entity: string): boolean {
        return this.entities.has(entity);
    }

    static getShader(shader: string): Constructor<PostProcess> {
        if (this.shaders.has(shader)) return this.shaders.get(shader);
        console.trace("Cannot find shader '" + shader + "'.");
        return null;
    }
    static hasShader(shader: string): boolean {
        return this.shaders.has(shader);
    }

    static async importComponents() {
        await this.importScripts(this.components, this.componentsFolder);
    }

    static async importSystems() {
        await this.importScripts(this.systems, this.systemsFolder);
    }

    static async importEntities() {
        await this.importScripts(this.entities, this.entitiesFolder);
    }

    static async importShaders() {
        await this.importScripts(this.shaders, this.shadersFolder);
    }
}

await ImportManager.importComponents();
await ImportManager.importSystems();
await ImportManager.importEntities();
await ImportManager.importShaders();
