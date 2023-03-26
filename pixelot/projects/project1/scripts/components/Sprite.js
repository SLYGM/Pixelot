import Position from "./Position.js";
export default class Sprite extends engine.Component {
    static arg_names = ["texture", "layer", "z-index", "rotation", "anchor x", "anchor y"];
    static arg_types = [engine.Types.File, engine.Types.String, engine.Types.Number, engine.Types.Number, engine.Types.Number, engine.Types.Number];
    dependencies = [Position];
    tex;
    layer;
    zindex;
    lr;
    rotation;
    anchor = {x:0.5, y:0.5};
    //sprites will be drawn above objects with a lower z index than their own
    constructor(tex_path, lr, zi = 0, rotation = 0, anchorX = 0.5, anchorY = 0.5) {
        super();
        tex_path = engine.PathUtils.assetPath(tex_path);
        this.tex = engine.Renderer.loadTexture(tex_path);
        this.zindex = zi;
        this.lr = lr;
        this.rotation = rotation * Math.PI;
        this.anchor.x = anchorX;
        this.anchor.y = anchorY;
    }
    onCreate() {
        const layer = engine.Renderer.getLayer(this.lr, this.owner.scene);
        if (layer && layer instanceof engine.SpriteLayer)
            layer.addSprite(this);
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
