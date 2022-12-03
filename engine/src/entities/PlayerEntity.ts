import Position from "../components/Position.js";
import Sprite from "../components/Sprite.js";
import SpriteCollider from "../components/SpriteCollider.js";
import { GameObjectBase } from "../ecs.js";
import { Game } from "../gameloop.js";
import { KeyStates } from "../keyState.js";
import { $scene } from "../sceneManager.js";
import BulletEntity from "./BulletEntity.js";
import InvaderEntity from "./InvaderEntity.js";

export default class PlayerEntity extends GameObjectBase {
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
            bullet.setOwner(this);
            bullet.addEnemyType(InvaderEntity);
            $scene.addEntity(bullet);
        }
    }
}
