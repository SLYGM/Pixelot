import { Renderer, RenderSystem } from "./renderer/renderer.js";

import { PostProcessing } from './renderer/post_process.js';
import { BarShader } from './renderer/post effects/bars.js';
import BarrelShader from './renderer/post effects/barrel.js';

import { GameObjectBase } from "./ecs.js";
import { Game } from "./gameloop.js";

import "./componentManager.js";
import "./scriptManager.js";

import Position from "./components/Position.js";
import Sprite from "./components/Sprite.js";

import { KeyStates } from "./keyState.js";
import { MouseState } from "./mouseState.js";

import './scriptManager.js';
import './componentManager.js';
import CRTShader from "./renderer/post effects/crt.js";

import { $scene, $sceneManager } from "./sceneManager.js";
import { ImportManager } from "./componentManager.js";

Renderer.setResolution(426, 240);
Renderer.loadTexture('./images/frog.png', 'frog')
Renderer.loadTexture('./images/tile.png', 'tile')

class TestEntity extends GameObjectBase {
    onCreate(): void {
        this.get(Position).x = 50;
        this.get(Position).y = 50;
    }

    update(): void {
        if (KeyStates.isPressed("a")) {
            this.get(Position).x = 50;
            this.get(Position).y = 50;
        } else {
            this.get(Position).x = MouseState.world_pos.x;
            this.get(Position).y = MouseState.world_pos.y;
        }
    }
}

ImportManager.addEntity(TestEntity.name, TestEntity);

const t = new TestEntity("test");
t.add(new Position()).add(new Sprite("frog"));
$scene.addEntity(t);
$scene.addSystem(new RenderSystem(), 0);

PostProcessing.add(new BarrelShader());
PostProcessing.add(new CRTShader());

Game.addToUpdateQueue($scene);
Game.start();
