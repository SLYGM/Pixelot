class SceneManager {
    scenes: Map<string, Scene>;
    currentScene: Scene;
    currentSceneName: string;

    constructor() {
        this.scenes = new Map<string, Scene>();
    }

    addScene(name: string, scene: Scene) {
        this.scenes.set(name, scene);
        if (!this.currentScene) {
            this.currentScene = this.scenes.get(name);
            this.currentSceneName = name;
            this.currentScene.onCreate();
        }
    }

    removeScene(name: string) {
        try {
            if (this.currentSceneName == name) {
                this.currentScene = null
                this.currentSceneName = null
            }
            this.scenes.delete(name);
            console.log('scene deleted');
        } catch (error) {
            throw new Error("Scene does not exist");
        }

    }

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

    update() {
        if (this.currentScene) {
            this.currentScene.update()
        }
    }

    addEntityToCurrentScene<T extends GameObjectBase>(entity: T) {
        if (this.currentScene) {
            this.currentScene.addEntity(entity);
        }
    }

    addEntityToScene<T extends GameObjectBase>(sceneName: string, entity: T) {
        if (this.scenes.get(sceneName)) {
            this.scenes.get(sceneName).addEntity(entity);
        }
    }

    addSystemToScene(sceneName: string, system: System, priority: number) {
        if (this.scenes.get(sceneName)) {
            this.scenes.get(sceneName).addSystem(system, priority);
        }
    }

    saveCurrentScene() {
        // create a JSON object
        const proxies = this.currentScene.getEntities();
        var entities = [];

        for (const proxy of proxies) {
            var components = []
            for (const component of [...proxy.getAllComponents()]) {
                const component_constr = $component_map.get(component)
                components.push({ component_name: component, value: proxy.get(component_constr) })
            }
            entities.push({ name: proxy.name, components: components })
        }

        const sceneSaveFile = {
            name: this.currentSceneName,
            entities: entities
        }

        // convert JSON object to a string
        const data = JSON.stringify(sceneSaveFile)

        const fs = require('fs');
        fs.writeFile("test2.json", data, function (err) {
            if (err) {
                console.log(err);
            }
            console.log('saving json')
        });
    }

    saveAllScenes() {

    }

    loadScene(name: string) {
        const fs = require('fs');
        // read JSON object from file
        fs.readFile(name + '.json', 'utf-8', (err, data) => {
            if (err) {
                throw err
            }

            // parse JSON object
            const loadedSceneJson = JSON.parse(data.toString())
            const loadedEntities = loadedSceneJson['entities'];

            // construct Scene object from json data and add to sceneManager
            var scene = new Scene();
            scene.onCreate();
            for (const entity of loadedEntities) {
                const entity_constr = $entity_Map.get(entity['name']);
                var toAdd = new entity_constr(entity['name']);

                for (const component of entity['components']) {
                    const component_constr = $component_map.get(component['component_name']);
                    toAdd.add(new component_constr(component['value']['x'], component['value']['y']));
                }
                console.log(toAdd);
                scene.addEntity(toAdd);
            };
            //todo add systems to scene
            console.log(scene.getEntities());

            this.addScene(loadedSceneJson['name'], scene);
        })
    }

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
        this.add(new Position).add(new Velocity(1, 1));
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

let $component_map = new Map<string, Constructor<Component>>();
$component_map.set('Position', Position);
$component_map.set('Velocity', Velocity);
let $entity_Map = new Map<string, Constructor<GameObjectBase>>();
$entity_Map.set('player', Player);


let $scene = new Scene();
let $sceneManager = new SceneManager();
$sceneManager.addScene('test1', $scene);
let player: any = new Player('player');
$scene.addSystem(new MovementSystem(), SystemStage.PositionUpdate);
$scene.addSystem(new PrintPositionSystem(), SystemStage.PositionUpdate - 1);
$scene.addEntity(player);
$sceneManager.update();

// Save a scene and reload
$sceneManager.saveCurrentScene();
$sceneManager.removeScene('test1');
$sceneManager.loadScene('test2');

player.takeDamage(10);
$sceneManager.update();
