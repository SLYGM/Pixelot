[retro-engine](README.md) / Exports

# retro-engine

## Table of contents

### Enumerations

- [SystemStage](enums/SystemStage.md)

### Classes

- [AutoMap](classes/AutoMap.md)
- [Builder](classes/Builder.md)
- [Component](classes/Component.md)
- [DefaultFont](classes/DefaultFont.md)
- [FileUtils](classes/FileUtils.md)
- [Font](classes/Font.md)
- [GLUtils](classes/GLUtils.md)
- [Game](classes/Game.md)
- [GameObjectBase](classes/GameObjectBase.md)
- [ImportManager](classes/ImportManager.md)
- [KeyStates](classes/KeyStates.md)
- [MouseState](classes/MouseState.md)
- [PathUtils](classes/PathUtils.md)
- [PostProcess](classes/PostProcess.md)
- [PostProcessing](classes/PostProcessing.md)
- [PrefabFactory](classes/PrefabFactory.md)
- [RenderLayer](classes/RenderLayer.md)
- [Renderer](classes/Renderer.md)
- [Scene](classes/Scene.md)
- [SceneManager](classes/SceneManager.md)
- [Sound](classes/Sound.md)
- [SpriteLayer](classes/SpriteLayer.md)
- [StringUtils](classes/StringUtils.md)
- [System](classes/System.md)
- [TextRenderer](classes/TextRenderer.md)
- [TileMapJSONParser](classes/TileMapJSONParser.md)
- [Type](classes/Type.md)
- [Types](classes/Types.md)

### Type Aliases

- [ComponentType](modules.md#componenttype)
- [Constructor](modules.md#constructor)
- [SystemNode](modules.md#systemnode)
- [Texture](modules.md#texture)
- [Updatable](modules.md#updatable)

### Variables

- [$audio\_context](modules.md#$audio_context)
- [$canvas](modules.md#$canvas)
- [$canvas\_bitmap\_context](modules.md#$canvas_bitmap_context)
- [$gl](modules.md#$gl)
- [$offscreen\_canvas](modules.md#$offscreen_canvas)
- [$rendering\_offscreen](modules.md#$rendering_offscreen)

### Functions

- [connectCanvas](modules.md#connectcanvas)
- [disconnectCanvas](modules.md#disconnectcanvas)
- [doGameImports](modules.md#dogameimports)
- [doProjectImports](modules.md#doprojectimports)
- [initAudio](modules.md#initaudio)
- [loadGL](modules.md#loadgl)

## Type Aliases

### ComponentType

Ƭ **ComponentType**<`T`\>: (...`args`: `unknown`[]) => `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Component`](classes/Component.md) |

#### Type declaration

• (`...args`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `unknown`[] |

#### Defined in

[src/ecs.ts:29](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/ecs.ts#L29)

___

### Constructor

Ƭ **Constructor**<`T`\>: (...`args`: `any`[]) => `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

• (`...args`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Defined in

[src/types.ts:11](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/types.ts#L11)

___

### SystemNode

Ƭ **SystemNode**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `entities` | `Set`<[`GameObjectBase`](classes/GameObjectBase.md)\> |
| `name` | `string` |
| `priority` | `number` |
| `system` | [`System`](classes/System.md) |

#### Defined in

[src/ecs.ts:214](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/ecs.ts#L214)

___

### Texture

Ƭ **Texture**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `texture` | `WebGLTexture` \| ``null`` |
| `width` | `number` |

#### Defined in

[src/types.ts:1](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/types.ts#L1)

___

### Updatable

Ƭ **Updatable**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `update` | (`dt`: `number`) => `void` |

#### Defined in

[src/types.ts:7](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/types.ts#L7)

## Variables

### $audio\_context

• **$audio\_context**: `AudioContext` = `null`

#### Defined in

[src/audio.ts:3](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/audio.ts#L3)

___

### $canvas

• **$canvas**: `HTMLCanvasElement` = `null`

#### Defined in

[src/renderer/gl.ts:5](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/gl.ts#L5)

___

### $canvas\_bitmap\_context

• **$canvas\_bitmap\_context**: `ImageBitmapRenderingContext` = `null`

#### Defined in

[src/renderer/gl.ts:6](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/gl.ts#L6)

___

### $gl

• **$gl**: `WebGL2RenderingContext` = `null`

#### Defined in

[src/renderer/gl.ts:3](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/gl.ts#L3)

___

### $offscreen\_canvas

• **$offscreen\_canvas**: `OffscreenCanvas` = `null`

#### Defined in

[src/renderer/gl.ts:4](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/gl.ts#L4)

___

### $rendering\_offscreen

• **$rendering\_offscreen**: `boolean`

#### Defined in

[src/renderer/gl.ts:8](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/gl.ts#L8)

## Functions

### connectCanvas

▸ **connectCanvas**(): `void`

Connect the rendering to an onscreen canvas. This canvas must have id 'canvas'

#### Returns

`void`

#### Defined in

[src/renderer/gl.ts:66](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/gl.ts#L66)

___

### disconnectCanvas

▸ **disconnectCanvas**(): `void`

Disconnect the current canvas. Use this when the canvas is no longer available.

#### Returns

`void`

#### Defined in

[src/renderer/gl.ts:77](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/gl.ts#L77)

___

### doGameImports

▸ **doGameImports**(): `Promise`<`void`\>

Import all scripts for the game. For use in built game context only, for app imports, see `doProjectImports()`.

#### Returns

`Promise`<`void`\>

#### Defined in

[src/importManager.ts:278](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/importManager.ts#L278)

___

### doProjectImports

▸ **doProjectImports**(`project`, `mode?`): `Promise`<`void`\>

Import user scripts for given project name. For use in app context only, for built game imports, see `doGameImports()`.   
**NOTE:** This function assumes the relative path of the project to the engine source will be `../../pixelot/projects/<project>`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `project` | `string` | `undefined` |
| `mode` | `string` | `"dev"` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/importManager.ts:271](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/importManager.ts#L271)

___

### initAudio

▸ **initAudio**(): `void`

#### Returns

`void`

#### Defined in

[src/audio.ts:5](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/audio.ts#L5)

___

### loadGL

▸ **loadGL**(`offscreen?`): `void`

Load the webgl rendering context.
Can be set to render off-screen, in which case use `connectCanvas` to connect to an onscreen canvas. For this to work
your document must have an element with id 'canvas'. The offscreen rendering allows the WebGL context to be retained even
when there is no canvas on-screen.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `offscreen` | `boolean` | `false` | set to true for offscreen rendering (used in app) |

#### Returns

`void`

#### Defined in

[src/renderer/gl.ts:19](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/gl.ts#L19)
