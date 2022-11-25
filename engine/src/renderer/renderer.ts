import Sprite from "../components/Sprite.js";

import { $gl } from "./gl.js";
import { GLUtils } from "./webglutils.js";
import { PostProcessing } from "./post_process.js";
import { Texture, Updatable } from "../types.js";
import { GameObjectBase, System } from "../ecs.js";
import Position from "../components/Position.js";

const { glMatrix, mat4, vec3 } = require("gl-matrix");
const AVLTree = require('avl');
type AVLTree = InstanceType<typeof AVLTree>;


export abstract class RenderLayer {
    abstract render(): void;
}

export class SpriteLayer extends RenderLayer {
    sprites: AVLTree;
    
    constructor() {
        super();
        this.sprites = new AVLTree((a: Sprite, b: Sprite) => {
            const diff = a.zindex - b.zindex
            if (diff !== 0) return diff;
            if (a === b) return 0; else return -1;
        });
    }

    addSprite(sprite: Sprite) {
        this.sprites.insert(sprite);
    }

    removeSprite(n: Sprite) {
        this.sprites.remove(n);
    }

    render() {
        this.sprites.forEach((node) => {
            const sprite = node.key;
            const pos = sprite.getPos();
            Renderer.drawImage(sprite.tex, pos.x, pos.y);
        })
    }
}

export class Renderer {
    //GLSL Vertex Shader
    private static vert_source = `#version 300 es

        in vec4 a_position;
        in vec2 a_texcoord;
        
        uniform mat4 u_projection;
        uniform mat4 u_matrix;
        
        out vec2 v_texcoord;
        
        void main() {
            gl_Position = u_projection * u_matrix * a_position;
            v_texcoord = a_texcoord;
        }
    `;
    //GLSL Fragment Shader
    private static frag_source = `#version 300 es
        precision highp float;
        
        in vec2 v_texcoord;
        
        uniform sampler2D u_texture;
        
        out vec4 outColor;
        
        void main() {
            outColor = texture(u_texture, v_texcoord);
        }
    `;

    static shader: {
        prog: WebGLProgram;
        proj_loc: WebGLUniformLocation;
        mat_loc: WebGLUniformLocation;
        tex_loc: WebGLUniformLocation;
    };
    static resolution: {
        x: number;
        y: number;
    };
    static viewport: {
        x: number;
        y: number;
        sx: number;
        sy: number;
    };
    static vao: WebGLVertexArrayObject;
    static time: number;
    static textures: Map<string, Texture>;
    static layerAliases: Map<string, number>;
    static layers: RenderLayer[];

    static {
        this.shader = {
            prog: undefined,
            proj_loc: undefined,
            mat_loc: undefined,
            tex_loc: undefined,
        };
        this.shader.prog = GLUtils.programFromSources(
            this.vert_source,
            this.frag_source
        );
        if (!this.shader.prog) {
            console.log("Failed to create shader program");
        }
        this.shader.proj_loc = $gl.getUniformLocation(
            this.shader.prog,
            "u_projection"
        );
        this.shader.mat_loc = $gl.getUniformLocation(
            this.shader.prog,
            "u_matrix"
        );
        this.shader.tex_loc = $gl.getUniformLocation(
            this.shader.prog,
            "u_texture"
        );

        this.vao = $gl.createVertexArray();
        $gl.bindVertexArray(this.vao);

        this.createUnitQuad();

        this.time = 0;

        this.viewport = { x: 0, y: 0, sx: 1.0, sy: 1.0 };

        this.textures = new Map<string, Texture>();

        this.layers = [];
        this.layerAliases = new Map<string, number>();
    }

    static setResolution(x: number, y: number) {
        this.resolution = {x: x, y: y};
        $gl.canvas.width = x;
        $gl.canvas.height = y;
        // recreate the main framebuffer after changing resolution
        PostProcessing.createMainFrameBuffer();
    }

    static render() {
        $gl.viewport(0, 0, Renderer.resolution.x, Renderer.resolution.y);
        $gl.clearColor(1, 1, 1, 1);
        $gl.clear($gl.COLOR_BUFFER_BIT | $gl.DEPTH_BUFFER_BIT);

        $gl.useProgram(Renderer.shader.prog);
        $gl.bindVertexArray(Renderer.vao);

        const proj_matrix = mat4.create();
        // use orthographic projection to scale coords to -1->1 (calculate once per frame)
        mat4.ortho(
            proj_matrix,
            0,
            Renderer.resolution.x * Renderer.viewport.sx,
            Renderer.resolution.y * Renderer.viewport.sy,
            0,
            -1,
            1
        );
        $gl.uniformMatrix4fv(Renderer.shader.proj_loc, false, proj_matrix);

        this.layers.forEach((l) => {
            l.render();
        })
        PostProcessing.apply();
    }

    //layers should be added in a bottom-up fashion i.e. the first one added will be rendered first.
    static addLayer(layer: RenderLayer, alias: string) {
        const index = this.layers.push(layer) - 1;
        this.layerAliases.set(alias, index);
    }

    static getLayer(alias: string) {
        return this.layers[this.layerAliases.get(alias)];
    }

    static removeLayer(alias: string) {
        const index = this.layerAliases.get(alias); //get index of item to be removed
        if (!index) return;
        //update stored indexes of layers that are after this layer in the array (decrease them by 1)
        for (const [k, v] of this.layerAliases) {
            if (v > index) this.layerAliases.set(k, v - 1);
        }
        this.layers.splice(index, 1); //remove the layer from the array at the index
        this.layerAliases.delete(alias);
    }

    static loadTexture(path: string, alias: string): string {
        const tex = $gl.createTexture();
        $gl.bindTexture($gl.TEXTURE_2D, tex);
        $gl.texImage2D(
            $gl.TEXTURE_2D,
            0,
            $gl.RGBA,
            1,
            1,
            0,
            $gl.RGBA,
            $gl.UNSIGNED_BYTE,
            new Uint8Array([0, 0, 0, 255])
        );

        $gl.texParameteri(
            $gl.TEXTURE_2D,
            $gl.TEXTURE_WRAP_S,
            $gl.CLAMP_TO_EDGE
        );
        $gl.texParameteri(
            $gl.TEXTURE_2D,
            $gl.TEXTURE_WRAP_T,
            $gl.CLAMP_TO_EDGE
        );
        //use nearest neighbour filtering for texture by default
        $gl.texParameteri($gl.TEXTURE_2D, $gl.TEXTURE_MIN_FILTER, $gl.NEAREST);
        $gl.texParameteri($gl.TEXTURE_2D, $gl.TEXTURE_MAG_FILTER, $gl.NEAREST);

        const tex_info = {
            width: 1, // we don't know the size until it loads
            height: 1,
            texture: tex,
        };

        GLUtils.loadImage(path).then((img: HTMLImageElement) => {
            tex_info.width = img.width;
            tex_info.height = img.height;

            $gl.bindTexture($gl.TEXTURE_2D, tex_info.texture);
            $gl.texImage2D(
                $gl.TEXTURE_2D,
                0,
                $gl.RGBA,
                $gl.RGBA,
                $gl.UNSIGNED_BYTE,
                img
            );
        });

        this.textures.set(alias, tex_info);
        return alias;
    }

    static drawImage(alias: string, x: number, y: number) {
        const tex = this.textures.get(alias);
        if (tex === undefined) return;
        const textureUnit = 0;
        $gl.uniform1i(this.shader.tex_loc, textureUnit);
        $gl.activeTexture($gl.TEXTURE0 + textureUnit);
        $gl.bindTexture($gl.TEXTURE_2D, tex.texture);

        const img_matrix = mat4.create();
        mat4.translate(img_matrix, img_matrix, vec3.fromValues(x, y, 0));
        mat4.translate(
            img_matrix,
            img_matrix,
            vec3.fromValues(-this.viewport.x, -this.viewport.y, 0)
        );
        mat4.scale(
            img_matrix,
            img_matrix,
            vec3.fromValues(tex.width, tex.height, 1)
        );
        $gl.uniformMatrix4fv(this.shader.mat_loc, false, img_matrix);

        const offset = 0;
        const count = 6;
        $gl.drawArrays($gl.TRIANGLES, offset, count);
    }

    static createUnitQuad() {
        const pos_attr_loc = $gl.getAttribLocation(
            this.shader.prog,
            "a_position"
        );
        const texcoord_attr_loc = $gl.getAttribLocation(
            this.shader.prog,
            "a_texcoord"
        );

        const pos_buffer = $gl.createBuffer();
        $gl.bindBuffer($gl.ARRAY_BUFFER, pos_buffer);

        const positions = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1];
        $gl.bufferData(
            $gl.ARRAY_BUFFER,
            new Float32Array(positions),
            $gl.STATIC_DRAW
        );
        $gl.enableVertexAttribArray(pos_attr_loc);
        $gl.vertexAttribPointer(
            pos_attr_loc,
            2, // size
            $gl.FLOAT, // type
            false, // normalise
            0, // stride
            0 // offset
        );

        const tex_coord_buffer = $gl.createBuffer();
        $gl.bindBuffer($gl.ARRAY_BUFFER, tex_coord_buffer);
        const texcoords = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1];
        $gl.bufferData(
            $gl.ARRAY_BUFFER,
            new Float32Array(texcoords),
            $gl.STATIC_DRAW
        );
        $gl.enableVertexAttribArray(texcoord_attr_loc);
        $gl.vertexAttribPointer(
            texcoord_attr_loc,
            2, // size
            $gl.FLOAT, // type
            false, // normalise
            0, // stride
            0 // offset
        );
    }
}