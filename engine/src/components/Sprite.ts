import { Renderer, RenderLayer, SpriteLayer } from "../renderer/renderer.js";

import { Component } from "../ecs.js";

import { Texture } from "../types.js";
import Position from "./Position.js";

export default class Sprite extends Component {
    dependencies = [Position];
    tex: string;
    layer: RenderLayer;
    zindex: number;

    //sprites will be drawn above objects with a lower z index than their own
    constructor(texAlias: string, lr: string, zi: number = 0) {
        super();
        this.tex = texAlias;
        this.zindex = zi;
        const layer = Renderer.getLayer(lr);
        if (layer && layer instanceof SpriteLayer) layer.addSprite(this);
        else return undefined;
        this.layer = layer;
    }

    getPos(): {x: number, y: number} {
        const pos = this.owner.get(Position);
        return {x: pos.x, y: pos.y};
    }
}
