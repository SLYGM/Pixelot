import { TypedConstructor } from "./typedConstructor";
import { ImportManager } from "./importManager";
import { Component, GameObjectBase } from "./ecs";

const nw = (window as any).nw;
const fs = nw.require("fs");


class ComponentWithArgs {
    constr: TypedConstructor<Component>;
    args: any[];

    constructor(constr: TypedConstructor<Component>, args: any[]) {
        this.constr = constr;
        this.args = args;
    }

    create() {
        return new this.constr.constr(...this.args);
    }
}

class Prefab {
    name: string;
    base: TypedConstructor<GameObjectBase>;
    components: ComponentWithArgs[];

    constructor(prefabPath: string) {
        this.components = [];
        const prefabJSON = JSON.parse(fs.readFileSync(prefabPath));
        this.base = ImportManager.getEntity(prefabJSON['class']);
        this.name = prefabJSON['name'];
        for (const component of prefabJSON['components']) {
            const compConstructor = ImportManager.getComponent(component['component_name']);
            const args = compConstructor.parseArgs(component['args']);
            this.components.push(new ComponentWithArgs(compConstructor, args));
        }
    }

    create(name?: string) {
        const instance = new this.base.constr(name);
        for (const component of this.components) {
            instance.add(component.create());
        }
        return instance;
    }
}

export class PrefabFactory {
    private static prefabs: Map<string, Prefab> = new Map();

    /**
     * Loads a `.prefab` file into the prefab factory. This is used to spawn prefabs.
     * Use this function to load prefabs in the editor, before creating instances of them.
     * 
     * @param name 
     * @param path 
     */
    static loadPrefab(path: string) {
        const prefab = new Prefab(path);
        this.prefabs.set(prefab.name, prefab);
    }

    /**
     * 
     * @returns list of all prefab names
     */
    static getAllPrefabNames() {
        return Array.from(this.prefabs.keys());
    }

    /**
     * 
     * @param name name of the prefab
     * @returns prefab instance, or null if not found
     */
    static getPrefab(name: string) {
        return this.prefabs.get(name);
    }
 
    /**
    * Create a prefab instance with the given name and arguments. 
    * This function won't call the `onCreate` method, as this should be called by the scene.
    * **NOTE**: if using in editor, then make sure to use `PrefabFactory.loadPrefab` before calling this function.
    * 
    * @param name name of the prefab to spawn
    * @param args list of constructor arguments for the prefab
    * @returns Spawned entity instance
    */
    static create(prefab_name: string, name?: string) {
        const prefab = this.prefabs.get(prefab_name);
        if (!prefab) {
            console.trace("Prefab not found: " + prefab_name);
            return null;
        }
        const instance = prefab.create(name);
        return instance;
    }
}