import { Renderer, RenderLayer, SpriteLayer } from "./renderer/renderer.js";

import { PostProcessing } from './renderer/post_process.js';
import { BarShader } from './renderer/post effects/bars.js';
import BarrelShader from './renderer/post effects/barrel.js';

import { GameObjectBase, System } from "./ecs.js";
import { $scene } from "./sceneManager.js";
import { Game } from "./gameloop.js";

import "./componentManager.js";
import "./scriptManager.js";

import Position from "./components/Position.js";
import Sprite from "./components/Sprite.js";
import SpriteCollider from "./components/SpriteCollider.js";

import { KeyStates } from "./keyState.js";
import { MouseState } from "./mouseState.js";

import './scriptManager.js';
import './componentManager.js';
import CRTShader from "./renderer/post effects/crt.js";
// import AnimatedSprite from "./components/AnimatedSprite.js";
import { ImportManager } from "./componentManager.js";
import SpriteAnimationSystem from "./systems/SpriteAnimationSystem.js";
import AnimatedSprite from "./components/AnimatedSprite.js";
// import SpriteAnimationSystem from "./systems/SpriteAnimationSystem.js";

Renderer.setResolution(256, 128);
const l = new SpriteLayer();
Renderer.addLayer(l, 'sprites');
Renderer.loadTexture('./images/frog.png', 'frog')
Renderer.loadTexture('./images/tile.png', 'tile')
for (let i of [0,1]) 
    Renderer.loadTexture(`./images/bottom_invader ${i}.png`, `invader_${i}`)

class InvaderEntity extends GameObjectBase {
    onCreate(): void {
    }

    update(): void {
        if (this.get(SpriteCollider).isColliding({
            x: MouseState.world_pos.x,
            y: MouseState.world_pos.y
        },
        {
            width: 1, height: 1
        })) {
            console.log("pam!");
            $scene.deleteEntity(this);
            $scene.update();
        }
        // if (KeyStates.isPressed("a")) {
        //     this.get(Position).x = 50;
        //     this.get(Position).y = 50;
        // } else {
        //     this.get(Position).x = MouseState.world_pos.x;
        //     this.get(Position).y = MouseState.world_pos.y;
        // }
    }

}

$scene.addSystem(new SpriteAnimationSystem(), 1);

//Setup scene
for (let i = 0; i < 256/16 - 4; i++) {
    let invader = new InvaderEntity("invader"+i);
    invader.add(new Position).add(new AnimatedSprite("invader", "sprites", 7.5, 2, 1)).add(new SpriteCollider());
    let pos = invader.get(Position);
    pos.x = 16 * i + 32; pos.y = 50;
    $scene.addEntity(invader);
}


// PostProcessing.add(new BarrelShader());
// PostProcessing.add(new CRTShader());

Game.addToUpdateQueue($scene);
Game.start();
