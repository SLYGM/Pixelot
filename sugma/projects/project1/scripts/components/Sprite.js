import * as engine from 'retro-engine';
import Position from "./Position.js";

export default class Sprite extends engine.Component {
    static arg_names = ["texAlias", "layer", "z-index", "rotation", "anchor x", "anchor y"];
    static arg_types = [engine.Types.String, engine.Types.String, engine.Types.Number, engine.Types.Number, engine.Types.Number, engine.Types.Number];
    dependencies = [Position];
    tex;
    layer;
    zindex;
    lr;
    rotation;
    anchor;
    //sprites will be drawn above objects with a lower z index than their own
    constructor(texAlias, lr, zi = 0, rotation = 0, anchorX = 0.5, anchorY = 0.5) {
        super();
        this.tex = texAlias;
        this.zindex = zi;
        this.lr = lr;
        this.rotation = rotation * Math.PI / 2;
        this.anchor = { x: anchorX, y: anchorY };
    }
    onCreate() {
        const layer = engine.Renderer.getLayer(this.lr, this.owner.scene);
        if (layer && layer instanceof engine.SpriteLayer) layer.addSprite(this);
        else return undefined;
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
