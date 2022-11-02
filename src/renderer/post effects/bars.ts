import { programFromSources } from "../webglutils.js";
import { PostProcess, addPostProcess, removePostProcess } from "../post_process.js";

let v_shader = `#version 300 es

in vec4 a_position;
in vec2 a_texcoord;

out vec2 v_texcoord;

void main() {
  // the screen coordinates are in the range [-1, 1], whereas the unit quad is in the range [0, 1]
  gl_Position = a_position * vec4(2, 2, 1, 1) - vec4(1, 1, 0, 0);
  v_texcoord = a_texcoord;
}
`;

//https://clemz.io/article-retro-shaders-webgl.html
let f_shader=`#version 300 es

precision highp float;

uniform sampler2D u_texture;
uniform float time;
in vec2 v_texcoord;

out vec4 outColor;

void main()
{
  vec3 color = texture(u_texture, v_texcoord).rgb;

  color -= abs(sin(v_texcoord.y * 100.0 + time * 5.0)) * 0.08;
  color -= abs(sin(v_texcoord.y * 300.0 - time * 10.0)) * 0.05;

  outColor = vec4(color, 1.0).rgba;
}
`;

let post: PostProcess = null;

function create(gl: WebGL2RenderingContext) {
    let prog = programFromSources(gl, v_shader, f_shader);
    post = {
        program: prog,
        draw_func: (gl: WebGL2RenderingContext) => {
            gl.uniform1f(gl.getUniformLocation(prog, "time"), performance.now() / 1000);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
    }
}

export function activate(gl: WebGL2RenderingContext) {
    if (post == null) {
        create(gl);
    }
    addPostProcess(post);
}

export function deactivate(gl: WebGL2RenderingContext) {
    if (post == null) {
      return;
    }
    removePostProcess(post);
}