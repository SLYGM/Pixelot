function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
    let shader = gl.createShader(type);
    if (!shader) {
        console.log("Failed to create shader");
        return undefined;
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl: WebGL2RenderingContext, vertex_shader: WebGLShader, fragment_shader: WebGLShader) {
    let program = gl.createProgram();
    if (!program) {
        console.log("Failed to create program");
        return undefined;
    }
    gl.attachShader(program, vertex_shader);
    gl.attachShader(program, fragment_shader);
    gl.linkProgram(program);
    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

export type TexInfo = {
    width: number;
    height: number;
    texture: WebGLTexture | null;
}

export function programFromSources(gl: WebGL2RenderingContext, v_shader_source: string, f_shader_source: string) {
    let v_shader = createShader(gl, gl.VERTEX_SHADER, v_shader_source);
    let f_shader = createShader(gl, gl.FRAGMENT_SHADER, f_shader_source);

    if (!v_shader || !f_shader){
        return undefined;
    }

    return createProgram(gl, v_shader, f_shader);
}

export function loadTextureFromImage(gl: WebGL2RenderingContext, path: string): TexInfo{
    let tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 0, 255]));

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    //use nearest neighbour filtering for texture by default
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    let tex_info = {
        width: 1,   // we don't know the size until it loads
        height: 1,
        texture: tex,
    };

    let img = new Image();
    img.addEventListener('load', function() {
        tex_info.width = img.width;
        tex_info.height = img.height;

        gl.bindTexture(gl.TEXTURE_2D, tex_info.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    });
    img.src = path;

    return tex_info;
}

export function setupUnitQuad(gl: WebGL2RenderingContext, program: WebGLProgram) {
    let pos_attr_loc = gl.getAttribLocation(program, "a_position");
    let texcoord_attr_loc = gl.getAttribLocation(program, "a_texcoord");

    let pos_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pos_buffer);

    let positions = [
        0, 0,
        0, 1,
        1, 0,
        1, 0,
        0, 1,
        1, 1,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(pos_attr_loc);
    gl.vertexAttribPointer(pos_attr_loc, 
        2,          // size
        gl.FLOAT,   // type
        false,      // normalise
        0,          // stride
        0           // offset
    )

    let tex_coord_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tex_coord_buffer);
    let texcoords = [
        0, 0,
        0, 1,
        1, 0,
        1, 0,
        0, 1,
        1, 1,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(texcoord_attr_loc);
    gl.vertexAttribPointer(texcoord_attr_loc, 
        2,          // size
        gl.FLOAT,   // type
        false,      // normalise
        0,          // stride
        0           // offset
    );
}

export function createTexAndBuffer(gl: WebGL2RenderingContext) {
    const targetTextureWidth = gl.canvas.width;
    const targetTextureHeight = gl.canvas.height;
    let targetTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, targetTexture);
    
    // define size and format of level 0
    const level = 0;
    const internalFormat = gl.RGBA;
    const border = 0;
    const format = gl.RGBA;
    const type = gl.UNSIGNED_BYTE;
    const data = null;
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                    targetTextureWidth, targetTextureHeight, border,
                    format, type, data);
    
    // set the filtering so we don't need mips
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // Create and bind the framebuffer
    let fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    
    // attach the texture as the first color attachment
    const attachmentPoint = gl.COLOR_ATTACHMENT0;
    gl.framebufferTexture2D(gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, targetTexture, level);

    return {fb: fb, tex: targetTexture};
}