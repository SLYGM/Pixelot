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

abstract class System {
    /**
     * The component that this system acts on.
     */
    abstract component: ComponentType<Component>;

    /**
     * This function is run once per frame.
     * @param scene The scene that the system is in.
     * @param entities The list of entities that the system acts on.
     */
    abstract update(entities: Set<GameObjectBase>): void;
}


class ComponentManager {
    private static components = [];
    private static imported = new Map<string, boolean>();
    private static dependencies = new Map<string, string[]>();
    private static componentsFolder = "build/components/"

    static loadComponents() {
        const fs = require('fs');
        let files = (fs.readdirSync(this.componentsFolder) as string[]);
        files.forEach(file => {
            let fileName = file.split(".")[0];
            if (StringUtils.isPostfix(file, ".settings.json")) {
                let settings = JSON.parse(fs.readFileSync(this.componentsFolder + file));
                if (settings["dependencies"] == undefined) return;
                this.dependencies.set(fileName, settings["dependencies"]);
            }
            else if (StringUtils.isPostfix(file, ".js")) {
                this.components.push(fileName);
                this.imported.set(fileName, false);
            }
        });
        this.components.forEach(component => {
            this.loadComponent(component, new Map<string,boolean>())
        });
    }

    private static loadComponent(component:string, stack:Map<string,boolean>) : boolean {
        if (this.imported.get(component)) return true;
        if (!this.imported.has(component)) {
            console.trace("Required component '" + component + "' does not have its own script under build/components/.")
            return false;
        }
        if (stack.has(component) && stack.get(component)) {
            console.trace("Failed to import components. Circular dependency on component '" + component + "'.")
            return false;
        }
        if (this.dependencies.has(component)) {
            stack.set(component, true);
            for (let dep of this.dependencies.get(component)) {
                let res = this.loadComponent(dep, stack);
                if (!res) return false;
            }
            stack.set(component, false)
        }
        this.importComponent(component);
        this.imported.set(component, true);
        return true;
    }

    private static importComponent(component:string) {
        if (this.imported.get(component)) return;
        ScriptUtils.loadScript(this.componentsFolder + component + ".js");
    }
}

// // example usage

// class Position extends Component {
//     x: number = 0;
//     y: number = 0;
// }

// class Velocity extends Component {
//     dependencies = [Position];

//     x: number = 0;
//     y: number = 0;

//     constructor(x: number, y: number) {
//         super();
//         this.x = x;
//         this.y = y;
//     }
// }

// class MovementSystem extends System {
//     component = Velocity;

//     update(entities: Set<GameObjectBase>) {
//         for (const entity of entities) {
//             console.log("Updating entity", entity);
//             const position = entity.get(Position);
//             const velocity = entity.get(Velocity);
//             position.x += velocity.x * $scene.dt;
//             position.y += velocity.y * $scene.dt;
//         }
//     }
// }

// class Player extends GameObjectBase {
//     health: number;
//     onCreate() {
//         this.health = 10;
//         // in practice these components would be added via the editor UI rather than in code like this
//         this.add(new Position).add(new Velocity(1, 1));
//     }
//     update() {
//         if (this.health <= 0) {
//             console.log("Player is dead");
//             $scene.deleteEntity(this);
//         }
//     }
//     takeDamage(amount: number) {
//         this.health -= amount;
//     }
// }

// let $scene = new Scene();
// let player: any = new Player();
// $scene.addSystem(new MovementSystem());
// $scene.addEntity(player);
// $scene.update();

// // position is now (1, 1)
// // this is an example of how since player is a proxy we can access the position component directly
// // although TypeScript doesn't play nice with proxies so we have to set the type to any.
// // This shouldn't be a problem since the user is working in JS not TS anyway.
// console.log(player.Position);
// player.takeDamage(10);
// $scene.update();
