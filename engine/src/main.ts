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
import { ImportManager } from "./componentManager.js";
import SpriteAnimationSystem from "./systems/SpriteAnimationSystem.js";
import AnimatedSprite from "./components/AnimatedSprite.js";
import { Constructor } from "./types.js";
import InvaderSystem from "./systems/InvaderSystem.js";
import Invader from "./components/Invader.js";
import InvaderEntity from "./entities/InvaderEntity.js";
import PlayerEntity from "./entities/PlayerEntity.js";
import Score from "./entities/Score.js";

Renderer.setResolution(256, 128);
Renderer.setBackgroundColor(0.5,0.5,0,1);
const l = new SpriteLayer();
Renderer.addLayer(l, 'sprites');
Renderer.loadTexture('./images/frog.png', 'frog')
Renderer.loadTexture('./images/tile.png', 'tile')
Renderer.loadTexture('./images/player.png', 'player')
Renderer.loadTexture('./images/bullet.png', 'bullet')
PostProcessing.add(new BarrelShader())
PostProcessing.add(new CRTShader())
for (let i of [0,1]) 
    Renderer.loadTexture(`./images/bottom_invader ${i}.png`, `invader_${i}`)

for (let i = 0; i <= 9; i++) {
    Renderer.loadTexture(`./images/${i}.png`, `${i}`);
}


$scene.addSystem(new SpriteAnimationSystem(), 1);
$scene.addSystem(new InvaderSystem(), 1);

//Setup scene
for (let i = 0; i < 256/16 - 4; i++) {
    let invader = new InvaderEntity("invader"+i);
    invader.add(new Position).add(new AnimatedSprite("invader", "sprites", 7.5, 2, 1, true)).add(new SpriteCollider()).add(new Invader);
    let pos = invader.get(Position);
    pos.x = (16 + 2) * i + 32; pos.y = 50;
    $scene.addEntity(invader);
}

//Add player
const player = new PlayerEntity("player");
player.add(new Position).add(new Sprite("player", "sprites")).add(new SpriteCollider());
let pos = player.get(Position);
pos.x = 128; pos.y = 100;
$scene.addEntity(player);

//Add score
const score = new Score("score");
console.log(score)
console.log($scene)
$scene.addEntity(score);




// PostProcessing.add(new BarrelShader());
// PostProcessing.add(new CRTShader());

Game.addToUpdateQueue($scene);
Game.start();
