import * as engine from 'retro-engine';
import Position from "./Position.js";

export default class Sprite extends engine.Component {
    static arg_names = ["texAlias", "layer", "z-index"];
    static arg_types = [engine.Types.String, engine.Types.String, engine.Types.Number];
    dependencies = [Position];
    tex;
    layer;
    zindex;
    //sprites will be drawn above objects with a lower z index than their own
    constructor(texAlias, lr, zi = 0) {
        super();
        this.tex = texAlias;
        this.zindex = zi;
        const layer = engine.Renderer.getLayer(lr);
        if (layer && layer instanceof engine.SpriteLayer)
            layer.addSprite(this);
        else
            return undefined;
        this.layer = layer;
    }
    getPos() {
        const pos = this.owner.get(Position);
        return { x: pos.x, y: pos.y };
    }
    onDelete() {
        if (this.layer && this.layer instanceof engine.SpriteLayer)
            this.layer.removeSprite(this);
    }
}
