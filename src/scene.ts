class Scene {
    // The list of entities in the scene
    private entities: GameObjectBase[];
    // A map from systems to the entities that they act on
    private systems: Map<System, Set<GameObjectBase>>;

    // The time that has elapsed since the last frame.
    public dt: number;

    onCreate() {
        this.entities = [];
        this.systems = new Map<System, Set<GameObjectBase>>();
    }

    onDetroy() {
        this.entities = [];
        this.systems.clear();
    }

    onPause() { }

    onResume() { }

    getEntities() { return this.entities }

    getSystems() { return [...this.systems.keys()] }

    // Add an entity to the Scene
    addEntity<T extends GameObjectBase>(entity: T) {
        this.entities.push(entity);
        entity.onCreate();
        // Add the entity to the systems that require it
        for (const [system, entities] of this.systems) {
            if (entity.has(system.component)) {
                entities.add(entity);
            }
        }
    }

    // Remove the given entity from the scene
    deleteEntity(entity: GameObjectBase) {
        this.entities = this.entities.filter(e => e != entity);
        // Remove the entity from the systems that require it
        for (const [system, entities] of this.systems) {
            if (entity.has(system.component)) {
                entities.delete(entity);
            }
        }
    }

    // Get all entities that have all the given component
    getEntitiesWithComponent<T extends Component>(component: ComponentType<T>): GameObjectBase[] {
        return this.entities.filter(e => e.has(component));
    }

    // Add a system to the Scene
    addSystem(system: System) {
        let entities = new Set<GameObjectBase>(this.getEntitiesWithComponent(system.component));
        this.systems.set(system, entities);
    }

    // Remove a system from the scene
    removeSystem(system: System) {
        this.systems.delete(system);
    }

    // Perform all the updates for the current frame
    update() {
        // TODO: Calculate dt properly. For now its just 1.
        this.dt = 1;

        // Run all systems
        for (const [system, entities] of this.systems) {
            system.update(entities);
        }

        // Run all entity update functions
        for (const entity of this.entities) {
            entity.update();
        }
    }
}