import { StringUtils, ScriptUtils } from "./utils/baseutils.js";

export abstract class Component {
    /**
     * The list of components that this component depends on.
     * E.g. Velocity depends on Position.
     */
    readonly dependencies = [];
}

export type ComponentType<T extends Component> = new (...args: any[]) => T;

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
export abstract class GameObjectBase {
    // Mapping from component name to component instance
    private component_map: Map<string, Component> = new Map();

    /**
     * Constructor which wraps the object in a proxy.
     * This allows the user to access the components directly.
     */
    constructor() {
        return new Proxy(this, {
            get: (target, prop: string) => {
                if (this.component_map.has(prop)) {
                    return this.component_map.get(prop);
                }
                return target[prop];
            },
        });
    }

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
        // Check if the component has all its dependencies
        for (const dependency of component.dependencies) {
            if (!this.has(dependency)) {
                throw new Error("Component '" + component.constructor.name + "' requires '" + dependency.name + "'");
            }
        }
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

/**
 * A collection of named priorities for pre-defined systems.
 * For example, if you want your system to run after collision detection,
 * you can set the priority to `SystemStage.CollisionDetection + 1`.
 */
export enum SystemStage {
    PositionUpdate = 1,
    CollisionDetection = 2,
}

export abstract class System {
    /**
     * The component that this system acts on.
     */
    abstract component: ComponentType<Component>;

    /**
     * This function is run once per frame.
     * @param entities The list of entities that the system acts on.
     */
    abstract update(entities: Set<GameObjectBase>): void;
}

export type SystemNode = {
    // The name of the system
    name: string;
    // The system itself
    system: System;
    // The systems priority. Lower numbers are run first
    priority: number;
    // The entities that this system acts on
    entities: Set<GameObjectBase>;
};

export class Scene {
    // The list of entities in the scene
    private entities: GameObjectBase[];
    // The systems in a priority queue
    private systems: SystemNode[];

    // The time that has elapsed since the last frame.
    public dt: number;

    constructor() {
        this.entities = [];
        this.systems = [];
    }

    // Add an entity to the Scene
    spawn<T extends GameObjectBase>(entity: T) {
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
    delete(entity: GameObjectBase) {
        this.entities = this.entities.filter(e => e != entity);
        // Remove the entity from the systems that require it
        for (const system_node of this.systems) {
            system_node.entities.delete(entity);
        }

    }

    // Get all entities that have the given component.
    getEntitiesWith<T extends Component>(component: ComponentType<T>): GameObjectBase[] {
        // NOTE: Currently not very efficient. Could be improved by using archetypes to store entities with the same components.
        return this.entities.filter(e => e.has(component));
    }

    // Add a system to the Scene
    addSystem(system: System, priority: number) {
        let entities = new Set<GameObjectBase>(this.getEntitiesWith(system.component));
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

// example usage

export class Position extends Component {
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

    update(entities: Set<GameObjectBase>) {
        for (const entity of entities) {
            console.log("Updating entity", entity);
            const position = entity.get(Position);
            const velocity = entity.get(Velocity);
            position.x += velocity.x * $scene.dt;
            position.y += velocity.y * $scene.dt;
        }
    }
}

// System used to test system priority
class PrintPositionSystem extends System {
    component = Position;

    update(entities: Set<GameObjectBase>) {
        for (const entity of entities) {
            console.log("Entity position:", entity.get(Position));
        }
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

export const $scene = new Scene();
let player: any = new Player();
$scene.addSystem(new MovementSystem(), SystemStage.PositionUpdate);
$scene.addSystem(new PrintPositionSystem(), SystemStage.PositionUpdate - 1);
$scene.spawn(player);
$scene.update();

// position is now (1, 1)
// this is an example of how since player is a proxy we can access the position component directly
// although TypeScript doesn't play nice with proxies so we have to set the type to any.
// This shouldn't be a problem since the user is working in JS not TS anyway.
player.takeDamage(10);
$scene.update();
