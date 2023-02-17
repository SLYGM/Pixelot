import { GLUtils } from "./webglutils";
import { $gl } from "./gl";
import { Texture } from "../types";
import { Renderer } from "./renderer";

const { mat4, vec3 } = require("gl-matrix");

const vert_source = `#version 300 es

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

const frag_source = `#version 300 es
precision highp float;

in vec2 v_texcoord;

uniform sampler2D u_texture;

out vec4 outColor;

void main() {
    outColor = texture(u_texture, v_texcoord);
}
`;


let initialised = false;
let prog: WebGLProgram;
let texcoord_loc: number;
let tex_loc: WebGLUniformLocation;
let mat_loc: WebGLUniformLocation;
let proj_loc: WebGLUniformLocation;
let texcoord_buffer: WebGLBuffer;


function initTilemapRendering() {
    if (initialised) {
        return;
    }
    // setup rendering program
    prog = GLUtils.programFromSources(vert_source, frag_source);
    texcoord_loc = $gl.getAttribLocation(prog, "a_texcoord");
    tex_loc = $gl.getUniformLocation(prog, "u_texture");
    mat_loc = $gl.getUniformLocation(prog, "u_matrix");
    proj_loc = $gl.getUniformLocation(prog, "u_projection");
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
    $gl.useProgram(prog);
    $gl.uniformMatrix4fv(proj_loc, false, proj_matrix);

    // setup texture coord buffer
    texcoord_buffer = $gl.createBuffer();
    $gl.bindBuffer($gl.ARRAY_BUFFER, texcoord_buffer);
    $gl.enableVertexAttribArray(texcoord_loc);
    $gl.vertexAttribPointer(
        texcoord_loc,
        2,           // size
        $gl.FLOAT,   // type
        false,       // normalise
        0,           // stride
        0            // offset
    );

    
    initialised = true;
}



export class TileMap {
    pos = { x: 0, y: 0 };
    data: number[][];
    width: number;
    height: number;
    tileWidth: number;
    tileHeight: number;
    tileset: Texture;

    constructor(img_path: string, pos = { x: 0, y: 0 }) {
        initTilemapRendering();
        // TODO: load tilemap data from file
        this.data = [
            [1, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24],
            [24, 16, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 17, 24],
            [24, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 24],
            [24, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 24],
            [24, 25, 0, 0, 0, 7, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 24],
            [24, 25, 0, 0, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 24],
            [24, 25, 0, 0, 7, 7, 7, 7, 7, 0, 0, 0, 0, 27, 0, 0, 7, 7, 7, 0, 0, 27, 0, 0, 0, 0, 0, 0, 23, 24],
            [24, 25, 0, 0, 0, 7, 7, 7, 0, 0, 0, 0, 0, 4, 0, 0, 7, 0, 7, 0, 0, 4, 0, 0, 0, 0, 0, 0, 23, 24],
            [24, 25, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 4, 0, 0, 7, 0, 7, 0, 0, 4, 0, 0, 0, 0, 0, 0, 23, 24],
            [24, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 7, 0, 7, 0, 0, 4, 0, 0, 0, 0, 0, 0, 23, 24],
            [24, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 26, 0, 0, 7, 7, 7, 0, 0, 26, 0, 0, 0, 0, 0, 0, 23, 24],
            [24, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 24],
            [24, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 24],
            [24, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 24],
            [24, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 24],
            [24, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 24],
            [24, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 24],
            [24, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 24],
            [24, 21, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 22, 24],
            [24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24]]
        this.width = this.data[0].length;
        this.height = this.data.length;
        this.tileHeight = 16;
        this.tileWidth = 16;
        this.pos = pos;

        // load the tileset
        this.tileset = Renderer.loadTexture(img_path);
    }

    render() {
        $gl.useProgram(prog);

        // set the texture to be the tileset
        const textureUnit = 0;
        $gl.uniform1i(tex_loc, textureUnit);
        $gl.activeTexture($gl.TEXTURE0 + textureUnit);
        $gl.bindTexture($gl.TEXTURE_2D, this.tileset.texture);
        $gl.bindBuffer($gl.ARRAY_BUFFER, texcoord_buffer);

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                // subtract one from the tile id because the tile id of 0 means no tile
                let tile = this.data[y][x] - 1;
                if (tile < 0) continue;

                // get the tile's position in the tileset
                let tileX = tile % (this.tileset.width / this.tileWidth);
                let tileY = Math.floor(tile / (this.tileset.width / this.tileWidth));

                // get the uv coordinates of the tile
                let u1 = tileX * this.tileWidth / this.tileset.width;
                let v1 = tileY * this.tileHeight / this.tileset.height;
                let u2 = u1 + this.tileWidth / this.tileset.width;
                let v2 = v1 + this.tileHeight / this.tileset.height;

                // send the tile's uv coordinates to the shader
                const tex_coords = [
                    u1, v1,
                    u2, v1,
                    u1, v2,
                    u2, v1,
                    u2, v2,
                    u1, v2
                ];
                $gl.bufferData($gl.ARRAY_BUFFER, new Float32Array(tex_coords), $gl.STATIC_DRAW);
                
                // set the tile's transform
                const x_pos = this.pos.x + x * this.tileWidth;
                const y_pos = this.pos.y + y * this.tileHeight;
                const img_matrix = mat4.create();
                mat4.translate(img_matrix, img_matrix, vec3.fromValues(x_pos, y_pos, 0));
                mat4.translate(
                    img_matrix,
                    img_matrix,
                    vec3.fromValues(-Renderer.viewport.x, -Renderer.viewport.y, 0)
                );
                mat4.scale(
                    img_matrix,
                    img_matrix,
                    vec3.fromValues(this.tileWidth, this.tileHeight, 1)
                );
                $gl.uniformMatrix4fv(mat_loc, false, img_matrix);

                // draw the tile
                $gl.drawArrays($gl.TRIANGLES, 0, 6);
            }
        }
    }

    setTile(x: number, y: number, tile: number) {
        this.data[y][x] = tile;
    }
}