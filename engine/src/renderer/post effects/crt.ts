import { _gl } from '../gl.js';

import { PostProcess } from "../post_process.js";


//TODO: this looks terrible
export default class CRTShader extends PostProcess {
    constructor() {
        const v_shader = `#version 300 es

        in vec4 a_position;
        in vec2 a_texcoord;

        out vec2 v_texcoord;

        void main() {
            // the screen coordinates are in the range [-1, 1], whereas the unit quad is in the range [0, 1]
            gl_Position = a_position * vec4(2, 2, 1, 1) - vec4(1, 1, 0, 0);
            v_texcoord = a_texcoord;
        }
        `;
        //https://babylonjs.medium.com/retro-crt-shader-a-post-processing-effect-study-1cb3f783afbc
        const f_shader = `#version 300 es

        precision highp float;
        uniform sampler2D u_texture;
        in vec2 v_texcoord;

        #define PI 3.1415926538

        out vec4 outColour;

        //uniform vec2 curvature;
        //uniform vec2 screenResolution;
        //uniform vec2 scanLineOpacity;
        //uniform float brightness;

        vec2 screenResolution = vec2(426.0*3.0, 240.0*3.0);
        vec2 scanLineOpacity = vec2(1.0, 1.0);
        float brightness = 2.0;

        vec4 scanLineIntensity(float uv, float resolution, float opacity)
        {
            float intensity = sin(uv * resolution * PI * 2.0);
            intensity = ((0.5 * intensity) + 0.5) * 0.9 + 0.1;
            return vec4(vec3(pow(intensity, opacity)), 1.0);
        }

        void main() 
        {
            vec4 baseColour = texture(u_texture, v_texcoord);
            
            baseColour *= scanLineIntensity(v_texcoord.x, screenResolution.y, scanLineOpacity.x);
            baseColour *= scanLineIntensity(v_texcoord.y, screenResolution.x, scanLineOpacity.y);

            // brighten the output to compensate for the scanline darkening
            baseColour *= vec4(vec3(brightness), 1.0);

            outColour = baseColour;
        }
        `
        super(v_shader, f_shader);
    }
}