[retro-engine](../README.md) / [Exports](../modules.md) / TextRenderer

# Class: TextRenderer

## Table of contents

### Constructors

- [constructor](TextRenderer.md#constructor)

### Properties

- [currFont](TextRenderer.md#currfont)
- [fontMap](TextRenderer.md#fontmap)
- [texts](TextRenderer.md#texts)

### Methods

- [addTextInstance](TextRenderer.md#addtextinstance)
- [bindFontTexture](TextRenderer.md#bindfonttexture)
- [init](TextRenderer.md#init)
- [removeTextInstance](TextRenderer.md#removetextinstance)
- [render](TextRenderer.md#render)
- [renderCharacter](TextRenderer.md#rendercharacter)
- [renderTextInstance](TextRenderer.md#rendertextinstance)

## Constructors

### constructor

• **new TextRenderer**()

## Properties

### currFont

▪ `Static` **currFont**: [`Font`](Font.md) = `null`

#### Defined in

[src/renderer/textRenderer.ts:91](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/textRenderer.ts#L91)

___

### fontMap

▪ `Static` **fontMap**: `Map`<`string`, [`Font`](Font.md)\>

#### Defined in

[src/renderer/textRenderer.ts:92](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/textRenderer.ts#L92)

___

### texts

▪ `Static` **texts**: `default`[] = `[]`

#### Defined in

[src/renderer/textRenderer.ts:93](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/textRenderer.ts#L93)

## Methods

### addTextInstance

▸ `Static` **addTextInstance**(`instance`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `default` |

#### Returns

`void`

#### Defined in

[src/renderer/textRenderer.ts:165](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/textRenderer.ts#L165)

___

### bindFontTexture

▸ `Static` `Private` **bindFontTexture**(`font`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `font` | [`Font`](Font.md) |

#### Returns

`void`

#### Defined in

[src/renderer/textRenderer.ts:176](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/textRenderer.ts#L176)

___

### init

▸ `Static` **init**(): `void`

#### Returns

`void`

#### Defined in

[src/renderer/textRenderer.ts:95](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/textRenderer.ts#L95)

___

### removeTextInstance

▸ `Static` **removeTextInstance**(`instance`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `default` |

#### Returns

`void`

#### Defined in

[src/renderer/textRenderer.ts:169](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/textRenderer.ts#L169)

___

### render

▸ `Static` **render**(): `void`

#### Returns

`void`

#### Defined in

[src/renderer/textRenderer.ts:99](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/textRenderer.ts#L99)

___

### renderCharacter

▸ `Static` **renderCharacter**(`char`, `scale`, `x`, `y`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `char` | `string` |
| `scale` | `number` |
| `x` | `number` |
| `y` | `number` |

#### Returns

`void`

#### Defined in

[src/renderer/textRenderer.ts:187](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/textRenderer.ts#L187)

___

### renderTextInstance

▸ `Static` `Private` **renderTextInstance**(`instance`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `default` |

#### Returns

`void`

#### Defined in

[src/renderer/textRenderer.ts:137](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/textRenderer.ts#L137)
