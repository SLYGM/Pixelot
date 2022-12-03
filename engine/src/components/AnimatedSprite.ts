import { Renderer, RenderLayer, SpriteLayer } from "../renderer/renderer.js";

import { Component } from "../ecs.js";

import { Texture } from "../types.js";
import Position from "./Position.js";
import Sprite from "./Sprite.js";

export default class AnimatedSprite extends Sprite {
    dependencies = [Position];
    sourceTex: string;
    t: number;
    fps: number;
    currFrame: number;
    totalFrames: number;
    manualUpdate: boolean;

    //sprites will be drawn above objects with a lower z index than their own
    constructor(texAlias: string, lr: string, fps: number, totalFrames: number, zi: number = 0, manualUpdate: boolean = false) {
        super(texAlias+"_0", lr, zi);
        this.sourceTex = texAlias;
        this.t = 0;
        this.fps = fps;
        this.currFrame = 0;
        this.totalFrames = totalFrames;
        this.manualUpdate = manualUpdate;
    }

    updateFrame() {
        this.currFrame += 1;
        this.currFrame %= this.totalFrames;
        this.tex = this.sourceTex + "_" + this.currFrame; 
    }
}
