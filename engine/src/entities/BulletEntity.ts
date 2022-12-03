import Position from "../components/Position.js";
import Sprite from "../components/Sprite.js";
import SpriteCollider from "../components/SpriteCollider.js";
import { GameObjectBase } from "../ecs.js";
import { Game } from "../gameloop.js";
import { $scene } from "../sceneManager.js";
import { Constructor } from "../types.js";
import Score from "./Score.js";

export default class BulletEntity extends GameObjectBase {
    enemyTypes: Constructor<GameObjectBase>[] = [];
    owner: GameObjectBase;
    score: Score = null;

    setOwner(owner: GameObjectBase) {
        this.owner = owner;
        return this;
    }

    onCreate(): void {
        this.get(Position).y = this.owner.get(Position).y - this.owner.get(Sprite).getDimensions().height / 2 - this.get(Sprite).getDimensions().height / 2;
        this.get(Position).x = this.owner.get(Position).x + this.owner.get(Sprite).getDimensions().width / 2 - this.get(Sprite).getDimensions().width / 2;
        this.score = $scene.getEntitiesOfType<Score>(Score)[0];

    }

    addEnemyType(enemyType: Constructor<GameObjectBase>) {
        this.enemyTypes.push(enemyType);
    }

    update(): void {
        console.log(1 / Game.dt)
        this.get(Position).y -= 1;
        if (this.get(Position).y < 0) {
            $scene.deleteEntity(this);
        }

        for (let enemyType of this.enemyTypes) {
            let enemies = $scene.getEntitiesOfType(enemyType);
            for (let enemy of enemies) {
                if (this.get(SpriteCollider).isColliding(enemy.get(SpriteCollider))) {
                    $scene.deleteEntity(this);
                    $scene.deleteEntity(enemy);
                    this.score.score += 10;
                    return;
                }
            }
        }
    }
}
