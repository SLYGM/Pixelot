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

  initialised = true;
}


class TextInstance {
  text: string;
  x: number;
  y: number;
  font: Font;
  scale: number;

  constructor(text: string, x: number, y: number, font: Font, scale: number) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.font = font;
    this.scale = scale;
  }

  delete() {
    TextRenderer.removeTextInstance(this);
  }

  render() {
    //render each character
    let x_pos = this.x;
    let y_pos = this.y;
    for (let i = 0; i < this.text.length; i++) {
      // TODO: currently the default font only has one case of letters
      const char = this.text[i].toLowerCase();
      if (char === ' ') {
        x_pos += this.font.fontInfo.spaceWidth * this.scale;
      }
      else if (char === '\n') {
        y_pos += this.font.fontInfo.letterHeight * this.scale;
        x_pos = this.x;
      }
      else {
        // try to render the character, if it fails, render a question mark in its place
        try {
          TextRenderer.renderCharacter(char, this.scale, x_pos, y_pos);
          x_pos += this.font.fontInfo.glyphInfos[char].width * this.scale;
        } catch (e) {
          TextRenderer.renderCharacter('?', this.scale, x_pos, y_pos);
          x_pos += this.font.fontInfo.glyphInfos['?'].width * this.scale;
        }
        
      }
    }
  }
}

export class TextRenderer {
  static currFont: Font = null;
  static fontMap: Map<string, Font> = new Map();
  static texts : TextInstance[] = [];

    static init() {
      initTextRendering();
      this.addTextInstance(new TextInstance("Hello\nWorld!", 200, 50, this.fontMap.get("defaultFont"), 2));
    }

    static render() {
      $gl.useProgram(prog);
      $gl.bindBuffer($gl.ARRAY_BUFFER, texcoord_buffer);
      // setup reading from the texture coord buffer
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

      // render each text instance
      for (const text of this.texts) {
        // first bind the font texture
        this.bindFontTexture(text.font);
        text.render();
      }

      this.currFont = null;
    }

    static addTextInstance(instance: TextInstance) {
      this.texts.push(instance);
    }

    static removeTextInstance(instance: TextInstance) {
      const index = this.texts.indexOf(instance);
      if (index != -1) {
        this.texts.splice(index, 1);
      }
    }

    private static bindFontTexture(font: Font) {
      // if the font is already bound, don't bother doing it again
      if (this.currFont == font) return;

      const tex = font.getTexture().texture;
      $gl.activeTexture($gl.TEXTURE0);
      $gl.bindTexture($gl.TEXTURE_2D, tex);
      $gl.uniform1i(tex_loc, 0);
      this.currFont = font;
    }

    static renderCharacter(char: string, scale: number, x: number, y: number) {
      // retrieve the texture coordinates for the character
      $gl.uniform1i(tex_loc, 0);
      const tex_coords = this.currFont.getGlyphCoords(char);
      $gl.bufferData($gl.ARRAY_BUFFER, new Float32Array(tex_coords), $gl.STATIC_DRAW);
      
      // translate and scale the character to the correct position
      const img_matrix = mat4.create();
      mat4.translate(img_matrix, img_matrix, vec3.fromValues(x, y, 0));
      mat4.translate(
          img_matrix,
          img_matrix,
          vec3.fromValues(-Renderer.viewport.x, -Renderer.viewport.y, 0)
      );

      mat4.scale(
          img_matrix,
          img_matrix,
          vec3.fromValues(
            this.currFont.fontInfo.glyphInfos[char].width*scale, 
            this.currFont.fontInfo.letterHeight*scale, 1
          )
      );
      $gl.uniformMatrix4fv(mat_loc, false, img_matrix);

      // draw the character
      $gl.drawArrays($gl.TRIANGLES, 0, 6);
    }
}


export class Font {
    static fontName: string;
    src: string;
    texture: Texture = null;
    fontInfo: {
        letterHeight: number,
        spaceWidth: number,
        spacing: number,
        textureWidth: number,
        textureHeight: number,
        glyphInfos: object
    };

    static init() {
      const font = new this;
      TextRenderer.fontMap.set(this.fontName, font);
    }

    getTexture() {
        // load the texture if it hasn't been loaded yet (lazy loading)
        if (!this.texture) this.texture = Renderer.loadTexture(this.src);
        return this.texture;
    }

    getGlyphCoords(glyph: string) {
      const glyphInfo = this.fontInfo.glyphInfos[glyph];
      /* throw an error if the glyph doesn't exist
       (can't directly access the fontname here, as it is a static property, so this is a workaround) */
      if (!glyphInfo) throw new Error(`Glyph '${glyph}' not found in font '${(this.constructor as any).fontName}'`);

      const maxX = this.fontInfo.textureWidth;
      const maxY = this.fontInfo.textureHeight;

      const u1 = glyphInfo.x / maxX;
      const v1 = (glyphInfo.y + this.fontInfo.letterHeight) / maxY;
      const u2 = (glyphInfo.x + glyphInfo.width) / maxX;
      const v2 = glyphInfo.y / maxY;

      return [
        u1, v2,
        u1, v1,
        u2, v2,
        u2, v2,
        u1, v1,
        u2, v1
      ];
    }
}

export class DefaultFont extends Font {
    static override fontName: string = 'defaultFont';
    override src: string = '/projects/project1/assets/fonts/default font.png';
    override fontInfo = {
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

      // initialise an instance of this font in the font map
      static {
        this.init();
      }

}