import { _gl } from "./gl.js";

export class GLUtils {
    static createShader(type: number, source: string) {
        const shader = _gl.createShader(type);
        if (!shader) {
            console.log("Failed to create shader");
            return undefined;
        }
        _gl.shaderSource(shader, source);
        _gl.compileShader(shader);
        const success = _gl.getShaderParameter(shader, _gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }

        console.log(_gl.getShaderInfoLog(shader));
        _gl.deleteShader(shader);
    }

    static createProgram(
        vertex_shader: WebGLShader,
        fragment_shader: WebGLShader
    ) {
        const program = _gl.createProgram();
        if (!program) {
            console.log("Failed to create program");
            return undefined;
        }
        _gl.attachShader(program, vertex_shader);
        _gl.attachShader(program, fragment_shader);
        _gl.linkProgram(program);
        const success = _gl.getProgramParameter(program, _gl.LINK_STATUS);
        if (success) {
            return program;
        }

        console.log(_gl.getProgramInfoLog(program));
        _gl.deleteProgram(program);
    }

    static programFromSources(
        v_shader_source: string,
        f_shader_source: string
    ) {
        const v_shader = this.createShader(_gl.VERTEX_SHADER, v_shader_source);
        const f_shader = this.createShader(
            _gl.FRAGMENT_SHADER,
            f_shader_source
        );

        if (!v_shader || !f_shader) {
            return undefined;
        }

        return this.createProgram(v_shader, f_shader);
    }

    //use 'img = await loadImage();'
    static loadImage(path: string) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = path;
        });
    }

    static createTexAndBuffer(width: number, height: number) {
        const targetTextureWidth = width;
        const targetTextureHeight = height;
        const targetTexture = _gl.createTexture();
        _gl.bindTexture(_gl.TEXTURE_2D, targetTexture);

        // define size and format of level 0
        const level = 0;
        const internalFormat = _gl.RGBA;
        const border = 0;
        const format = _gl.RGBA;
        const type = _gl.UNSIGNED_BYTE;
        const data = null;
        _gl.texImage2D(
            _gl.TEXTURE_2D,
            level,
            internalFormat,
            targetTextureWidth,
            targetTextureHeight,
            border,
            format,
            type,
            data
        );

        // set the filtering so we don't need mips
        _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.NEAREST);
        _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.NEAREST);
        _gl.texParameteri(
            _gl.TEXTURE_2D,
            _gl.TEXTURE_WRAP_S,
            _gl.CLAMP_TO_EDGE
        );
        _gl.texParameteri(
            _gl.TEXTURE_2D,
            _gl.TEXTURE_WRAP_T,
            _gl.CLAMP_TO_EDGE
        );

        // Create and bind the framebuffer
        const fb = _gl.createFramebuffer();
        _gl.bindFramebuffer(_gl.FRAMEBUFFER, fb);

        // attach the texture as the first color attachment
        const attachmentPoint = _gl.COLOR_ATTACHMENT0;
        _gl.framebufferTexture2D(
            _gl.FRAMEBUFFER,
            attachmentPoint,
            _gl.TEXTURE_2D,
            targetTexture,
            level
        );

        return { fb: fb, tex: targetTexture };
    }
}
