import { GameObjectBase, System } from "./ecs.js";
import { Scene } from "./scene.js";
import { ImportManager } from "./importManager.js";
import { FileUtils } from "./engineExport.js";

const nw = (window as any).nw;
let fs;
if (nw) {
    fs = nw.require("fs");
} else {
    fs = require("fs");
}

export class SceneManager {
    static loaded_scenes: Map<string, Scene>;
    static currentScene: Scene;
    static project_dir?: string;

    static {
        this.loaded_scenes = new Map();
        this.currentScene = null;
    }
    
    /**
    * Gets an array of loaded scene names
    *
    *@returns array of strings of scene names
    */
    static getSceneNames() {
        return Array.from(this.loaded_scenes.keys());
    }
    
    
    /**
     * Switches the current scene to the scene with the given name
     * 
     * @param scene_name The name of the scene to switch to
     * @param unload_current Whether to unload the current scene
     */
    static switchToScene(scene_name: string, unload_current = true) {
        if (unload_current && this.currentScene) {
            this.currentScene.destroy();
            this.loaded_scenes.delete(this.currentScene.name);
        }

        // check if the scene has been pre-loaded
        if (this.loaded_scenes.has(scene_name)) {
            this.currentScene = this.loaded_scenes.get(scene_name);
        } else {
            let path: string;
            if (this.project_dir) {
                path = FileUtils.findFile(scene_name + ".scene", this.project_dir);
                console.log("Loading scene from " + path);
                if (!path) {
                    throw new Error("No scene found with name " + scene_name);
                }
            } else {
                // If the project_dir is not set, we are running a built project, so the path is known
                path = "./game/scenes/" + scene_name + ".scene";
            }
            this.currentScene = this.loadScene(path);
            this.loaded_scenes.set(scene_name, this.currentScene);
        }
    }


    /**
     * Pre-load the scene with the given name, so that it can be quickly switched to later
     * 
     * @param scene_name The name of the scene to load
     */
    static preLoadScene(scene_name: string) {
        if (!this.loaded_scenes.has(scene_name)) {
            let path: string;
            if (this.project_dir) {
                path = FileUtils.findFile(scene_name + ".scene", this.project_dir);
                console.log("Loading scene from " + path);
                if (!path) {
                    throw new Error("No scene found with name " + scene_name);
                }
            } else {
                // If the project_dir is not set, we are running a built project, so the path is known
                path = "./game/scenes/" + scene_name + ".scene";
            }
            this.loaded_scenes.set(scene_name, this.loadScene(path));
        } else {
            console.log(`Warning: scene ${scene_name} has already been pre-loaded`);
        }
    }


    /**
     * Unload the scene with the given name
     * 
     * @param scene_name name of the scene to unload
     */
    static unloadScene(scene_name: string) {
        if (this.loaded_scenes.has(scene_name)) {
            this.loaded_scenes.get(scene_name).destroy();
            this.loaded_scenes.delete(scene_name);
        } else {
            throw new Error(`Scene ${scene_name} has not been loaded`);
        }
    }


    /**
     * Pre-load all scenes in the given list of scene names
     * 
     * @param scene_names The names of the scenes to load
     */
    // static batchLoadScenes(scene_names: string[]) {
        // scene_names.forEach((scene_name) => { this.preLoadScene(scene_name); });
    // }


    /**
     * Load a scene by name from a json file
     * 
     * @param path The path to the scene file
     * @returns the loaded scene
     */
    static loadScene(path: string): Scene {
        // read JSON object from file
        const data = fs.readFileSync(path, "utf8");

        // parse JSON object
        const loadedSceneJson = JSON.parse(data.toString());
        const loadedEntities = loadedSceneJson["entities"];

        // construct Scene object from json data and add to sceneManager
        const scene = new Scene(loadedSceneJson["name"]);

        // construct each entity in the scene
        for (const entity of loadedEntities) {
            const entity_constr = ImportManager.getEntity(entity["class"]);
            const toAdd = new entity_constr.constr(entity["name"]);
            const ent_args = entity_constr.parseArgs(entity["args"]);

            // construct each component on the entity
            for (const component of entity["components"]) {
                const component_constr = ImportManager.getComponent(component["component_name"]);
                const comp_args = component_constr.parseArgs(component["args"]);
                toAdd.add(new component_constr.constr(...comp_args));
            }

            scene.addEntity(toAdd, ent_args);
        }

        return scene
    }

    /**
     * Updates the current scene only
     */
    static update() {
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
    static addEntityToScene<T extends GameObjectBase>(sceneName: string, entity: T, args: any[] = []) {
        this.loaded_scenes.get(sceneName).addEntity(entity, args);
    }

    /**
     * Add a system to a specified scene in the scene manager
     *
     * @param sceneName name of scene to which system is to be added
     * @param system system object to be added
     * @param priority priority of system to be added
     */
    static addSystemToScene(sceneName: string, system: System, priority: number) {
        this.loaded_scenes.get(sceneName).addSystem(system, priority);
    }
    
    /**
    * Create a json for a new scene
    *
    * @param sceneName name of the scene
    * @param path path to the where the scene will be saved
    * @returns boolean which indicates success of operation
    */
    static createScene(sceneName: string, path: string) {
        // make sure that the scene doesn't already exist
        if (fs.existsSync(path + sceneName + ".scene")) {
            console.log(`Warning: trying to create scene: ${sceneName} which already exists`);
            return false;
        }
        
        // template for scene JSONs
        const template = 
`{
    "name": "${sceneName}",
    "entities": []
}`;
        
        fs.writeFileSync(path + sceneName + ".scene", template);
        return true;
    }

    /**
     * Save current scene to a json file
     *
     * @param fileName name of file to which scene will be saved
     */
    // saveCurrentScene(fileName: string) {
    //     // create a JSON object
    //     const proxies = this.currentScene.getEntities();
    //     const entities = [];

    //     for (const proxy of proxies) {
    //         const components = [];
    //         for (const component of [...proxy.getAllComponents()]) {
    //             const component_constr = $component_map.get(component);
    //             components.push({
    //                 component_name: component,
    //                 value: proxy.get(component_constr),
    //             });
    //         }
    //         entities.push({ name: proxy.name, components: components });
    //     }

    //     const sceneSaveFile = {
    //         name: this.currentSceneName,
    //         entities: entities,
    //     };

    //     // convert JSON object to a string
    //     const data = JSON.stringify(sceneSaveFile);

    //     const fs = require("fs");
    //     fs.writeFile(fileName + ".json", data, function (err) {
    //         if (err) {
    //             console.log(err);
    //         }
    //         console.log("saving json");
    //     });
    // }
}
