import { Renderer, RenderLayer, SpriteLayer } from "../renderer/renderer.js";

import { Component } from "../ecs.js";

import { Texture } from "../types.js";
import Position from "./Position.js";
import Sprite from "./Sprite.js";

export default class SpriteCollider extends Component {
    dependencies = [Position, Sprite];
    dimensions : {width: number, height: number};

    //sprites will be drawn above objects with a lower z index than their own
    constructor() {
        super();
    }

    isColliding(collider2: SpriteCollider): boolean {
        const pos1 = this.owner.get(Sprite).getPos();
        const dim1 = this.owner.get(Sprite).getDimensions();
        const pos2 = collider2.owner.get(Sprite).getPos();
        const dim2 = collider2.owner.get(Sprite).getDimensions();
        return (
            pos1.x < pos2.x + dim2.width &&
            pos1.x + dim1.width > pos2.x &&
            pos1.y < pos2.y + dim2.height &&
            pos1.y + dim1.height > pos2.y
        );
    }
}
