import BoxCollider from "../components/BoxCollider.js";
import Position from "../components/Position.js";
import PlatformerAnimation from "../components/PlatformerAnimation.js";
import Velocity from "../components/Velocity.js";

export default class PlatformerController extends engine.GameObjectBase {
    static arg_names = ["speed", "jump_force", "gravity"];
    static arg_types = [engine.Types.Number, engine.Types.Number, engine.Types.Number];

    onCreate(speed, jump_force, gravity) {
        this.speed = speed;
        this.jump_force = jump_force;
        this.onFloor = false;
        this.gravity = gravity;
        this.dx = 0;
        this.dy = 0;
    }

    update(dt) {
        this.dx = 0;
        this.dy += this.gravity * dt;
        if (engine.KeyStates.isPressed("a")) {
            this.dx -= this.speed * dt;
        }
        if (engine.KeyStates.isPressed("d")) {
            this.dx += this.speed * dt;
        }
        if (engine.KeyStates.isPressed("w")) {
            this.jump(dt);
        }
        this.updatePos();
        let direction = this.dx > 0 ? "right" :
            this.dx < 0 ? "left" : this.direction;
        this.direction = direction;
        let action = this.dy != 0 ? "jump" :
            this.dx != 0 ? "walk" : "idle";
        this.PlatformerAnimation.setAnimation(action + "_" + direction);
        this.PlatformerAnimation.update();
    }

    jump(dt) {
        if (this.onFloor) {
            this.dy = -this.jump_force * dt;
            this.onFloor = false;
        }
    }

    updatePos() {
        let x = this.dx;
        let y = this.dy;
        const box = this.BoxCollider;
        const v1 = box.getValues();
        let newV = { x: v1.x + x, y: v1.y + y, w: v1.w, h: v1.h }

        const entities = engine.SceneManager.currentScene.getEntitiesWithComponent(BoxCollider);
        let touchingFloor = false;

        for (let entity of entities) {
            if (entity === this) continue;
            const other = entity.get(BoxCollider);
            if (!other.solid) continue;
            const v2 = other.getValues();
            if (!box.checkCollision(newV, v2)) continue;
            if (y > 0) touchingFloor = true;
            if (box.checkCollision(v1, v2)) continue; //if already colliding, ignore
            newV = { x: v1.x + x, y: v1.y, w: v1.w, h: v1.h }; //create new estimated position based on changes
            if (box.checkCollision(newV, v2)) {
                if (x > 0)
                    x = Math.max(v2.x - (v1.x + v1.w), 0);
                else if (x < 0)
                    x = Math.min((v2.x + v2.w) - v1.x, 0);
                this.dx = x;
            }
            newV = { x: v1.x, y: v1.y + y, w: v1.w, h: v1.h }; //create new estimated position based on changes
            if (box.checkCollision(newV, v2)) {
                if (y > 0)
                    y = Math.max(v2.y - (v1.y + v1.h), 0);
                else if (y < 0)
                    y = Math.min((v2.y + v2.h) - v1.y, 0);
                this.dy = y;
            }
            newV = { x: v1.x + x, y: v1.y + y, w: v1.w, h: v1.h }; //create new estimated position based on changes
        }
        this.onFloor = touchingFloor;

        const pos = this.get(Position);
        pos.x += x;
        pos.y += y;
    }
}
