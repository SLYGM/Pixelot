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
        if (this.currentSceneName == name) {
            this.currentScene = undefined
            this.currentSceneName = undefined
        }
        this.scenes.delete(name);
    }

    switchToScene(name: string) {
        this.currentScene.onPause();
        const nextScene = this.scenes.get(name);
        nextScene.onResume();
        this.currentSceneName = name;
        this.currentScene = nextScene;
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

    addSystemToCurrentScene(system: System) {
        if (this.currentScene) {
            this.currentScene.addSystem(system);
        }
    }

    addSystemToScene(sceneName: string, system: System) {
        if (this.scenes.get(sceneName)) {
            this.scenes.get(sceneName).addSystem(system);
        }
    }

    saveCurrentScene() {
        // create a JSON object
        const sceneSaveFile = {
            name: this.currentSceneName,
            entities: this.currentScene.getEntities(),
            systems: this.currentScene.getSystems()
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
        const fs = require('fs')
        // read JSON object from file
        fs.readFile(name + '.json', 'utf-8', (err, data) => {
            if (err) {
                throw err
            }

            // parse JSON object
            const loadedSceneJson = JSON.parse(data.toString())
            const loadedSystems = loadedSceneJson['systems'];
            const loadedEntities = loadedSceneJson['entities'];

            // construct Scene object from json data and add to sceneManager
            const scene = new Scene();
            for (const system of loadedSystems) {
                console.log('hel');
                // scene.addSystem(system);
            };
            for (const entity of loadedEntities) {
                console.log('lo');
                // scene.addEntity(entity);
            };
            this.addScene(loadedSceneJson['name'], scene);
            console.log('done loading');
        })
    }

    batchLoadScenes() {

    }
}

//* example usage

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

    update(entities: Set<GameObjectBase>) {
        for (const entity of entities) {
            // console.log("Updating entity", entity);
            const position = entity.get(Position);
            const velocity = entity.get(Velocity);
            position.x += velocity.x * $scene.dt;
            position.y += velocity.y * $scene.dt;
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
            // console.log("Player is dead");
            $scene.deleteEntity(this);
        }
    }
    takeDamage(amount: number) {
        this.health -= amount;
    }
}

let $sceneManager = new SceneManager();
let $scene = new Scene();
$sceneManager.addScene('test1', $scene);
let player: any = new Player();
$scene.addSystem(new MovementSystem());
$scene.addEntity(player);
$sceneManager.update();

// Save a scene and reload
//! Saving Entities saves proxy and cannot save System object in json, check with other guys if they know more
$sceneManager.saveCurrentScene();
$sceneManager.removeScene('test1');
$sceneManager.loadScene('test2');
setTimeout(() => { console.log($sceneManager); }, 5000);


// position is now (1, 1)
// this is an example of how since player is a proxy we can access the position component directly
// although TypeScript doesn't play nice with proxies so we have to set the type to any.
// This shouldn't be a problem since the user is working in JS not TS anyway.
// console.log(player.Position);
// player.takeDamage(10);
// $sceneManager.update();
