import { $gl } from "./gl.js";

export class GLUtils {
    static createShader(type: number, source: string) {
        const shader = $gl.createShader(type);
        if (!shader) {
            console.log("Failed to create shader");
            return undefined;
        }
        $gl.shaderSource(shader, source);
        $gl.compileShader(shader);
        const success = $gl.getShaderParameter(shader, $gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }

        console.log($gl.getShaderInfoLog(shader));
        $gl.deleteShader(shader);
        return undefined;
    }

    static createProgram(
        vertex_shader: WebGLShader,
        fragment_shader: WebGLShader
    ) {
        const program = $gl.createProgram();
        if (!program) {
            console.log("Failed to create program");
            return undefined;
        }
        $gl.attachShader(program, vertex_shader);
        $gl.attachShader(program, fragment_shader);
        $gl.linkProgram(program);
        const success = $gl.getProgramParameter(program, $gl.LINK_STATUS);
        if (success) {
            return program;
        }

        console.log($gl.getProgramInfoLog(program));
        $gl.deleteProgram(program);
        return undefined;
    }

    static programFromSources(
        v_shader_source: string,
        f_shader_source: string
    ) {
        const v_shader = this.createShader($gl.VERTEX_SHADER, v_shader_source);
        const f_shader = this.createShader(
            $gl.FRAGMENT_SHADER,
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
        const targetTexture = $gl.createTexture();
        $gl.bindTexture($gl.TEXTURE_2D, targetTexture);

        // define size and format of level 0
        const level = 0;
        const internalFormat = $gl.RGBA;
        const border = 0;
        const format = $gl.RGBA;
        const type = $gl.UNSIGNED_BYTE;
        const data = null;
        $gl.texImage2D(
            $gl.TEXTURE_2D,
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
        $gl.texParameteri($gl.TEXTURE_2D, $gl.TEXTURE_MIN_FILTER, $gl.NEAREST);
        $gl.texParameteri($gl.TEXTURE_2D, $gl.TEXTURE_MAG_FILTER, $gl.NEAREST);
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

        // Create and bind the framebuffer
        const fb = $gl.createFramebuffer();
        $gl.bindFramebuffer($gl.FRAMEBUFFER, fb);

        // attach the texture as the first color attachment
        const attachmentPoint = $gl.COLOR_ATTACHMENT0;
        $gl.framebufferTexture2D(
            $gl.FRAMEBUFFER,
            attachmentPoint,
            $gl.TEXTURE_2D,
            targetTexture,
            level
        );

        return { fb: fb, tex: targetTexture };
    }
}
