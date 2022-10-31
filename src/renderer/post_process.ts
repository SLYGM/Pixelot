import { createTexAndBuffer, programFromSources } from './webglutils.js';

let v_shader_source = `#version 300 es

in vec4 a_position;
in vec2 a_texcoord;

out vec2 v_texcoord;

void main() {
  // the screen coordinates are in the range [-1, 1], whereas the unit quad is in the range [0, 1]
  gl_Position = a_position * vec4(2, 2, 1, 1) - vec4(1, 1, 0, 0);
  v_texcoord = a_texcoord;
}
`;

let f_shader_source = `#version 300 es
precision highp float;

in vec2 v_texcoord;

uniform sampler2D u_texture;

out vec4 outColor;

void main() {
    outColor = texture(u_texture, v_texcoord);
}
`;

let frame_buffers: WebGLFramebuffer[];
let curr_buffer = 0;
let post_queue: PostProcess[] = [];
let textures: WebGLTexture[];
let basic_process: PostProcess;

type PostProcess = {
    program: WebGLProgram,
    draw_func: (gl: WebGL2RenderingContext) => void,
}

export function init(gl: WebGL2RenderingContext) {
    // initialize the frame buffers and textures for buffer swapping
    let {fb: fb1, tex: tex1} = createTexAndBuffer(gl);
    let {fb: fb2, tex: tex2} = createTexAndBuffer(gl);
    frame_buffers = [fb1, fb2];
    textures = [tex1, tex2];

    // create the basic post process that renders to the screen
    let basic_program = programFromSources(gl, v_shader_source, f_shader_source);
    basic_process = {
        program: basic_program,
        draw_func: (gl: WebGL2RenderingContext) => {
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
    }

    // bind the first frame buffer so that regular rendering will draw to it
    gl.bindFramebuffer(gl.FRAMEBUFFER, frame_buffers[0]);
}

export function postProcessing(gl: WebGL2RenderingContext) {
    // use each provided shader
    for (const post_process of post_queue) {
        gl.useProgram(post_process.program);
        switchBuffer();
        renderToBuffer(gl, currBuffer(), post_process);
    }
    // finally, render the result to the screen
    switchBuffer(); // need to switch buffers, as it uses the previous texture
    renderToScreen(gl);
    // bind the buffer back to a texture for scene rendering
    gl.bindFramebuffer(gl.FRAMEBUFFER, currBuffer());
}

function renderToScreen(gl: WebGL2RenderingContext) {
    gl.useProgram(basic_process.program);
    // providing null for the framebuffer will render to the screen
    renderToBuffer(gl, null, basic_process);
}

function renderToBuffer(gl: WebGL2RenderingContext, buffer: WebGLFramebuffer, post_process: PostProcess){
    gl.bindFramebuffer(gl.FRAMEBUFFER, buffer);
    //clear the buffer
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // use the previously rendered texture as the input
    gl.bindTexture(gl.TEXTURE_2D, prevTexture());
    post_process.draw_func(gl);
}

function switchBuffer(){
    curr_buffer = (curr_buffer+1) % 2;
}

function currBuffer() {
    return frame_buffers[curr_buffer];
}

function prevTexture() {
    return textures[(curr_buffer+1) % 2];
}

export function addPostProcess(post_process: PostProcess) {
    post_queue.push(post_process);
}

export function removePostProcess(post_process: PostProcess) {
    post_queue = post_queue.filter((p) => p !== post_process);
}