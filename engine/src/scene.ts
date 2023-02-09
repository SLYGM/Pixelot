import {
    Component,
    ComponentType,
    GameObjectBase,
    System,
    SystemNode,
} from "./ecs.js";
import { ImportManager } from "./importManager.js";
import { PrefabFactory } from "./prefabs.js";

export class Scene {
    // The list of entities in the scene
    private entities: Map<string, GameObjectBase>;
    // The systems in a priority queue
    private systems: SystemNode[];
    private added_systems: Map<string, boolean>;

    // The time that has elapsed since the last frame.
    public dt: number;
    public name: string;

    constructor(name: string) {
        this.entities = new Map<string, GameObjectBase>();
        this.systems = [];
        this.added_systems = new Map<string, boolean>();
        this.dt = 0;
        this.name = name;
    }

    destroy() {
        for (const entity of this.entities.values()) {
            entity._delete();
        }
        this.entities.clear();
        this.systems = [];
    }

    onPause() {}

    onResume() {}

    getEntities() {
        return this.entities;
    }

    getSystems() {
        return this.systems;
    }

    hasSystem(system_name: string) {
        return this.added_systems.has(system_name);
    }

    // Add an entity to the Scene
    addEntity<T extends GameObjectBase>(entity: T, args: any[] = []) {
        //check that the system for this component is in the scene
        for (const comp_name of entity.getAllComponents()){
            if (ImportManager.hasSystem(comp_name)) {
                if (!this.hasSystem(comp_name)) {
                    //TODO: system args aren't stored anywhere in json currently
                    const system_constr = ImportManager.getSystem(comp_name).constr;
                    this.addSystem(new system_constr(), 1);
                }
            }
        }
        

        this.entities.set(entity.name, entity);
        entity.onCreate(...args);

        // Add the entity to the systems that require it
        for (const system_node of this.systems) {
            if (entity.has(system_node.system.component)) {
                system_node.entities.add(entity);
            }
        }
    }

    // Spawn an instance of a prefab into the scene
    spawnPrefab(prefab_name: string, args: any[]) {
        const entity = PrefabFactory.create(prefab_name);
        if (entity) {
            this.addEntity(entity, args);
        }
    }

    // Get the entity with the given name
    getEntity(name: string): GameObjectBase | undefined {
        return this.entities.get(name);
    }

    // Remove the entity with the given name from the scene
    deleteEntity(name: string) {
        this.entities.delete(name);
        // Remove the entity from the systems that require it
        const entity = this.entities.get(name);
        for (const system_node of this.systems) {
            system_node.entities.delete(entity);
        }
    }

    // Rename an entity
    renameEntity(old_name: string, new_name: string) {
        const entity = this.entities.get(old_name);
        if (entity) {
            entity.name = new_name;
            this.entities.delete(old_name);
            this.entities.set(new_name, entity);
        }
    }

    // Get all entities that have the given component.
    getEntitiesWithComponent<T extends Component>(
        component: ComponentType<T>
    ): GameObjectBase[] {
        // NOTE: Currently not very efficient. Could be improved by using archetypes to store entities with the same components.
        return [...this.entities.values()].filter((e) => e.has(component));
    }

    // Add a system to the Scene
    addSystem(system: System, priority: number) {
        this.added_systems.set(system.constructor.name, true);
        const entities = new Set<GameObjectBase>(
            this.getEntitiesWithComponent(system.component)
        );
        // add the system to the priority queue
        this.systems.push({
            name: system.constructor.name,
            system: system,
            priority: priority,
            entities: entities,
        });
        this.systems.sort((a, b) => a.priority - b.priority);
    }

    // Remove a system from the scene
    removeSystem(system: System) {
        this.systems = this.systems.filter((s) => s.system != system);
    }

    // Perform all the updates for the current frame
    update() {
        // TODO: Calculate dt properly. For now its just 1.
        this.dt = 1;

        // Run all systems
        for (const system_node of this.systems) {
            system_node.system.update(system_node.entities);
        }

        // Run all entity update functions
        for (const entity of this.entities.values()) {
            entity.update();
        }
    }
}
