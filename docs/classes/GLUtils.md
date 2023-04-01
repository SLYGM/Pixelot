[retro-engine](../README.md) / [Exports](../modules.md) / GLUtils

# Class: GLUtils

## Table of contents

### Constructors

- [constructor](GLUtils.md#constructor)

### Methods

- [createProgram](GLUtils.md#createprogram)
- [createShader](GLUtils.md#createshader)
- [createTexAndBuffer](GLUtils.md#createtexandbuffer)
- [loadImage](GLUtils.md#loadimage)
- [programFromSources](GLUtils.md#programfromsources)

## Constructors

### constructor

• **new GLUtils**()

## Methods

### createProgram

▸ `Static` **createProgram**(`vertex_shader`, `fragment_shader`): `WebGLProgram`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vertex_shader` | `WebGLShader` |
| `fragment_shader` | `WebGLShader` |

#### Returns

`WebGLProgram`

#### Defined in

[src/renderer/webglutils.ts:22](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/webglutils.ts#L22)

___

### createShader

▸ `Static` **createShader**(`type`, `source`): `WebGLShader`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `number` |
| `source` | `string` |

#### Returns

`WebGLShader`

#### Defined in

[src/renderer/webglutils.ts:4](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/webglutils.ts#L4)

___

### createTexAndBuffer

▸ `Static` **createTexAndBuffer**(`width`, `height`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `width` | `number` |
| `height` | `number` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `fb` | `WebGLFramebuffer` |
| `tex` | `WebGLTexture` |

#### Defined in

[src/renderer/webglutils.ts:70](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/webglutils.ts#L70)

___

### loadImage

▸ `Static` **loadImage**(`path`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/renderer/webglutils.ts:62](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/webglutils.ts#L62)

___

### programFromSources

▸ `Static` **programFromSources**(`v_shader_source`, `f_shader_source`): `WebGLProgram`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v_shader_source` | `string` |
| `f_shader_source` | `string` |

#### Returns

`WebGLProgram`

#### Defined in

[src/renderer/webglutils.ts:44](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/webglutils.ts#L44)
