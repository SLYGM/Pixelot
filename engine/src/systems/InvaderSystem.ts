import AnimatedSprite from "../components/AnimatedSprite.js";
import Invader from "../components/Invader.js";
import Position from "../components/Position.js";
import SpriteCollider from "../components/SpriteCollider.js";
import { GameObjectBase, System } from "../ecs.js";
import PlayerEntity from "../entities/PlayerEntity.js";
import { Game } from "../gameloop.js";

import { $scene } from "../sceneManager.js";


export default class InvaderSystem extends System {
    component = Invader;
    tickTime = 0.5;
    currTime = 0;
    rowLength = 11;
    currX = 0;
    direction = 1;
    player: GameObjectBase = null;

    update(entities: Set<GameObjectBase>) {
        if (this.player == null) {
            let players = $scene.getEntitiesOfType(PlayerEntity);
            this.player = players.length > 0 ? players[0] : null;
        }
        
        this.currTime += Game.dt;
        if (this.currTime >= this.tickTime) {
            this.currTime %= this.tickTime;
            let x = this.direction;
            let y = this.direction == 0 ? 1 : 0;
            entities.forEach((e) => {
                e.get(Invader).move(x, y);
            })
            this.currX += x;
            if (this.direction == 0) {
                this.direction = this.currX == 0 ? 1 : -1;
            }
            else if (this.direction == 1 && this.currX >= this.rowLength - 1) {
                this.direction = 0;
            }
            else if (this.direction == -1 && this.currX <= 0) {
                this.direction = 0;
            }

            if (Array.from(entities).some((e) => {return e.get(SpriteCollider).isColliding(this.player.get(SpriteCollider));})) {
                console.log("Game Over");
                Game.stop();
            }
        }

    }
}