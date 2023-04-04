[retro-engine](../README.md) / [Exports](../modules.md) / Font

# Class: Font

## Hierarchy

- **`Font`**

  ↳ [`DefaultFont`](DefaultFont.md)

## Table of contents

### Constructors

- [constructor](Font.md#constructor)

### Properties

- [fontInfo](Font.md#fontinfo)
- [src](Font.md#src)
- [texture](Font.md#texture)
- [fontName](Font.md#fontname)

### Methods

- [getGlyphCoords](Font.md#getglyphcoords)
- [getTexture](Font.md#gettexture)
- [init](Font.md#init)

## Constructors

### constructor

• **new Font**()

## Properties

### fontInfo

• **fontInfo**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `glyphInfos` | `object` |
| `letterHeight` | `number` |
| `spaceWidth` | `number` |
| `spacing` | `number` |
| `textureHeight` | `number` |
| `textureWidth` | `number` |

#### Defined in

[src/renderer/textRenderer.ts:222](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/textRenderer.ts#L222)

___

### src

• **src**: `string`

#### Defined in

[src/renderer/textRenderer.ts:220](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/textRenderer.ts#L220)

___

### texture

• **texture**: [`Texture`](../modules.md#texture) = `null`

#### Defined in

[src/renderer/textRenderer.ts:221](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/textRenderer.ts#L221)

___

### fontName

▪ `Static` **fontName**: `string`

#### Defined in

[src/renderer/textRenderer.ts:219](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/textRenderer.ts#L219)

## Methods

### getGlyphCoords

▸ **getGlyphCoords**(`glyph`): `number`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `glyph` | `string` |

#### Returns

`number`[]

#### Defined in

[src/renderer/textRenderer.ts:242](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/textRenderer.ts#L242)

___

### getTexture

▸ **getTexture**(): [`Texture`](../modules.md#texture)

#### Returns

[`Texture`](../modules.md#texture)

#### Defined in

[src/renderer/textRenderer.ts:236](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/textRenderer.ts#L236)

___

### init

▸ `Static` **init**(): `void`

#### Returns

`void`

#### Defined in

[src/renderer/textRenderer.ts:231](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/textRenderer.ts#L231)
