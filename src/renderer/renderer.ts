import { programFromSources, loadTextureFromImage, setupUnitQuad, TexInfo, createTexAndBuffer } from './webglutils.js';
const { glMatrix, mat4, vec3 } = require('gl-matrix');

export let viewport = {
    x: 0,
    y: 0,
    height: 600,
    width: 450,
}

let v_shader_source = `#version 300 es

in vec4 a_position;
in vec2 a_texcoord;

uniform mat4 u_matrix;

out vec2 v_texcoord;

void main() {
  gl_Position = u_matrix * a_position;
  v_texcoord = a_texcoord;
}
`;

let f_shader_source = `#version 300 es
precision highp float;

in vec2 v_texcoord;

uniform sampler2D u_texture;

out vec4 outColor;

void main() {
   outColor = texture(u_texture, v_texcoord) * vec4(1.0, 0.95, 0.95, 1.0);
}
`;
glMatrix.setMatrixArrayType(Array);


type Sprite = {
    x: number;
    y: number;
    tex: TexInfo;
}

type Updatable = {
    update: (dt: number) => void;
}

let sprites: Sprite[] = [];
let update_queue: Updatable[] = [];

export function createSprite(x: number, y: number, image_path: string): Sprite {
    let tex = loadTextureFromImage(gl, image_path);
    let sprite = {
        x: x,
        y: y,
        tex: tex
    };
    sprites.push(sprite);
    return sprite;
}

export function addToUpdateQueue(object: Updatable) {
    update_queue.push(object);
}


function log(message: string) {
    console.log(message);
    return undefined;
}

let gl: WebGL2RenderingContext;
let program: WebGLProgram;
let mat_loc: WebGLUniformLocation;
let tex_loc: WebGLUniformLocation;
let vao: WebGLVertexArrayObject;

let frame_buffers: WebGLFramebuffer[];
let curr_buffer = 0;
let post_queue: WebGLProgram[] = [];
let textures: WebGLTexture[];
let basic_program: WebGLProgram;



let rendering = false;

function init() {
    let canvas = <HTMLCanvasElement>document.getElementById("canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) {
        return log("Failed to get webgl2 context");
    }

    let prog = programFromSources(gl, v_shader_source, f_shader_source);
    for (let i = 0; i < 2; i++) {
        post_queue.push(prog);
    }
    basic_program = prog

    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);

    program = programFromSources(gl, v_shader_source, f_shader_source);
    if (!program) {
        return log("Failed to create program");
    }
    program = basic_program;
    
    mat_loc = gl.getUniformLocation(program, "u_matrix");
    tex_loc = gl.getUniformLocation(program, "u_texture");
    
    vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    
    setupUnitQuad(gl, program);

    let {fb: fb1, tex: tex1} = createTexAndBuffer(gl);
    let {fb: fb2, tex: tex2} = createTexAndBuffer(gl);
    frame_buffers = [fb1, fb2];
    textures = [tex1, tex2];

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}




function update(dt: number) {
    update_queue.forEach(function(object){
        object.update(dt);
    });
}

function draw() {
    gl.bindFramebuffer(gl.FRAMEBUFFER, frame_buffers[curr_buffer]);
    curr_buffer = (curr_buffer+1) % 2;
    
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    sprites.forEach(function(sprite){
        drawImage(
            sprite.tex.texture,
            sprite.tex.width,
            sprite.tex.height,
            sprite.x,
            sprite.y
        );
    })

    post_processing();
}

function post_processing() {
    for (const prog of post_queue) {
        gl.useProgram(prog);
        render_to_buffer(frame_buffers[curr_buffer]);
        curr_buffer = (curr_buffer+1) % 2;
    }
    render_to_screen();
}

function render_to_screen() {
    gl.useProgram(basic_program);
    gl.bindTexture(gl.TEXTURE_2D, textures[curr_buffer]);
    render_to_buffer(null);
}

function render_to_buffer(buffer: WebGLFramebuffer | null){
    gl.bindFramebuffer(gl.FRAMEBUFFER, buffer);
    gl.bindTexture(gl.TEXTURE_2D, textures[(curr_buffer + 1)%2]);
    let matrix = mat4.create();
    mat4.ortho(matrix, 0, 1, 0, 1, -1, 1);
    gl.uniformMatrix4fv(mat_loc, false, matrix);
    let offset = 0;
    let count = 6;
    gl.drawArrays(gl.TRIANGLES, offset, count);
}

let then = 0;
function render(time: number) {
    let now = time * 0.001;
    let dt = Math.min(0.1, now - then);
    then = now;

    update(dt);
    draw();

    if (rendering){
        requestAnimationFrame(render);
    }
}



function drawImage(tex: WebGLTexture, texWidth: number, texHeight: number, dstX: number, dstY: number) {
    gl.useProgram(basic_program);

    gl.bindVertexArray(vao);

    let textureUnit = 0;
    gl.uniform1i(tex_loc, textureUnit);

    gl.activeTexture(gl.TEXTURE0 + textureUnit);
    gl.bindTexture(gl.TEXTURE_2D, tex);

    let matrix = mat4.create();
    
    // use orthographic projection to scale coords to -1->1
    mat4.ortho(matrix, 0, viewport.width, 0, viewport.height, -1, 1);
    
    mat4.translate(matrix, matrix, vec3.fromValues(dstX, dstY, 0));
    mat4.translate(matrix, matrix, vec3.fromValues(-viewport.x, -viewport.y, 0));
    mat4.scale(matrix, matrix, vec3.fromValues(texWidth, texHeight, 1));

    gl.uniformMatrix4fv(mat_loc, false, matrix);

    let offset = 0;
    let count = 6;
    gl.drawArrays(gl.TRIANGLES, offset, count);
}


export function begin_rendering() {
    rendering = true;
    requestAnimationFrame(render);
}

export function stop_rendering() {
    rendering = false;
}

init();