import { Renderer, RenderLayer, SpriteLayer } from "retro-engine";
import { Component, Types } from "retro-engine";
import Position from "./Position.js";
export default class Sprite extends Component {
    static arg_names = ["texAlias", "lr", "zi"];
    static arg_types = [Types.String, Types.String, Types.Number];
    dependencies = [Position];
    tex;
    layer;
    zindex;
    //sprites will be drawn above objects with a lower z index than their own
    constructor(texAlias, lr, zi = 0) {
        super();
        this.tex = texAlias;
        this.zindex = zi;
        const layer = Renderer.getLayer(lr);
        if (layer && layer instanceof SpriteLayer)
            layer.addSprite(this);
        else
            return undefined;
        this.layer = layer;
    }
    getPos() {
        const pos = this.owner.get(Position);
        return { x: pos.x, y: pos.y };
    }
}
