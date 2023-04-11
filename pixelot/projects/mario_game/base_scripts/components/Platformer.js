// import * as engine from 'retro-engine';

import BoxCollider from "./BoxCollider.js";
import Position from "./Position.js";
import Sprite from "./Sprite.js";

export default class Platformer extends engine.Component {
    dependencies = [BoxCollider];
    static arg_names = [];
    static arg_types = [];

    dx = 0;
    dy = 0;

    gravity = 0.01;

    onFloor = false;

    constructor() {
        super();
    }

    jump() {
        this.dy = -1;
    }

    move(x) {
        this.dx = x;
    }

    update() {
        this.dy += this.gravity;
        this.dy = Math.min(this.dy, 3);
        this.updatePos();
    }

    updatePos() {
        let x = this.dx;
        let y = this.dy;
        const box = this.owner.get(BoxCollider);
        const v1 = box.getValues();
        let newV = { x: v1.x + x, y: v1.y + y, w: v1.w, h: v1.h}

        const entities = engine.SceneManager.currentScene.getEntitiesWithComponent(BoxCollider);
        let touchingFloor = false;
        
        for (let entity of entities) {
            if (entity === this.owner) continue;
            const other = entity.get(BoxCollider);
            if (!other.solid) continue;
            const v2 = other.getValues();
            if (!box.checkCollision(newV, v2)) continue;
            if (y > 0) touchingFloor = true;
            if (box.checkCollision(v1, v2)) continue; //if already colliding, ignore
            newV = { x: v1.x + x, y: v1.y, w: v1.w, h: v1.h}; //create new estimated position based on changes
            if (box.checkCollision(newV, v2)) {
                if (x > 0)
                    x = Math.max(v2.x - (v1.x + v1.w), 0);
                else if (x < 0)
                    x = Math.min((v2.x + v2.w) - v1.x, 0);
                this.dx = x;
            }
            newV = { x: v1.x, y: v1.y + y, w: v1.w, h: v1.h}; //create new estimated position based on changes
            if (box.checkCollision(newV, v2)) {
                if (y > 0)
                    y = Math.max(v2.y - (v1.y + v1.h), 0);
                else if (y < 0)
                    y = Math.min((v2.y + v2.h) - v1.y, 0);
                this.dy = y;
            }
            newV = { x: v1.x + x, y: v1.y + y, w: v1.w, h: v1.h}; //create new estimated position based on changes
        }
        this.onFloor = touchingFloor;

        const pos = this.owner.get(Position);
        pos.x += x;
        pos.y += y;
    }

    

}