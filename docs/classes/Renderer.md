[retro-engine](../README.md) / [Exports](../modules.md) / Renderer

# Class: Renderer

## Table of contents

### Constructors

- [constructor](Renderer.md#constructor)

### Properties

- [backgroundColor](Renderer.md#backgroundcolor)
- [frag\_source](Renderer.md#frag_source)
- [layerAliases](Renderer.md#layeraliases)
- [layers](Renderer.md#layers)
- [loaded\_textures](Renderer.md#loaded_textures)
- [resolution](Renderer.md#resolution)
- [shader](Renderer.md#shader)
- [textures](Renderer.md#textures)
- [time](Renderer.md#time)
- [vao](Renderer.md#vao)
- [vert\_source](Renderer.md#vert_source)
- [viewport](Renderer.md#viewport)

### Methods

- [addLayer](Renderer.md#addlayer)
- [createUnitQuad](Renderer.md#createunitquad)
- [drawImage](Renderer.md#drawimage)
- [getLayer](Renderer.md#getlayer)
- [init](Renderer.md#init)
- [loadTexture](Renderer.md#loadtexture)
- [loadTextureWithAlias](Renderer.md#loadtexturewithalias)
- [removeLayer](Renderer.md#removelayer)
- [render](Renderer.md#render)
- [setBackgroundColor](Renderer.md#setbackgroundcolor)
- [setResolution](Renderer.md#setresolution)

## Constructors

### constructor

• **new Renderer**()

## Properties

### backgroundColor

▪ `Static` **backgroundColor**: [r: number, g: number, b: number, a: number]

#### Defined in

[src/renderer/renderer.ts:116](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L116)

___

### frag\_source

▪ `Static` `Private` **frag\_source**: `string`

#### Defined in

[src/renderer/renderer.ts:81](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L81)

___

### layerAliases

▪ `Static` **layerAliases**: [`AutoMap`](AutoMap.md)<[`Scene`](Scene.md), `Map`<`string`, `number`\>\>

#### Defined in

[src/renderer/renderer.ts:114](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L114)

___

### layers

▪ `Static` **layers**: [`AutoMap`](AutoMap.md)<[`Scene`](Scene.md), [`RenderLayer`](RenderLayer.md)[]\>

#### Defined in

[src/renderer/renderer.ts:115](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L115)

___

### loaded\_textures

▪ `Static` **loaded\_textures**: `Map`<`string`, [`Texture`](../modules.md#texture)\>

#### Defined in

[src/renderer/renderer.ts:117](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L117)

___

### resolution

▪ `Static` **resolution**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Defined in

[src/renderer/renderer.ts:101](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L101)

___

### shader

▪ `Static` **shader**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `mat_loc` | `WebGLUniformLocation` |
| `prog` | `WebGLProgram` |
| `proj_loc` | `WebGLUniformLocation` |
| `tex_loc` | `WebGLUniformLocation` |

#### Defined in

[src/renderer/renderer.ts:95](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L95)

___

### textures

▪ `Static` **textures**: `Map`<`string`, [`Texture`](../modules.md#texture)\>

#### Defined in

[src/renderer/renderer.ts:113](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L113)

___

### time

▪ `Static` **time**: `number`

#### Defined in

[src/renderer/renderer.ts:112](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L112)

___

### vao

▪ `Static` **vao**: `WebGLVertexArrayObject`

#### Defined in

[src/renderer/renderer.ts:111](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L111)

___

### vert\_source

▪ `Static` `Private` **vert\_source**: `string`

#### Defined in

[src/renderer/renderer.ts:65](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L65)

___

### viewport

▪ `Static` **viewport**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `sx` | `number` |
| `sy` | `number` |
| `x` | `number` |
| `y` | `number` |

#### Defined in

[src/renderer/renderer.ts:105](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L105)

## Methods

### addLayer

▸ `Static` **addLayer**(`layer`, `alias`, `scene?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `layer` | [`RenderLayer`](RenderLayer.md) | `undefined` |
| `alias` | `string` | `undefined` |
| `scene` | [`Scene`](Scene.md) | `SceneManager.currentScene` |

#### Returns

`void`

#### Defined in

[src/renderer/renderer.ts:220](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L220)

___

### createUnitQuad

▸ `Static` **createUnitQuad**(): `void`

#### Returns

`void`

#### Defined in

[src/renderer/renderer.ts:348](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L348)

___

### drawImage

▸ `Static` **drawImage**(`tex`, `x`, `y`, `rotation?`, `anchorX?`, `anchorY?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `tex` | [`Texture`](../modules.md#texture) | `undefined` |
| `x` | `number` | `undefined` |
| `y` | `number` | `undefined` |
| `rotation` | `number` | `0` |
| `anchorX` | `number` | `0.5` |
| `anchorY` | `number` | `0.5` |

#### Returns

`void`

#### Defined in

[src/renderer/renderer.ts:314](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L314)

___

### getLayer

▸ `Static` **getLayer**(`alias`, `scene?`): [`RenderLayer`](RenderLayer.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `alias` | `string` | `undefined` |
| `scene` | [`Scene`](Scene.md) | `SceneManager.currentScene` |

#### Returns

[`RenderLayer`](RenderLayer.md)

#### Defined in

[src/renderer/renderer.ts:227](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L227)

___

### init

▸ `Static` **init**(`offscreen?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `offscreen` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[src/renderer/renderer.ts:119](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L119)

___

### loadTexture

▸ `Static` **loadTexture**(`path`): [`Texture`](../modules.md#texture)

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

[`Texture`](../modules.md#texture)

#### Defined in

[src/renderer/renderer.ts:247](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L247)

___

### loadTextureWithAlias

▸ `Static` **loadTextureWithAlias**(`path`, `alias`): [`Texture`](../modules.md#texture)

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `alias` | `string` |

#### Returns

[`Texture`](../modules.md#texture)

#### Defined in

[src/renderer/renderer.ts:306](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L306)

___

### removeLayer

▸ `Static` **removeLayer**(`alias`, `scene?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `alias` | `string` | `undefined` |
| `scene` | [`Scene`](Scene.md) | `SceneManager.currentScene` |

#### Returns

`void`

#### Defined in

[src/renderer/renderer.ts:233](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L233)

___

### render

▸ `Static` **render**(): `void`

#### Returns

`void`

#### Defined in

[src/renderer/renderer.ts:177](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L177)

___

### setBackgroundColor

▸ `Static` **setBackgroundColor**(`r`, `g`, `b`, `a`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `r` | `number` |
| `g` | `number` |
| `b` | `number` |
| `a` | `number` |

#### Returns

`void`

#### Defined in

[src/renderer/renderer.ts:173](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L173)

___

### setResolution

▸ `Static` **setResolution**(`x`, `y`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Returns

`void`

#### Defined in

[src/renderer/renderer.ts:167](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L167)
