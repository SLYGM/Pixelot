type Entity = number;

abstract class Component {}

type ComponentType<T extends Component> = new (...args: any[]) => T;

/** 
 * A collection of components.
 */
class ComponentList {
    // Mapping from component name to component instance
    private map: Map<string, Component> = new Map();

    /**
     * Add a new component to the entity.
     * Returns itself allowing calls to be chained. E.g.
     * ```
     * entity.add(new Position(0, 0)).add(new Velocity(0, 0));
     * ```
     * @param component The component to add
     */
    public add(component: Component) {
        this.map.set(component.constructor.name, component);
        return this;
    }

    // Get the component instance of the given type
    public get<T extends Component>(c: ComponentType<T>): T {
        return this.map.get(c.name) as T;
    }

    // Returns true if the entity has the given component
    public has<T extends Component>(c: ComponentType<T>): boolean {
        return this.map.has(c.name);
    }

    // Returns true if the entity has all the given components
    public hasAll<T extends Component>(components: ComponentType<T>[]) {
        return components.every(c => this.has(c));
    }

    // Remove the component of the given type
    public remove<T extends Component>(c: ComponentType<T>) {
        this.map.delete(c.name);
    }
}

abstract class System {
    /**
     * A list of components that this system requires.
     */
    abstract components: ComponentType<Component>[];

    /**
     * This function is run once per frame for each entity that has the required components.
     */
    abstract update(scene: Scene, entity: Entity): void;
}

class Scene {
    private entities: Map<Entity, ComponentList>;
    private max_entity_id: Entity = 0;
    private systems: Set<System>;

    constructor() {
        this.entities = new Map();
        this.systems = new Set();
    }

    // Create a new entity
    newEntity(): ComponentList {
        const entity = this.max_entity_id++;
        const components = new ComponentList();
        this.entities.set(entity, components);
        return components;
    }

    // Get the component list of the given entity
    entity(entity: Entity): ComponentList {
        return this.entities.get(entity);
    }

    // Remove the given entity from the scene
    delete(entity: Entity) {
        this.entities.delete(entity);
    }

    // Add a system to the Scene
    addSystem(system: System) {
        this.systems.add(system);
    }

    // Remove a system from the scene
    removeSystem(system: System) {
        this.systems.delete(system);
    }

    // Run all systems
    update() {
        // TODO: Make more efficient by precomputing the entities that each system needs
        for (const system of this.systems) {
            for (const [entity, _] of this.entities) {
                if (this.entity(entity).hasAll(system.components)) {
                    system.update(this, entity);
                }
            }
        }
    }
}

// example usage

class Position extends Component {
    x: number = 0;
    y: number = 0;
}

class Velocity extends Component {
    x: number = 0;
    y: number = 0;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }
}

class MovementSystem extends System {
    components = [Position, Velocity];

    update(scene: Scene, entity: Entity) {
        console.log("Updating entity", entity);
        const position = scene.entity(entity).get(Position);
        const velocity = scene.entity(entity).get(Velocity);
        position.x += velocity.x;
        position.y += velocity.y;
    }
}

let scene = new Scene();
scene.newEntity().add(new Position()).add(new Velocity(1, 1));
scene.addSystem(new MovementSystem());
scene.update();

// position is now (1, 1)
console.log(scene.entity(0).get(Position));
