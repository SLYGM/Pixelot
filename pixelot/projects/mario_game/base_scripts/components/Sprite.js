import Position from "./Position.js";
export default class Sprite extends engine.Component {
    static arg_names = ["texture", "layer", "z-index", "rotation", "anchor x", "anchor y", "widthMult", "heightMult"];
    static arg_types = [engine.Types.File, engine.Types.String, engine.Types.Number, engine.Types.Number, engine.Types.Number, engine.Types.Number, engine.Types.Number, engine.Types.Number];
    dependencies = [Position];
    tex;
    layer;
    zindex;
    lr;
    rotation;
    anchor;
    sizeMult;
    texture_offset = {x: 0, y: 0};
    texture_scale = {x: 1, y: 1};

    //sprites will be drawn above objects with a lower z index than their own
    constructor(tex_path, lr, zi = 0, rotation = 0, anchorX = 0.5, anchorY = 0.5, widthMult = 1, heightMult = 1) {
        super();
        tex_path = engine.PathUtils.assetPath(tex_path);
        this.tex = engine.Renderer.loadTexture(tex_path);
        this.zindex = zi;
        this.lr = lr;
        this.rotation = rotation * Math.PI/2;
        this.anchor = { x: anchorX, y: anchorY };
        this.sizeMult = { x: widthMult, y: heightMult };
    }

    setTex(tex_path) {
        tex_path = engine.PathUtils.assetPath(tex_path);
        this.tex = engine.Renderer.loadTexture(tex_path);
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
