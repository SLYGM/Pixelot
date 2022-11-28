export abstract class Component {
    /**
     * The list of components that this component depends on.
     * E.g. Velocity depends on Position.
     */
    dependencies: any[] = [];

    abstract toJSONCompatible() : any[];
}

export type ComponentType<T extends Component> = new (...args: unknown[]) => T;

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
    public name: string;

    /**
     * Constructor which wraps the object in a proxy.
     * This allows the user to access the components directly.
     */
    constructor(name: string) {
        this.name = name;
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
                throw new Error(
                    "Component '" +
                        component.constructor.name +
                        "' requires '" +
                        dependency.name +
                        "'"
                );
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
     * Get all components linked to this entity
     *
     * @returns All components linked to this entity
     */
    public getAllComponents(): string[] {
        return Array.from(this.component_map.keys());
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
    public hasAll(components: any[]): boolean {
        return components.every((c) => this.has(c));
    }

    // Remove the component of the given type
    // TODO: Check if dependencies are still met
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
