import { TypedConstructor } from "./typedConstructor";
import { ImportManager } from "./importManager";
import { Component, GameObjectBase } from "./ecs";

const nw = (window as any).nw;
let fs: { readFileSync: (arg0: string) => string; };
if (nw) {
    fs = nw.require("fs");
} else {
    fs = require("fs");
}


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
        this.base = ImportManager.getEntity(prefabJSON['base']);
        this.name = prefabJSON['name'];
        for (const component of prefabJSON['components']) {
            const compConstructor = ImportManager.getComponent(component['component_name']);
            const args = compConstructor.parseArgs(component['args']);
            this.components.push(new ComponentWithArgs(compConstructor, args));
        }
    }

    create(...args: any[]) {
        const instance = new this.base.constr();
        for (const component of this.components) {
            instance.add(component.create());
        }
        instance.onCreate(...args);
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
        // TODO: cache commonly used prefabs 
        const prefab = new Prefab(path);
        this.prefabs.set(prefab.name, prefab);
    }

    static create(name: string, ...args: any[]) {
        const prefab = this.prefabs.get(name);
        //TODO: get prefab from file if not in map when using in built game
        if (!prefab) {
            console.trace("Prefab not found: " + name);
            return null;
        }
        const instance = prefab.create(...args);
        instance.onCreate(...args);
        return instance;
    }
}

/**
 * Spawn a prefab with the given name and arguments.  
 * **NOTE**: if using in editor, then make sure to use `PrefabFactory.loadPrefab` before calling this function.
 * 
 * @param name name of the prefab to spawn
 * @param args list of constructor arguments for the prefab
 * @returns Spawned entity instance
 */
export function spawnPrefab(name: string, args: any[]) {
    return PrefabFactory.create(name, ...args);
}
