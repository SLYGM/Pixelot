import { Renderer, SpriteLayer } from "./renderer/renderer.js";

import { SceneManager } from "./sceneManager.js";
import { Game } from "./gameloop.js";

import { doImports } from "./importManager.js";

await doImports();
Renderer.setResolution(426, 240);
Renderer.addLayer(new SpriteLayer(), 'sprites');
Renderer.loadTexture('./images/frog.png', 'frog');
Renderer.loadTexture('./images/tile.png', 'tile');

Game.addToUpdateQueue(SceneManager);
SceneManager.loadScene('test2');
Game.start();
