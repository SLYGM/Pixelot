[retro-engine](../README.md) / [Exports](../modules.md) / SpriteLayer

# Class: SpriteLayer

## Hierarchy

- [`RenderLayer`](RenderLayer.md)

  ↳ **`SpriteLayer`**

## Table of contents

### Constructors

- [constructor](SpriteLayer.md#constructor)

### Properties

- [currentID](SpriteLayer.md#currentid)
- [spriteIDs](SpriteLayer.md#spriteids)
- [sprites](SpriteLayer.md#sprites)

### Methods

- [addSprite](SpriteLayer.md#addsprite)
- [removeSprite](SpriteLayer.md#removesprite)
- [render](SpriteLayer.md#render)

## Constructors

### constructor

• **new SpriteLayer**()

#### Overrides

[RenderLayer](RenderLayer.md).[constructor](RenderLayer.md#constructor)

#### Defined in

[src/renderer/renderer.ts:33](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L33)

## Properties

### currentID

• **currentID**: `number`

#### Defined in

[src/renderer/renderer.ts:31](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L31)

___

### spriteIDs

• **spriteIDs**: `Map`<`default`, `number`\>

#### Defined in

[src/renderer/renderer.ts:30](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L30)

___

### sprites

• **sprites**: `any`

#### Defined in

[src/renderer/renderer.ts:29](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L29)

## Methods

### addSprite

▸ **addSprite**(`sprite`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sprite` | `default` |

#### Returns

`void`

#### Defined in

[src/renderer/renderer.ts:44](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L44)

___

### removeSprite

▸ **removeSprite**(`sprite`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sprite` | `default` |

#### Returns

`void`

#### Defined in

[src/renderer/renderer.ts:49](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L49)

___

### render

▸ **render**(): `void`

#### Returns

`void`

#### Overrides

[RenderLayer](RenderLayer.md).[render](RenderLayer.md#render)

#### Defined in

[src/renderer/renderer.ts:53](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/renderer.ts#L53)
