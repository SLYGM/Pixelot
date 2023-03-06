// import { PostProcess } from "retro-engine";

export default class BarrelShader extends engine.PostProcess {
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
        //https://babylonjs.medium.com/retro-crt-shader-a-post-processing-effect-study-1cb3f783afbc
        const f_shader = `#version 300 es

        precision highp float;
        uniform sampler2D u_texture;
        in vec2 v_texcoord;

        out vec4 outColour;

        //uniform vec2 curvature;
        //uniform vec2 screenResolution;
        //uniform float vignetteOpacity;

        vec2 curvature = vec2(3.0, 3.0);
        vec2 screenResolution = vec2(426.0*3.0, 240.0*3.0);
        float vignetteOpacity = 1.0;

        vec2 curveRemapUV(vec2 uv)
        {
            // as we near the edge of our screen apply greater distortion using a cubic function
            uv = uv * 2.0-1.0;
            vec2 offset = abs(uv.yx) / vec2(curvature.x, curvature.y);
            uv = uv + uv * offset * offset;
            uv = uv * 0.5 + 0.5;
            return uv;
        }

        vec4 vignetteIntensity(vec2 uv, vec2 resolution, float opacity)
        {
            float intensity = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
            return vec4(vec3(clamp(pow((resolution.x / 4.0) * intensity, opacity), 0.0, 1.0)), 1.0);
        }

        void main() 
        {
            vec2 remappedUV = curveRemapUV(vec2(v_texcoord.x, v_texcoord.y));
            vec4 baseColour = texture(u_texture, remappedUV);

            //modify base colour to add vignette (to smooth curvature effect)
            baseColour *= vignetteIntensity(remappedUV, screenResolution, vignetteOpacity);


            if (remappedUV.x < 0.0 || remappedUV.y < 0.0 || remappedUV.x > 1.0 || remappedUV.y > 1.0){
                outColour = vec4(0.0, 0.0, 0.0, 1.0);
            } else {
                outColour = baseColour;
            }
        }
        `;
        super(v_shader, f_shader);
    }
}
