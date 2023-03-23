import { GLUtils } from "./webglutils.js";
import { $gl } from "./gl.js";
import { Texture } from "../types.js";
import { Renderer, RenderLayer } from "./renderer.js";

const { mat4, vec3 } = require("gl-matrix");
const nw = (window as any).nw;
const fs = nw.require("fs");

//source: https://webglfundamentals.org/webgl/lessons/webgl-text-glyphs.html 


const text_vertex_shader = `#version 300 es

in vec4 a_position;
in vec2 a_texcoord;

uniform mat4 u_projection;
uniform mat4 u_matrix;


out vec2 v_texcoord;

void main() {
// Multiply the position by the matrix.
gl_Position = u_projection * u_matrix * a_position;

// Pass the texcoord to the fragment shader.
v_texcoord = a_texcoord;
}
`;

const text_fragment_shader = `#version 300 es

precision mediump float;

// Passed in from the vertex shader.
in vec2 v_texcoord;

uniform sampler2D u_texture;

out vec4 outColor; 

void main() {
  outColor = texture(u_texture, v_texcoord);
}
`;


let prog: WebGLProgram;
let initialised = false;

let texcoord_loc: number;
let tex_loc: WebGLUniformLocation;
let mat_loc: WebGLUniformLocation;
let proj_loc: WebGLUniformLocation;
let texcoord_buffer: WebGLBuffer;


function initTextRendering() {
  if (initialised) return;

  //Setup text rendering program
  prog = GLUtils.programFromSources(text_vertex_shader, text_fragment_shader);


  texcoord_loc = $gl.getAttribLocation(prog, "a_texcoord");
  tex_loc = $gl.getUniformLocation(prog, "u_texture");
  mat_loc = $gl.getUniformLocation(prog, "u_matrix");
  proj_loc = $gl.getUniformLocation(prog, "u_projection");

  $gl.useProgram(prog);

  // setup texture coord buffer
  texcoord_buffer = $gl.createBuffer();
  $gl.bindBuffer($gl.ARRAY_BUFFER, texcoord_buffer);
  $gl.enableVertexAttribArray(texcoord_loc);
  $gl.vertexAttribPointer(
      texcoord_loc,
      2,           // size
      $gl.FLOAT,   // type
      false,       // normalise
      0,           // stride
      0            // offset
  );

  DefaultFont.load();

  initialised = true;
}


export class TextRenderer {

  static texts : {
    text: string,
    x: number,
    y: number,
    font: Font
    }[];

    static init() {
      initTextRendering();
    }

    static render() {
      $gl.useProgram(prog);
      this.bindTextFontTextures();
      $gl.bindBuffer($gl.ARRAY_BUFFER, texcoord_buffer);
      $gl.vertexAttribPointer(
        texcoord_loc,
        2,           // size
        $gl.FLOAT,   // type
        false,       // normalise
        0,           // stride
        0            // offset
      );

      // use orthographic projection to scale coords to -1->1 (calculate once per frame to account for viewport changes)
      const proj_matrix = mat4.create();
      mat4.ortho(
          proj_matrix,
          0,
          Renderer.resolution.x * Renderer.viewport.sx,
          Renderer.resolution.y * Renderer.viewport.sy,
          0,
          -1,
          1
      );
      $gl.uniformMatrix4fv(proj_loc, false, proj_matrix);

      this.renderBitmapText();

    

    }

    private static renderBitmapText() {
      $gl.uniform1i(tex_loc, 0);
      const tex_coords = DefaultFont.getGlyphCoords('b');
      $gl.bufferData($gl.ARRAY_BUFFER, new Float32Array(tex_coords), $gl.STATIC_DRAW);

      const x_pos = 5;
      const y_pos = 5;
      const img_matrix = mat4.create();
      mat4.translate(img_matrix, img_matrix, vec3.fromValues(x_pos, y_pos, 0));
      mat4.translate(
          img_matrix,
          img_matrix,
          vec3.fromValues(-Renderer.viewport.x, -Renderer.viewport.y, 0)
      );

      mat4.scale(
          img_matrix,
          img_matrix,
          vec3.fromValues(DefaultFont.fontInfo.glyphInfos['b'].width*10, DefaultFont.fontInfo.letterHeight*10, 1)
      );
      $gl.uniformMatrix4fv(mat_loc, false, img_matrix);

      $gl.drawArrays($gl.TRIANGLES, 0, 6);
    }

    private static bindTextFontTextures() {
        $gl.activeTexture($gl.TEXTURE0);
        $gl.bindTexture($gl.TEXTURE_2D, DefaultFont.getTexture().texture);

    }
      
}


export class Font {
    static loaded: boolean = false;
    static fontName: string;
    static src: string;
    private static texture: Texture = null;
    static fontInfo: {
        letterHeight: number,
        spaceWidth: number,
        spacing: number,
        textureWidth: number,
        textureHeight: number,
        glyphInfos: object
    };

    static load() {
        if (this.loaded) return;
        Renderer.loadTextureWithAlias(this.src, this.fontName);
        this.loaded = true;
    }

    static getTexture() {
        if (!this.loaded) return null;
        if (!this.texture) this.texture = Renderer.textures.get(this.fontName);
        return this.texture;
    }

    static getGlyphCoords(glyph: string) {
      const glyphInfo = this.fontInfo.glyphInfos[glyph];
      if (!glyphInfo) return null;

      const maxX = this.fontInfo.textureWidth;
      const maxY = this.fontInfo.textureHeight;

      const u1 = glyphInfo.x / maxX;
      const v1 = (glyphInfo.y + this.fontInfo.letterHeight) / maxY;
      const u2 = (glyphInfo.x + glyphInfo.width) / maxX;
      const v2 = glyphInfo.y / maxY;

      return [
        u1, v1,
        u1, v2,
        u2, v1,
        u2, v1,
        u1, v2,
        u2, v2
      ];
    }
}

export class DefaultFont extends Font {
    static override fontName: string = 'defaultFont';
    static override src: string = '/projects/project1/assets/fonts/default font.png';
    static override fontInfo = {
        letterHeight: 8,
        spaceWidth: 8,
        spacing: -1,
        textureWidth: 64,
        textureHeight: 40,
        glyphInfos: {
          'a': { x:  0, y:  0, width: 8, },
          'b': { x:  8, y:  0, width: 8, },
          'c': { x: 16, y:  0, width: 8, },
          'd': { x: 24, y:  0, width: 8, },
          'e': { x: 32, y:  0, width: 8, },
          'f': { x: 40, y:  0, width: 8, },
          'g': { x: 48, y:  0, width: 8, },
          'h': { x: 56, y:  0, width: 8, },
          'i': { x:  0, y:  8, width: 8, },
          'j': { x:  8, y:  8, width: 8, },
          'k': { x: 16, y:  8, width: 8, },
          'l': { x: 24, y:  8, width: 8, },
          'm': { x: 32, y:  8, width: 8, },
          'n': { x: 40, y:  8, width: 8, },
          'o': { x: 48, y:  8, width: 8, },
          'p': { x: 56, y:  8, width: 8, },
          'q': { x:  0, y: 16, width: 8, },
          'r': { x:  8, y: 16, width: 8, },
          's': { x: 16, y: 16, width: 8, },
          't': { x: 24, y: 16, width: 8, },
          'u': { x: 32, y: 16, width: 8, },
          'v': { x: 40, y: 16, width: 8, },
          'w': { x: 48, y: 16, width: 8, },
          'x': { x: 56, y: 16, width: 8, },
          'y': { x:  0, y: 24, width: 8, },
          'z': { x:  8, y: 24, width: 8, },
          '0': { x: 16, y: 24, width: 8, },
          '1': { x: 24, y: 24, width: 8, },
          '2': { x: 32, y: 24, width: 8, },
          '3': { x: 40, y: 24, width: 8, },
          '4': { x: 48, y: 24, width: 8, },
          '5': { x: 56, y: 24, width: 8, },
          '6': { x:  0, y: 32, width: 8, },
          '7': { x:  8, y: 32, width: 8, },
          '8': { x: 16, y: 32, width: 8, },
          '9': { x: 24, y: 32, width: 8, },
          '-': { x: 32, y: 32, width: 8, },
          '*': { x: 40, y: 32, width: 8, },
          '!': { x: 48, y: 32, width: 8, },
          '?': { x: 56, y: 32, width: 8, },
        },
      };

}