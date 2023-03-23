import Sprite from "../components/Sprite.js";

import { $gl, $canvas, loadGL, $rendering_offscreen, $offscreen_canvas, $canvas_bitmap_context } from "./gl.js";
import { GLUtils } from "./webglutils.js";
import { PostProcessing } from "./post_process.js";
import { Texture } from "../types.js";
import { AutoMap } from "../utils/baseutils.js";
import { Scene } from "../scene.js";
import { SceneManager } from "../sceneManager.js";

const { mat4, vec3 } = require("gl-matrix");

const nw = (window as any).nw;
let AVLTree;
if (nw) {
    AVLTree = nw.require("avl");
} else {
    AVLTree = require("avl");
}
type AVLTree = InstanceType<typeof AVLTree>;


export abstract class RenderLayer {
    abstract render(): void;
}

export class SpriteLayer extends RenderLayer {
    sprites: AVLTree;
    spriteIDs: Map<Sprite, number>;
    currentID: number;
    
    constructor() {
        super();
        this.spriteIDs = new Map<Sprite, number>();
        this.currentID = 0;
        this.sprites = new AVLTree((a: Sprite, b: Sprite) => {
            const diff = a.zindex - b.zindex
            if (diff !== 0) return diff;
            return this.spriteIDs.get(a) - this.spriteIDs.get(b);
        });
    }

    addSprite(sprite: Sprite) {
        this.spriteIDs.set(sprite, this.currentID++);
        this.sprites.insert(sprite);
    }

    removeSprite(sprite: Sprite) {
        this.sprites.remove(sprite);
    }

    render() {
        $gl.useProgram(Renderer.shader.prog);
        this.sprites.forEach((node) => {
            const sprite = node.key as Sprite;
            const pos = sprite.getPos();
            Renderer.drawImage(sprite.tex, pos.x, pos.y, sprite.rotation, sprite.anchor.x, sprite.anchor.y);
        })
    }
}

export class Renderer {
    //GLSL Vertex Shader
    private static vert_source = `#version 300 es

        in vec4 a_position;
        
        uniform mat4 u_projection;
        uniform mat4 u_matrix;
        
        out vec2 v_texcoord;
        
        void main() {
            gl_Position = u_projection * u_matrix * a_position; 
            // the texture coordinates are the same as the vertex coordinates
            v_texcoord = a_position.xy;
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
    static layerAliases: AutoMap<Scene, Map<string, number>>;
    static layers: AutoMap<Scene, RenderLayer[]>;
    static backgroundColor: [r:number, g:number, b:number, a:number];

    static init(offscreen: boolean = false) {
        loadGL(offscreen);                     
       
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

        this.layers = new AutoMap<Scene, RenderLayer[]>((key) => []);
        this.layerAliases = new AutoMap<Scene, Map<string, number>>((key) => new Map<string, number>());
        this.backgroundColor = [1, 1, 1, 1];

        PostProcessing.init();
    }

    static setResolution(x: number, y: number) {
        this.resolution = {x: x, y: y};
        // recreate the main framebuffer after changing resolution to match
        PostProcessing.initRenderBuffer();
    }

    static setBackgroundColor(r: number, g: number, b: number, a: number) {
        this.backgroundColor = [r, g, b, a];
    }

    static render() {
        // if rendering to an off-screen canvas, but there is no on-screen canvas, don't bother
        if ($rendering_offscreen && !$canvas) {
            return;
        }
        
        $gl.viewport(0, 0, this.resolution.x, this.resolution.y);
        $gl.clearColor(...this.backgroundColor);
        $gl.clear($gl.COLOR_BUFFER_BIT | $gl.DEPTH_BUFFER_BIT);

        $gl.useProgram(this.shader.prog);
        $gl.bindVertexArray(this.vao);

        const proj_matrix = mat4.create();
        // use orthographic projection to scale coords to -1->1 (calculate once per frame)
        mat4.ortho(
            proj_matrix,
            0,
            this.resolution.x * this.viewport.sx,
            this.resolution.y * this.viewport.sy,
            0,
            -1,
            1
        );
        $gl.uniformMatrix4fv(this.shader.proj_loc, false, proj_matrix);

        const scene = SceneManager.currentScene;
        if (scene) {
            this.layers.get(scene).forEach((l) => {
                l.render();
            })    
        }
        PostProcessing.apply();
        
        // if rendering offscreen, the image needs to be copied onto the on-screen canvas
        if ($rendering_offscreen) {
            const bitmap_im = $offscreen_canvas.transferToImageBitmap();
            $canvas_bitmap_context.transferFromImageBitmap(bitmap_im);
        }
    }

    //layers should be added in a bottom-up fashion i.e. the first one added will be rendered first.
    static addLayer(layer: RenderLayer, alias: string, scene: Scene = SceneManager.currentScene) {
        if (!scene)
            throw new Error("No scene to add layer to.");
        const index = this.layers.get(scene).push(layer) - 1;
        this.layerAliases.get(scene).set(alias, index);
    }

    static getLayer(alias: string, scene: Scene = SceneManager.currentScene) : RenderLayer {
        if (!scene)
            throw new Error("No scene to get layer from.");
        return this.layers.get(scene)[this.layerAliases.get(scene).get(alias)];
    }

    static removeLayer(alias: string, scene: Scene = SceneManager.currentScene) {
        if (!scene)
            throw new Error("No scene to remove layer from.");
        const layerAliases = this.layerAliases.get(scene);
        const index = layerAliases.get(alias); //get index of item to be removed
        if (!index) return;
        //update stored indexes of layers that are after this layer in the array (decrease them by 1)
        for (const [k, v] of layerAliases) {
            if (v > index) layerAliases.set(k, v - 1);
        }
        this.layers.get(scene).splice(index, 1); //remove the layer from the array at the index
        layerAliases.delete(alias);
    }

    static loadTexture(path: string): Texture {
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

        return tex_info;
    }

    static loadTextureWithAlias(path:string, alias:string) {
        const tex_info = this.loadTexture(path);
        this.textures.set(alias, tex_info);
        return tex_info;
    }

    static drawImage(alias: string, x: number, y: number, rotation: number = 0, anchorX: number = 0.5, anchorY: number = 0.5) {
        const tex = this.textures.get(alias);
        if (tex === undefined) {
            console.warn("Texture not found: " + alias);
            return;
        }
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
        //rotate around the center of the image
        mat4.translate(img_matrix, img_matrix, vec3.fromValues(anchorX, anchorY, 0));
        mat4.rotate(
            img_matrix,
            img_matrix,
            rotation,
            vec3.fromValues(0, 0, 1)
        );
        mat4.translate(img_matrix, img_matrix, vec3.fromValues(-anchorX, -anchorY, 0));
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
    }
}
