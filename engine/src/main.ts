import { Renderer, SpriteLayer } from "./renderer/renderer.js";

import { SceneManager } from "./sceneManager.js";
import { Game } from "./gameloop.js";

import { doImports } from "./importManager.js";

await doImports();
Renderer.setResolution(426, 240);
Renderer.addLayer(new SpriteLayer(), 'sprites');
Renderer.loadTexture('./images/frog.png', 'frog');
Renderer.loadTexture('./images/tile.png', 'tile');

// class TestEntity extends GameObjectBase {
//     onCreate(): void {
//         this.get(Position).x = 50;
//         this.get(Position).y = 50;
//     }

//     update(): void {
//         if (KeyStates.isPressed("a")) {
//             this.get(Position).x = 50;
//             this.get(Position).y = 50;
//         } else {
//             this.get(Position).x = MouseState.world_pos.x;
//             this.get(Position).y = MouseState.world_pos.y;
//         }
//     }
// }

// const t = new TestEntity("test");
// t.add(new Position()).add(new Sprite("frog", "sprites", 1));
// $scene.addEntity(t);

// PostProcessing.add(new BarShader());
// PostProcessing.add(new BarrelShader());

// Game.addToUpdateQueue($scene);
// Game.start();

Game.addToUpdateQueue(SceneManager);
SceneManager.loadScene('test2');
Game.start();
