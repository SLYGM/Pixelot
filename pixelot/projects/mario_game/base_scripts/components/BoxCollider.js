// import * as engine from 'retro-engine';

import Position from "./Position.js";
import Sprite from "./Sprite.js";

export default class BoxCollider extends engine.Component {
    dependencies = [Position, Sprite];
    static arg_names = ["solid"];
    static arg_types = [engine.Types.Boolean];
    solid = false;


    constructor(solid) {
        super();
        this.solid = solid;
    }

    getDimensions() {
        const sprite = this.owner.get(Sprite);
        const texInfo = sprite.tex;
        const scale = sprite.texture_scale;
        if (texInfo !== undefined) {
            return {width: texInfo.width * scale.x, height: texInfo.height * scale.y};
        }
        return {width: 0, height: 0};
    }

    getValues() {
        const pos = this.owner.get(Position);
        const dim = this.getDimensions();
        const sprite = this.owner.get(Sprite);
        const sizeMult = sprite.sizeMult;
        return {
            x: pos.x - (sprite.anchor.x * dim.width * sizeMult.x),
            y: pos.y - (sprite.anchor.y * dim.height * sizeMult.y),
            w: dim.width * sizeMult.x,
            h: dim.height * sizeMult.y
        }
    }

    //Function that returns the lower y value of the box collider
    getLowerY() {
        const v = this.getValues();
        return v.y + v.h;
    }

    getUpperY() {
        const v = this.getValues();
        return v.y;
    }

    isColliding(other) {
        const v1 = this.getValues();
        const v2 = other.getValues();

        return this.checkCollision(v1, v2);
    }

    checkCollision(v1, v2) {
        return  v1.x < v2.x + v2.w &&
                v1.x + v1.w > v2.x &&
                v1.y < v2.y + v2.h &&
                v1.y + v1.h > v2.y;
    }

}