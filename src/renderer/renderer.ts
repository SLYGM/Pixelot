const { glMatrix, mat4, vec3 } = require('gl-matrix');

class Renderer {
    //GLSL Vertex Shader
    private vert_source: string = `#version 300 es

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
    private frag_source: string = `#version 300 es
        precision highp float;
        
        in vec2 v_texcoord;
        
        uniform sampler2D u_texture;
        
        out vec4 outColor;
        
        void main() {
            outColor = texture(u_texture, v_texcoord);
        }
    `;

    private rendering: boolean;
    
    shader: {
        prog: WebGLProgram;
        proj_loc: WebGLUniformLocation;
        mat_loc: WebGLUniformLocation;
        tex_loc: WebGLUniformLocation;
    }
    resolution: {
        x: number;
        y: number;
    }
    viewport: {
        x: number;
        y: number;
        sx: number;
        sy: number;
    }
    private vao: WebGLVertexArrayObject;
    time: number;
    textures: Map<string, Texture>;
    sprites: Sprite[];
    updateQueue: Updatable[];

    constructor() {
        this.resolution = {x: 426, y: 240};
        this.rendering = false;

        this.shader = {prog: undefined, proj_loc: undefined, mat_loc: undefined, tex_loc: undefined}
        this.shader.prog = GLUtils.programFromSources(this.vert_source, this.frag_source);
        if (!this.shader.prog) {
            console.log("Failed to create shader program");
            return undefined;
        }
        this.shader.proj_loc = _gl.getUniformLocation(this.shader.prog, "u_projection");
        this.shader.mat_loc = _gl.getUniformLocation(this.shader.prog, "u_matrix");
        this.shader.tex_loc = _gl.getUniformLocation(this.shader.prog, "u_texture");
        
        this.vao = _gl.createVertexArray();
        _gl.bindVertexArray(this.vao);

        this.createUnitQuad();

        this.time = 0;

        this.viewport = {x: 0, y: 0, sx: 1.0, sy: 1.0}

        this.textures = new Map<string, Texture>();
        this.sprites = new Array<Sprite>();
        this.updateQueue = new Array<Updatable>();
    }

    start() {
        this.rendering = true;
        requestAnimationFrame(this.render.bind(this));
    }

    stop() {
        this.rendering = false;
    }

    loadTexture(path: string, alias: string): string {
        let tex = _gl.createTexture();
        _gl.bindTexture(_gl.TEXTURE_2D, tex);
        _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA, 1, 1, 0, _gl.RGBA, _gl.UNSIGNED_BYTE,
            new Uint8Array([0, 0, 0, 255]));

        _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE);
        _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE);
        //use nearest neighbour filtering for texture by default
        _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.NEAREST);
        _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.NEAREST);

        const tex_info = {
            width: 1,   // we don't know the size until it loads
            height: 1,
            texture: tex,
        };

        GLUtils.loadImage(path).then((img: HTMLImageElement) => {
            tex_info.width = img.width;
            tex_info.height = img.height;

            _gl.bindTexture(_gl.TEXTURE_2D, tex_info.texture);
            _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA, _gl.RGBA, _gl.UNSIGNED_BYTE, img);
        });

        this.textures.set(alias, tex_info);
        return alias;
    }

    createSprite(x:number, y:number, texAlias: string): Sprite {
        console.log(this.textures.get(texAlias))
        const sprite = {
            x: x,
            y: y,
            tex: this.textures.get(texAlias)
        }
        this.sprites.push(sprite);
        return sprite;
    }

    addToUpdateQueue(object: Updatable) {
        this.updateQueue.push(object);
    }

    private render(t: number) {
        const now = t * 0.001;
        const dt = Math.min(0.1, now - this.time);
        this.time = now;

        this.updateQueue.forEach((obj) => { obj.update(dt); });
        this.draw();

        if (this.rendering) {
            requestAnimationFrame(this.render.bind(this));
        }
    }

    private draw() {
        _gl.viewport(0, 0, this.resolution.x, this.resolution.y);
        _gl.clearColor(1, 1, 1, 1);
        _gl.clear(_gl.COLOR_BUFFER_BIT | _gl.DEPTH_BUFFER_BIT);

        _gl.useProgram(this.shader.prog);
        _gl.bindVertexArray(this.vao);

        // use orthographic projection to scale coords to -1->1 (calculate once per frame)
        const proj_matrix = mat4.create();
        mat4.ortho(proj_matrix, 0, this.resolution.x * this.viewport.sx, this.resolution.y * this.viewport.sy, 0, -1, 1);
        _gl.uniformMatrix4fv(this.shader.proj_loc, false, proj_matrix);

        this.sprites.forEach((sprite) => {
            this.drawImage(sprite.tex, sprite.x, sprite.y);
        })

        PostProcessing.apply();
    }

    private drawImage(tex: Texture, x: number, y: number) {
        let textureUnit = 0;
        _gl.uniform1i(this.shader.tex_loc, textureUnit);
        _gl.activeTexture(_gl.TEXTURE0 + textureUnit);
        _gl.bindTexture(_gl.TEXTURE_2D, tex.texture);

        const img_matrix = mat4.create();
        mat4.translate(img_matrix, img_matrix, vec3.fromValues(x, y, 0));
        mat4.translate(img_matrix, img_matrix, vec3.fromValues(-this.viewport.x, -this.viewport.y, 0));
        mat4.scale(img_matrix, img_matrix, vec3.fromValues(tex.width, tex.height, 1));
        _gl.uniformMatrix4fv(this.shader.mat_loc, false, img_matrix);

        const offset = 0;
        const count = 6;
        _gl.drawArrays(_gl.TRIANGLES, offset, count);
    }

    private createUnitQuad() {
        const pos_attr_loc = _gl.getAttribLocation(this.shader.prog, "a_position");
        const texcoord_attr_loc = _gl.getAttribLocation(this.shader.prog, "a_texcoord");
    
        const pos_buffer = _gl.createBuffer();
        _gl.bindBuffer(_gl.ARRAY_BUFFER, pos_buffer);
    
        const positions = [
            0, 0,
            0, 1,
            1, 0,
            1, 0,
            0, 1,
            1, 1,
        ];
        _gl.bufferData(_gl.ARRAY_BUFFER, new Float32Array(positions), _gl.STATIC_DRAW);
        _gl.enableVertexAttribArray(pos_attr_loc);
        _gl.vertexAttribPointer(pos_attr_loc, 
            2,          // size
            _gl.FLOAT,   // type
            false,      // normalise
            0,          // stride
            0           // offset
        )
    
        const tex_coord_buffer = _gl.createBuffer();
        _gl.bindBuffer(_gl.ARRAY_BUFFER, tex_coord_buffer);
        const texcoords = [
            0, 0,
            0, 1,
            1, 0,
            1, 0,
            0, 1,
            1, 1,
        ];
        _gl.bufferData(_gl.ARRAY_BUFFER, new Float32Array(texcoords), _gl.STATIC_DRAW);
        _gl.enableVertexAttribArray(texcoord_attr_loc);
        _gl.vertexAttribPointer(texcoord_attr_loc, 
            2,          // size
            _gl.FLOAT,   // type
            false,      // normalise
            0,          // stride
            0           // offset
        );
    }
}