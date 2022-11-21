import { Component, ComponentType, GameObjectBase, System, SystemNode } from "./ecs.js";

export class Scene {
    // The list of entities in the scene
    private entities: GameObjectBase[];
    // The systems in a priority queue
    private systems: SystemNode[];

    // The time that has elapsed since the last frame.
    public dt: number;

    onCreate() {
        this.entities = [];
        this.systems = [];
    }

    onDestroy() {
        this.entities = [];
        this.systems = [];
    }

    onPause() { }

    onResume() { }

    getEntities() { return this.entities }

    getSystems() { return this.systems }

    // Add an entity to the Scene
    addEntity<T extends GameObjectBase>(entity: T) {
        this.entities.push(entity);
        entity.onCreate();

        // Add the entity to the systems that require it
        for (const system_node of this.systems) {
            if (entity.has(system_node.system.component)) {
                system_node.entities.add(entity);
            }
        }
    }

    // Remove the given entity from the scene
    deleteEntity(entity: GameObjectBase) {
        this.entities = this.entities.filter(e => e != entity);
        // Remove the entity from the systems that require it
        for (const system_node of this.systems) {
            system_node.entities.delete(entity);
        }

    }

    // Get all entities that have the given component.
    getEntitiesWithComponent<T extends Component>(component: ComponentType<T>): GameObjectBase[] {
        // NOTE: Currently not very efficient. Could be improved by using archetypes to store entities with the same components.
        return this.entities.filter(e => e.has(component));
    }

    // Add a system to the Scene
    addSystem(system: System, priority: number) {
        let entities = new Set<GameObjectBase>(this.getEntitiesWithComponent(system.component));
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
        this.systems = this.systems.filter(s => s.system != system);
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
        for (const entity of this.entities) {
            entity.update();
        }
    }
}