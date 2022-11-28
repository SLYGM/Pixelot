import { Renderer } from "../renderer/renderer.js";

import { Component } from "../ecs.js";

import { Texture } from "../types.js";
import Position from "./Position.js";

export default class Sprite extends Component {
    dependencies = [Position];
    texAlias: string;
    tex: Texture;

    constructor(texAlias: string) {
        super();
        this.texAlias = texAlias;
        this.tex = Renderer.textures.get(texAlias);
    }

    toJSONCompatible() : any[] {
        return [this.texAlias];
    }
}
