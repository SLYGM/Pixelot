import {Renderer, RenderSystem} from './renderer/renderer.js';

import { PostProcessing } from './renderer/post_process.js';
import { BarShader } from './renderer/post effects/bars.js';


import { GameObjectBase } from './ecs.js';
import { $scene } from './sceneManager.js';
import { Game } from './gameloop.js';

import './componentManager.js';
import './scriptManager.js';

import Position from './components/Position.js';
import Sprite from './components/Sprite.js';



Renderer.loadTexture('./images/frog.png', 'frog')
Renderer.loadTexture('./images/tile.png', 'tile')

class TestEntity extends GameObjectBase {
    onCreate(): void {
        this.get(Position).x = 50;
        this.get(Position).y = 50;
    }

    update(): void {
        this.get(Position).x += 1;
    }
}

let t = new TestEntity('test');
t.add(new Position).add(new Sprite('frog'));
$scene.addEntity(t);
$scene.addSystem(new RenderSystem(), 0);

PostProcessing.add(new BarShader());

Game.addToUpdateQueue($scene);
Game.start();
