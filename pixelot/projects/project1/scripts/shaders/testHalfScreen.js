// import { $gl } from 'retro-engine';
// import { PostProcess } from "retro-engine";
export default class TestHalfScreenShader extends engine.PostProcess {
    static arg_names = [];
    static arg_types = [];
    constructor() {
        const v_shader = `#version 300 es

    in vec4 a_position;

    out vec2 v_texcoord;

    void main() {
      // the screen coordinates are in the range [-1, 1], whereas the unit quad is in the range [0, 1]
      gl_Position = a_position * vec4(2, 2, 1, 1) - vec4(1, 1, 0, 0);
      v_texcoord = a_position.xy;
    }
    `;
        //https://clemz.io/article-retro-shaders-webgl.html
        const f_shader = `#version 300 es

    precision highp float;

    uniform sampler2D u_texture;
    in vec2 v_texcoord;

    out vec4 outColor;

    void main()
    {
        if (v_texcoord.x > 0.5) {
            outColor = texture(u_texture, v_texcoord);
        } else {
            outColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    }
    `;
        super(v_shader, f_shader);
    }
    draw() {
        engine.$gl.drawArrays(engine.$gl.TRIANGLES, 0, 6);
    }
}
