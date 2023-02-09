import { Renderer, RenderLayer, SpriteLayer } from "../renderer/renderer.js";
import { Component } from "../ecs.js";

import Position from "./Position.js";

import { Types } from "../argTypes.js";

export default class Sprite extends Component {
    static arg_names = ["texAlias", "layer", "z-index"];
    static arg_types = [Types.String, Types.String, Types.Number];

    override dependencies = [Position];
    tex: string;
    layer: RenderLayer;
    zindex: number;
    lr: string;

    //sprites will be drawn above objects with a lower z index than their own
    constructor(texAlias: string, lr: string, zi: number = 0) {
        super();
        this.tex = texAlias;
        this.zindex = zi;
        this.lr = lr;
    }

    override onCreate() {
        const layer = Renderer.getLayer(this.lr, this.owner.scene);
        if (layer && layer instanceof SpriteLayer) layer.addSprite(this);
        this.layer = layer;
    }

    getPos(): {x: number, y: number} {
        const pos = this.owner.get(Position);
        return {x: pos.x, y: pos.y};
    }

    override onDelete() {
        if (this.layer && this.layer instanceof SpriteLayer) 
            this.layer.removeSprite(this);
    }
}
