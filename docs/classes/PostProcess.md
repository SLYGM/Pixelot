[retro-engine](../README.md) / [Exports](../modules.md) / PostProcess

# Class: PostProcess
Class inherited by user-defined post-processes. It is useful to access the `engine.$gl` global here to access the WebGL context.

**`Example`**

An example user-defined post-process which colours the left half of the screen red:
```js
export default class HalfScreenShader extends engine.PostProcess {
    static arg_names = [];
    static arg_types = [];

    constructor() {
        const v_shader = `#version 300 es

    in vec4 a_position;

    out vec2 v_texcoord;

    void main() {
      gl_Position = a_position * vec4(2, 2, 1, 1) - vec4(1, 1, 0, 0);
      v_texcoord = a_position.xy;
    }
    `;

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
```

## Table of contents

### Constructors

- [constructor](PostProcess.md#constructor)

### Methods

- [draw](PostProcess.md#draw)

## Constructors

### constructor
> Ensure that there is a call to `super(v_shader, f_shader)` in the constructor of any user-defined post-process.

• **new PostProcess**(`v_shader`, `f_shader`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v_shader` | `string` | The vertex shader code. |
| `f_shader` | `string` | The fragment shader code. |

#### Defined in

[src/renderer/post_process.ts:8](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/post_process.ts#L8)

## Methods

### draw
This function will be called when the post-process is applied. It should contain the code to draw the post-process. The default implementation is to draw a full-screen quad.

▸ **draw**(): `void`

#### Returns

`void`

#### Defined in

[src/renderer/post_process.ts:12](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/post_process.ts#L12)
