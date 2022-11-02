abstract class Component {
    /**
     * The list of components that this component depends on.
     * E.g. Velocity depends on Position.
     */
    readonly dependencies = [];
}

type ComponentType<T extends Component> = new (...args: any[]) => T;

/** 
 * The base class inherited by all game objects.
 *
 * @example
 * An example user-defined game object:
 * ```
 * class Player extends GameObjectBase {
 *   times_jumped: number;
 *   onCreate() {
 *     this.times_jumped = 0;
 *   }
 *   update() {
 *     if (event.key == "space") {
 *       this.get(Velocity).y = 10;
 *       this.times_jumped++;
 *     }
 *   }
 * }
 * ```
 */
abstract class GameObjectBase {
    // Mapping from component name to component instance
    private component_map: Map<string, Component> = new Map();

    /**
     * User-defined function that is called when the entity is spawned.
     */
    abstract onCreate(): void;

    /**
     * User-defined function that is called every frame.
     */
    abstract update(): void;

    /**
     * Add a new component to the entity.
     * Returns itself allowing calls to be chained.
     * @example
     * ```
     * entity.add(new Position(0, 0)).add(new Velocity(0, 0));
     * ```
     * @param component The component to add
     */
    public add(component: Component) {
        // TODO: Check if the component has all its dependencies
        this.component_map.set(component.constructor.name, component);
        return this;
    }

    /**
     * Get the component instance of the given type.
     *
     * @param c The type of the component to get.
     * @returns The component instance.
     */
    public get<T extends Component>(c: ComponentType<T>): T {
        return this.component_map.get(c.name) as T;
    }

    /**
     * Returns true if the entity has the given component.
     *
     * @param c The type of the component to check.
     * @returns True if the entity has the component.
     */
    public has<T extends Component>(c: ComponentType<T>): boolean {
        return this.component_map.has(c.name);
    }

    // Returns true if the entity has all the given components
    public hasAll<T extends Component>(components: ComponentType<T>[]) {
        return components.every(c => this.has(c));
    }

    // Remove the component of the given type
    public remove<T extends Component>(c: ComponentType<T>) {
        this.component_map.delete(c.name);
    }
}

abstract class System {
    /**
     * The component that this system acts on.
     */
    abstract component: ComponentType<Component>;

    /**
     * This function is run once per frame for each entity that has the required component.
     */
    abstract update(entity: GameObjectBase): void;
}

class Scene {
    private entities: GameObjectBase[];
    private systems: Set<System>;

    // The time that has elapsed since the last frame.
    public dt: number;

    constructor() {
        this.entities = [];
        this.systems = new Set();
    }

    // Add an entity to the Scene
    spawn<T extends GameObjectBase>(entity: T) {
        this.entities.push(entity);
        entity.onCreate();
    }

    // Remove the given entity from the scene
    delete(entity: GameObjectBase) {
        this.entities = this.entities.filter(e => e != entity);
    }

    // Add a system to the Scene
    addSystem(system: System) {
        this.systems.add(system);
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
        // TODO: Make more efficient by precomputing the entities that each system needs
        for (const system of this.systems) {
            for (const entity of this.entities) {
                if (entity.has(system.component)) {
                    system.update(entity);
                }
            }
        }

        // Run all entity update functions
        for (const entity of this.entities) {
            entity.update();
        }
    }
}

// example usage

class Position extends Component {
    x: number = 0;
    y: number = 0;
}

class Velocity extends Component {
    dependencies = [Position];

    x: number = 0;
    y: number = 0;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }
}

class MovementSystem extends System {
    component = Velocity;

    update(entity: GameObjectBase) {
        console.log("Updating entity", entity);
        const position = entity.get(Position);
        const velocity = entity.get(Velocity);
        position.x += velocity.x * $scene.dt;
        position.y += velocity.y * $scene.dt;
    }
}

class Player extends GameObjectBase {
    health: number;
    onCreate() {
        this.health = 10;
        // in practice these components would be added via the editor UI rather than in code like this
        this.add(new Position).add(new Velocity(1, 1));
    }
    update() {
        if (this.health <= 0) {
            console.log("Player is dead");
            $scene.delete(this);
        }
    }
    takeDamage(amount: number) {
        this.health -= amount;
    }
}

var $scene = new Scene();
var player = new Player();
$scene.spawn(player);
$scene.addSystem(new MovementSystem());
$scene.update();

// position is now (1, 1)
player.takeDamage(10);
console.log(player);
