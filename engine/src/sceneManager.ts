import { GameObjectBase, System, SystemStage } from "./ecs.js";
import Position from "./components/Position.js";
import Velocity from "./components/Velocity.js";
import { Scene } from "./scene.js";
import { Constructor } from "./types.js";
import { Component } from "./ecs.js";
import { ImportManager } from './componentManager.js';

class SceneManager {
    scenes: Map<string, Scene>;
    currentScene: Scene;
    currentSceneName: string;

    constructor() {
        this.scenes = new Map<string, Scene>();
    }

    /**
     * Add a scene to the Scene Manager
     *
     * @param name name of scene to be added
     * @param scene scene object to be added
     */
    addScene(name: string, scene: Scene) {
        this.scenes.set(name, scene);
        if (!this.currentScene) {
            this.currentScene = this.scenes.get(name);
            this.currentSceneName = name;
            this.currentScene.onCreate();
        }
    }

    /**
     * Remove a scene from the Scene Manager
     *
     * @param name name of scene to be removed
     */
    removeScene(name: string) {
        try {
            if (this.currentSceneName == name) {
                this.currentScene = null;
                this.currentSceneName = null;
            }
            this.scenes.delete(name);
            console.log("scene deleted");
        } catch (error) {
            throw new Error("Scene does not exist");
        }
    }

    /**
     * Switch to another scene
     *
     * @param name name of scene to switch to
     */
    switchToScene(name: string) {
        try {
            const nextScene = this.scenes.get(name);
            this.currentScene.onPause();
            nextScene.onResume();
            this.currentSceneName = name;
            this.currentScene = nextScene;
        } catch (error) {
            throw new Error("Next scene does not exist");
        }
    }

    /**
     * Updates the current scene only
     */
    update() {
        if (this.currentScene) {
            this.currentScene.update();
        }
    }

    /**
     * Add an entity to a specified scene in the scene manager
     *
     * @param sceneName name of scene to which entity is to be added
     * @param entity entity obect to be added
     */
    addEntityToScene<T extends GameObjectBase>(sceneName: string, entity: T) {
        this.scenes.get(sceneName).addEntity(entity);
    }

    /**
     * Add a system to a specified scene in the scene manager
     *
     * @param sceneName name of scene to which system is to be added
     * @param system system object to be added
     * @param priority priority of system to be added
     */
    addSystemToScene(sceneName: string, system: System, priority: number) {
        this.scenes.get(sceneName).addSystem(system, priority);
    }

    /**
     * Save current scene to a json file
     *
     * @param fileName name of file to which scene will be saved
     */
    saveCurrentScene(fileName: string) {
        // create a JSON object
        const proxies = this.currentScene.getEntities();
        const entities = [];

        for (const proxy of proxies) {
            const components = [];
            for (const component of [...proxy.getAllComponents()]) {
                const component_constr = ImportManager.getComponent(component);
                console.log(component_constr, component);
                components.push({
                    component_name: component,
                    value: proxy.get(component_constr).toJSONCompatible(),
                });
            }
            entities.push({ name: proxy.constructor.name, components: components });
        }

        const sceneSaveFile = {
            name: this.currentSceneName,
            entities: entities,
        };

        // convert JSON object to a string
        const data = JSON.stringify(sceneSaveFile);

        const fs = require("fs");
        try {
            fs.writeFileSync(fileName + ".json", data);
        }
        catch (e) {
            console.trace(e);
            return;
        }
    }

    saveAllScenes() {}

    /**
     * Load a scene from a json file
     *
     * @param name name of file from which to load scene
     */
    loadScene(name: string) {
        const fs = require("fs");
        // read JSON object from file
        let data;
        try {
            data = fs.readFileSync(`${name}.json`, {encoding: "utf-8"});
        }
        catch (e) {
            console.trace(e);
            return;
        }
        console.log(data);
        
        // parse JSON object
        const loadedSceneJson = JSON.parse(data.toString());
        const loadedEntities = loadedSceneJson["entities"];

        // construct Scene object from json data and add to sceneManager
        const scene = new Scene();
        scene.onCreate();
        for (const entity of loadedEntities) {
            const entity_constr = ImportManager.getEntity(entity["name"]);
            console.log(entity["name"], entity_constr);
            const toAdd = new entity_constr(entity["name"]);
            console.log(entity["name"], entity_constr, toAdd);

            for (const component of entity["components"]) {
                const component_constr = ImportManager.getComponent(
                    component["component_name"]
                );
                toAdd.add(
                    new component_constr(
                        ...component["value"]
                    )
                );

                for (const [key, value] of $system_map.entries()) {
                    if (
                        toAdd.has(value.component) &&
                        !scene
                            .getSystems()
                            .some((elem) => elem["system"] == value)
                    ) {
                        scene.addSystem(value, key);
                    }
                }
            }
            scene.addEntity(toAdd);
        }
        console.log(scene.getEntities());

        this.addScene(loadedSceneJson["name"], scene);
    }

    /**
     * load multiple scenes from json files
     *
     * @param scenes name of files from which to load scenes
     */
    batchLoadScenes(scenes: string[]) {
        for (const scene of scenes) {
            this.loadScene(scene);
        }
    }
}

// example usage

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
            // console.log("Entity position:", entity.get(Position));
        }
    }
}

class Player extends GameObjectBase {
    health: number;
    onCreate() {
        this.health = 10;
        // in practice these components would be added via the editor UI rather than in code like this
        this.add(new Position()).add(new Velocity(1, 1));
    }
    update() {
        if (this.health <= 0) {
            console.log("Player is dead");
            $scene.deleteEntity(this);
        }
    }
    takeDamage(amount: number) {
        this.health -= amount;
    }
}


ImportManager.addEntity(Player.name, Player);

const $system_map = new Map<number, System>();
$system_map.set(1, new PrintPositionSystem());
$system_map.set(2, new MovementSystem());

export const $scene = new Scene();
export const $sceneManager = new SceneManager();
$sceneManager.addScene("test1", $scene);
const player = new Player("player");
$scene.addSystem(new MovementSystem(), SystemStage.PositionUpdate);
// $scene.addSystem(new PrintPositionSystem(), SystemStage.PositionUpdate - 1);
$scene.addEntity(player);
$sceneManager.update();

// Save a scene and reload
$sceneManager.saveCurrentScene("test2");
$sceneManager.removeScene("test1");
$sceneManager.loadScene("test2");

player.takeDamage(10);
$sceneManager.update();
