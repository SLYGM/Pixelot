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
import { Constructor } from "./types.js";
// import SpriteAnimationSystem from "./systems/SpriteAnimationSystem.js";

Renderer.setResolution(256, 128);
Renderer.setBackgroundColor(0,0,0,1);
const l = new SpriteLayer();
Renderer.addLayer(l, 'sprites');
Renderer.loadTexture('./images/frog.png', 'frog')
Renderer.loadTexture('./images/tile.png', 'tile')
Renderer.loadTexture('./images/player.png', 'player')
Renderer.loadTexture('./images/bullet.png', 'bullet')
for (let i of [0,1]) 
    Renderer.loadTexture(`./images/bottom_invader ${i}.png`, `invader_${i}`)

for (let i = 0; i <= 9; i++) {
    Renderer.loadTexture(`./images/${i}.png`, `${i}`);
}

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
    }

}

//PlayerEntity that moves left and right based on key input (using the KeyStates class)
class PlayerEntity extends GameObjectBase {
    bulletCount: number;
    rechargeTime = 1;
    spawnDelay = 0;
    
    onCreate(): void {
        this.bulletCount = 0;
    }

    update(): void {
        if (this.spawnDelay > 0)
            this.spawnDelay -= Game.dt;

        if (KeyStates.isPressed('ArrowLeft') && this.get(Position).x > 0) {
            this.get(Position).x -= 1;
        }
        if (KeyStates.isPressed('ArrowRight') && this.get(Position).x + this.get(Sprite).getDimensions().width < 256) {
            this.get(Position).x += 1;
        }
        if (KeyStates.isPressed(' ') && this.spawnDelay <= 0) {
            this.spawnDelay = this.rechargeTime;
            let bullet = new BulletEntity("bulllet"+this.bulletCount).add(new Position).add(new Sprite('bullet', 'sprites', 0)).add(new SpriteCollider);
            bullet.addEnemyType(InvaderEntity);
            $scene.addEntity(bullet);
        }
    }
}

class UIDigit extends GameObjectBase {
    value: number = 0;
    onCreate() {
    }

    setValue(value: number) {
        this.value = value;
        this.get(Sprite).tex = `${this.value}`;
    }

    update(): void {
    }
}

class Score extends GameObjectBase {
    score: number = 0;
    digits: UIDigit[] = [];
    x: number = 5;
    y: number = 10;
    onCreate(): void {
        this.updateScore();
    }

    update(): void {
        this.updateScore();
    }

    createNewDigit() : UIDigit {
        let digit = new UIDigit(`score_digit_${this.digits.length}`).add(new Position).add(new Sprite('0', 'sprites', 2));
        digit.get(Position).x = this.x + this.digits.length * (8 + 2);
        digit.get(Position).y = this.y;
        $scene.addEntity(digit);
        this.digits.push(digit);
        return digit;
    }

    updateScore() {
        let score = String(this.score);
        console.log(score);
        while (this.digits.length !== score.length) {
            this.createNewDigit();
        }
        for (let i = 0; i < score.length; i++) {
            this.digits[i].setValue(Number.parseInt(score[i]));
        }
    }
}
        

class BulletEntity extends GameObjectBase {
    enemyTypes: Constructor<GameObjectBase>[] = [];

    onCreate(): void {
        this.get(Position).y = player.get(Position).y - player.get(Sprite).getDimensions().height / 2 - this.get(Sprite).getDimensions().height / 2;
        this.get(Position).x = player.get(Position).x + player.get(Sprite).getDimensions().width / 2 - this.get(Sprite).getDimensions().width / 2;
    }

    addEnemyType(enemyType: Constructor<GameObjectBase>) {
        this.enemyTypes.push(enemyType);
    }

    update(): void {
        this.get(Position).y -= 1;
        if (this.get(Position).y < 0) {
            $scene.deleteEntity(this);
        }

        for (let enemyType of this.enemyTypes) {
            let enemies = $scene.getEntitiesOfType(enemyType);
            for (let enemy of enemies) {
                if (this.get(SpriteCollider).isColliding(enemy.get(Position), enemy.get(Sprite).getDimensions())) {
                    $scene.deleteEntity(this);
                    $scene.deleteEntity(enemy);
                    score.score += 10;
                    return;
                }
            }
        }
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
