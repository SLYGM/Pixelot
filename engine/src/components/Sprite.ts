import { Renderer, RenderLayer, SpriteLayer } from "../renderer/renderer.js";
import { Component } from "../ecs.js";

import Position from "./Position.js";

import { Types } from "../argTypes.js";
import { Texture } from "../types.js";
import { PathUtils } from "../engineExport.js";

export default class Sprite extends Component {
    static arg_names = ["texture", "layer", "z-index", "rotation", "anchor x", "anchor y", "width mult", "height mult"];
    static arg_types = [Types.File, Types.String, Types.Number, Types.Number, Types.Number, Types.Number, Types.Number, Types.Number];

    override dependencies = [Position];
    tex: Texture;
    layer: RenderLayer;
    zindex: number;
    lr: string;
    rotation: number;
    anchor: {x: number, y: number};
    sizeMult: {x: number, y: number};
    texture_offset: {x: number, y: number} = {x: 0, y: 0};
    texture_scale: {x: number, y: number} = {x: 1, y: 1};

    //sprites will be drawn above objects with a lower z index than their own
    constructor(tex_path: string, lr: string, zi: number = 0, rotation: number = 0, anchorX: number = 0.5, anchorY: number = 0.5, widthMult: number = 1, heightMult: number = 1) {
        super();
        const full_path = PathUtils.assetPath(tex_path);
        this.tex = Renderer.loadTexture(tex_path);
        this.zindex = zi;
        this.lr = lr;
        this.rotation = rotation * Math.PI;
        this.anchor.x = anchorX;
        this.anchor.y = anchorY;
        this.sizeMult = {x: widthMult, y: heightMult } ;
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
