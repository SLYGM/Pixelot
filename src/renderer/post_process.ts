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
let render_tex: WebGLTexture;
let render_buff: WebGLFramebuffer;
let basic_process: PostProcess;

export type PostProcess = {
    program: WebGLProgram,
    draw_func: (gl: WebGL2RenderingContext) => void,
}

export function init(gl: WebGL2RenderingContext, canvas: HTMLCanvasElement) {
    // initialize the frame buffers and textures for buffer swapping - these are the same size as the screen
    let {fb: fb1, tex: tex1} = createTexAndBuffer(gl, canvas.clientWidth, canvas.clientHeight);
    let {fb: fb2, tex: tex2} = createTexAndBuffer(gl, canvas.clientWidth, canvas.clientHeight);
    frame_buffers = [fb1, fb2];
    textures = [tex1, tex2];

    // create the texture and buffer which the scene will be rendered to
    ({fb: render_buff, tex: render_tex} = createTexAndBuffer(gl, gl.canvas.width, gl.canvas.height));

    // create the basic post process that renders to the screen
    let basic_program = programFromSources(gl, v_shader_source, f_shader_source);
    basic_process = {
        program: basic_program,
        draw_func: (gl: WebGL2RenderingContext) => {
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
    }

    // bind the render buffer so that scene rendering will draw to it
    gl.bindFramebuffer(gl.FRAMEBUFFER, render_buff);
}

export function postProcessing(gl: WebGL2RenderingContext, canvas: HTMLCanvasElement) {
    //before applying shaders, scale the rendered scene to screen resolution
    upscaleScene(gl, canvas);
    
    // change the WebGL viwport to be the screen size
    gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);

    // use each provided shader
    for (const post_process of post_queue) {
        gl.useProgram(post_process.program);
        switchBuffer();
        renderToBuffer(gl, currBuffer(), post_process);
    }
    
    // finally, render the result to the screen
    switchBuffer(); // need to switch buffers, as it uses the previous texture
    renderToScreen(gl);
    // switch back to the render buffer for scene rendering
    gl.bindFramebuffer(gl.FRAMEBUFFER, render_buff);
}

function upscaleScene(gl: WebGL2RenderingContext, canvas: HTMLCanvasElement) {
    // use the render buffer and texture
    gl.bindFramebuffer(gl.FRAMEBUFFER, currBuffer());
    gl.bindTexture(gl.TEXTURE_2D, render_tex);

    // use the basic program
    gl.useProgram(basic_process.program);

    // clear the buffer before drawing
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    basic_process.draw_func(gl);
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