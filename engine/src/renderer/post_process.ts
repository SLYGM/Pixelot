import { $gl, $canvas } from './gl.js';
import { Renderer } from './renderer.js';
import { GLUtils } from './webglutils.js'

export class PostProcess {
    program: WebGLProgram;

    constructor(v_shader: string, f_shader: string) {
        this.program = GLUtils.programFromSources(v_shader, f_shader);
    }

    draw() {
        $gl.drawArrays($gl.TRIANGLES, 0, 6);
    }
}

export class PostProcessing {
    static frame_buffers: WebGLFramebuffer[];
    static curr_buffer = 0;
    static post_queue: PostProcess[] = [];
    static textures: WebGLTexture[];
    static render_tex: WebGLTexture;
    static render_buff: WebGLFramebuffer;
    static basic_process: PostProcess;

    static init() {
        this.initPingPongBuffers();

        // create the basic post process that renders to the screen
        const v_shader_source = `#version 300 es
    
        in vec4 a_position;
        in vec2 a_texcoord;
    
        out vec2 v_texcoord;
    
        void main() {
            // the screen coordinates are in the range [-1, 1], whereas the unit quad is in the range [0, 1]
            gl_Position = a_position * vec4(2, 2, 1, 1) - vec4(1, 1, 0, 0);
            v_texcoord = a_texcoord;
        }
        `;

        const f_shader_source = `#version 300 es
        precision highp float;
    
        in vec2 v_texcoord;
    
        uniform sampler2D u_texture;
    
        out vec4 outColor;
    
        void main() {
            outColor = texture(u_texture, v_texcoord);
        }
        `;
        this.basic_process = new PostProcess(v_shader_source, f_shader_source);
    }
    
    static initPingPongBuffers() {
        // initialize the frame buffers and textures for buffer swapping - these are the same size as the screen
        const { fb: fb1, tex: tex1 } = GLUtils.createTexAndBuffer(
            $canvas.width,
            $canvas.height
        );
        const { fb: fb2, tex: tex2 } = GLUtils.createTexAndBuffer(
            $canvas.width,
            $canvas.height
        );
        this.frame_buffers = [fb1, fb2];
        this.textures = [tex1, tex2];
    }

    static initRenderBuffer() {
        // create the texture and buffer which the scene will be rendered to
        ({ fb: this.render_buff, tex: this.render_tex } =
            GLUtils.createTexAndBuffer(Renderer.resolution.x, Renderer.resolution.y));

        // bind the render buffer so that scene rendering will draw to it
        $gl.bindFramebuffer($gl.FRAMEBUFFER, this.render_buff);
    }

    static apply() {
        //before applying shaders, scale the rendered scene to screen resolution
        $gl.viewport(0, 0, $canvas.width, $canvas.height);
        this.#upscaleScene();
        
        // change the WebGL viewport to be the screen size

        // use each provided shader
        for (const post_process of this.post_queue) {
            $gl.useProgram(post_process.program);
            this.#switchBuffer();
            this.#renderToBuffer(this.#currBuffer(), post_process);
        }

        // finally, render the result to the screen
        this.#switchBuffer(); // need to switch buffers, as it uses the previous texture
        this.#renderToScreen();
        // switch back to the render buffer for scene rendering
        $gl.bindFramebuffer($gl.FRAMEBUFFER, this.render_buff);
    }

    static #upscaleScene() {
        // use the render buffer and texture
        $gl.bindFramebuffer($gl.FRAMEBUFFER, this.#currBuffer());
        $gl.bindTexture($gl.TEXTURE_2D, this.render_tex);

        // use the basic program
        $gl.useProgram(this.basic_process.program);

        // clear the buffer before drawing
        $gl.clearColor(1, 1, 1, 1);
        $gl.clear($gl.COLOR_BUFFER_BIT | $gl.DEPTH_BUFFER_BIT);

        this.basic_process.draw();
    }

    static #renderToScreen() {
        $gl.useProgram(this.basic_process.program);
        // providing null for the framebuffer will render to the screen
        this.#renderToBuffer(null, this.basic_process);
    }

    static #renderToBuffer(
        buffer: WebGLFramebuffer,
        post_process: PostProcess
    ) {
        $gl.bindFramebuffer($gl.FRAMEBUFFER, buffer);
        //clear the buffer
        $gl.clearColor(1, 1, 1, 1);
        $gl.clear($gl.COLOR_BUFFER_BIT | $gl.DEPTH_BUFFER_BIT);
        // use the previously rendered texture as the input
        $gl.bindTexture($gl.TEXTURE_2D, this.#prevTexture());
        post_process.draw();
    }

    static #switchBuffer() {
        this.curr_buffer = (this.curr_buffer + 1) % 2;
    }

    static #currBuffer() {
        return this.frame_buffers[this.curr_buffer];
    }

    static #prevTexture() {
        return this.textures[(this.curr_buffer + 1) % 2];
    }

    static add(post_process: PostProcess) {
        this.post_queue.push(post_process);
    }

    static remove(post_process: PostProcess) {
        this.post_queue = this.post_queue.filter((p) => p !== post_process);
    }
}
