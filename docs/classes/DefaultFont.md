[retro-engine](../README.md) / [Exports](../modules.md) / DefaultFont

# Class: DefaultFont

## Hierarchy

- [`Font`](Font.md)

  ↳ **`DefaultFont`**

## Table of contents

### Constructors

- [constructor](DefaultFont.md#constructor)

### Properties

- [fontInfo](DefaultFont.md#fontinfo)
- [src](DefaultFont.md#src)
- [texture](DefaultFont.md#texture)
- [fontName](DefaultFont.md#fontname)

### Methods

- [getGlyphCoords](DefaultFont.md#getglyphcoords)
- [getTexture](DefaultFont.md#gettexture)
- [init](DefaultFont.md#init)

## Constructors

### constructor

• **new DefaultFont**()

#### Inherited from

[Font](Font.md).[constructor](Font.md#constructor)

## Properties

### fontInfo

• **fontInfo**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `glyphInfos` | { `!`: { `width`: `number` = 8; `x`: `number` = 48; `y`: `number` = 32 } ; `*`: { `width`: `number` = 8; `x`: `number` = 40; `y`: `number` = 32 } ; `-`: { `width`: `number` = 8; `x`: `number` = 32; `y`: `number` = 32 } ; `0`: { `width`: `number` = 8; `x`: `number` = 16; `y`: `number` = 24 } ; `1`: { `width`: `number` = 8; `x`: `number` = 24; `y`: `number` = 24 } ; `2`: { `width`: `number` = 8; `x`: `number` = 32; `y`: `number` = 24 } ; `3`: { `width`: `number` = 8; `x`: `number` = 40; `y`: `number` = 24 } ; `4`: { `width`: `number` = 8; `x`: `number` = 48; `y`: `number` = 24 } ; `5`: { `width`: `number` = 8; `x`: `number` = 56; `y`: `number` = 24 } ; `6`: { `width`: `number` = 8; `x`: `number` = 0; `y`: `number` = 32 } ; `7`: { `width`: `number` = 8; `x`: `number` = 8; `y`: `number` = 32 } ; `8`: { `width`: `number` = 8; `x`: `number` = 16; `y`: `number` = 32 } ; `9`: { `width`: `number` = 8; `x`: `number` = 24; `y`: `number` = 32 } ; `?`: { `width`: `number` = 8; `x`: `number` = 56; `y`: `number` = 32 } ; `a`: { `width`: `number` = 8; `x`: `number` = 0; `y`: `number` = 0 } ; `b`: { `width`: `number` = 8; `x`: `number` = 8; `y`: `number` = 0 } ; `c`: { `width`: `number` = 8; `x`: `number` = 16; `y`: `number` = 0 } ; `d`: { `width`: `number` = 8; `x`: `number` = 24; `y`: `number` = 0 } ; `e`: { `width`: `number` = 8; `x`: `number` = 32; `y`: `number` = 0 } ; `f`: { `width`: `number` = 8; `x`: `number` = 40; `y`: `number` = 0 } ; `g`: { `width`: `number` = 8; `x`: `number` = 48; `y`: `number` = 0 } ; `h`: { `width`: `number` = 8; `x`: `number` = 56; `y`: `number` = 0 } ; `i`: { `width`: `number` = 8; `x`: `number` = 0; `y`: `number` = 8 } ; `j`: { `width`: `number` = 8; `x`: `number` = 8; `y`: `number` = 8 } ; `k`: { `width`: `number` = 8; `x`: `number` = 16; `y`: `number` = 8 } ; `l`: { `width`: `number` = 8; `x`: `number` = 24; `y`: `number` = 8 } ; `m`: { `width`: `number` = 8; `x`: `number` = 32; `y`: `number` = 8 } ; `n`: { `width`: `number` = 8; `x`: `number` = 40; `y`: `number` = 8 } ; `o`: { `width`: `number` = 8; `x`: `number` = 48; `y`: `number` = 8 } ; `p`: { `width`: `number` = 8; `x`: `number` = 56; `y`: `number` = 8 } ; `q`: { `width`: `number` = 8; `x`: `number` = 0; `y`: `number` = 16 } ; `r`: { `width`: `number` = 8; `x`: `number` = 8; `y`: `number` = 16 } ; `s`: { `width`: `number` = 8; `x`: `number` = 16; `y`: `number` = 16 } ; `t`: { `width`: `number` = 8; `x`: `number` = 24; `y`: `number` = 16 } ; `u`: { `width`: `number` = 8; `x`: `number` = 32; `y`: `number` = 16 } ; `v`: { `width`: `number` = 8; `x`: `number` = 40; `y`: `number` = 16 } ; `w`: { `width`: `number` = 8; `x`: `number` = 48; `y`: `number` = 16 } ; `x`: { `width`: `number` = 8; `x`: `number` = 56; `y`: `number` = 16 } ; `y`: { `width`: `number` = 8; `x`: `number` = 0; `y`: `number` = 24 } ; `z`: { `width`: `number` = 8; `x`: `number` = 8; `y`: `number` = 24 }  } |
| `glyphInfos.!` | { `width`: `number` = 8; `x`: `number` = 48; `y`: `number` = 32 } |
| `glyphInfos.!.width` | `number` |
| `glyphInfos.!.x` | `number` |
| `glyphInfos.!.y` | `number` |
| `glyphInfos.*` | { `width`: `number` = 8; `x`: `number` = 40; `y`: `number` = 32 } |
| `glyphInfos.*.width` | `number` |
| `glyphInfos.*.x` | `number` |
| `glyphInfos.*.y` | `number` |
| `glyphInfos.-` | { `width`: `number` = 8; `x`: `number` = 32; `y`: `number` = 32 } |
| `glyphInfos.-.width` | `number` |
| `glyphInfos.-.x` | `number` |
| `glyphInfos.-.y` | `number` |
| `glyphInfos.0` | { `width`: `number` = 8; `x`: `number` = 16; `y`: `number` = 24 } |
| `glyphInfos.0.width` | `number` |
| `glyphInfos.0.x` | `number` |
| `glyphInfos.0.y` | `number` |
| `glyphInfos.1` | { `width`: `number` = 8; `x`: `number` = 24; `y`: `number` = 24 } |
| `glyphInfos.1.width` | `number` |
| `glyphInfos.1.x` | `number` |
| `glyphInfos.1.y` | `number` |
| `glyphInfos.2` | { `width`: `number` = 8; `x`: `number` = 32; `y`: `number` = 24 } |
| `glyphInfos.2.width` | `number` |
| `glyphInfos.2.x` | `number` |
| `glyphInfos.2.y` | `number` |
| `glyphInfos.3` | { `width`: `number` = 8; `x`: `number` = 40; `y`: `number` = 24 } |
| `glyphInfos.3.width` | `number` |
| `glyphInfos.3.x` | `number` |
| `glyphInfos.3.y` | `number` |
| `glyphInfos.4` | { `width`: `number` = 8; `x`: `number` = 48; `y`: `number` = 24 } |
| `glyphInfos.4.width` | `number` |
| `glyphInfos.4.x` | `number` |
| `glyphInfos.4.y` | `number` |
| `glyphInfos.5` | { `width`: `number` = 8; `x`: `number` = 56; `y`: `number` = 24 } |
| `glyphInfos.5.width` | `number` |
| `glyphInfos.5.x` | `number` |
| `glyphInfos.5.y` | `number` |
| `glyphInfos.6` | { `width`: `number` = 8; `x`: `number` = 0; `y`: `number` = 32 } |
| `glyphInfos.6.width` | `number` |
| `glyphInfos.6.x` | `number` |
| `glyphInfos.6.y` | `number` |
| `glyphInfos.7` | { `width`: `number` = 8; `x`: `number` = 8; `y`: `number` = 32 } |
| `glyphInfos.7.width` | `number` |
| `glyphInfos.7.x` | `number` |
| `glyphInfos.7.y` | `number` |
| `glyphInfos.8` | { `width`: `number` = 8; `x`: `number` = 16; `y`: `number` = 32 } |
| `glyphInfos.8.width` | `number` |
| `glyphInfos.8.x` | `number` |
| `glyphInfos.8.y` | `number` |
| `glyphInfos.9` | { `width`: `number` = 8; `x`: `number` = 24; `y`: `number` = 32 } |
| `glyphInfos.9.width` | `number` |
| `glyphInfos.9.x` | `number` |
| `glyphInfos.9.y` | `number` |
| `glyphInfos.?` | { `width`: `number` = 8; `x`: `number` = 56; `y`: `number` = 32 } |
| `glyphInfos.?.width` | `number` |
| `glyphInfos.?.x` | `number` |
| `glyphInfos.?.y` | `number` |
| `glyphInfos.a` | { `width`: `number` = 8; `x`: `number` = 0; `y`: `number` = 0 } |
| `glyphInfos.a.width` | `number` |
| `glyphInfos.a.x` | `number` |
| `glyphInfos.a.y` | `number` |
| `glyphInfos.b` | { `width`: `number` = 8; `x`: `number` = 8; `y`: `number` = 0 } |
| `glyphInfos.b.width` | `number` |
| `glyphInfos.b.x` | `number` |
| `glyphInfos.b.y` | `number` |
| `glyphInfos.c` | { `width`: `number` = 8; `x`: `number` = 16; `y`: `number` = 0 } |
| `glyphInfos.c.width` | `number` |
| `glyphInfos.c.x` | `number` |
| `glyphInfos.c.y` | `number` |
| `glyphInfos.d` | { `width`: `number` = 8; `x`: `number` = 24; `y`: `number` = 0 } |
| `glyphInfos.d.width` | `number` |
| `glyphInfos.d.x` | `number` |
| `glyphInfos.d.y` | `number` |
| `glyphInfos.e` | { `width`: `number` = 8; `x`: `number` = 32; `y`: `number` = 0 } |
| `glyphInfos.e.width` | `number` |
| `glyphInfos.e.x` | `number` |
| `glyphInfos.e.y` | `number` |
| `glyphInfos.f` | { `width`: `number` = 8; `x`: `number` = 40; `y`: `number` = 0 } |
| `glyphInfos.f.width` | `number` |
| `glyphInfos.f.x` | `number` |
| `glyphInfos.f.y` | `number` |
| `glyphInfos.g` | { `width`: `number` = 8; `x`: `number` = 48; `y`: `number` = 0 } |
| `glyphInfos.g.width` | `number` |
| `glyphInfos.g.x` | `number` |
| `glyphInfos.g.y` | `number` |
| `glyphInfos.h` | { `width`: `number` = 8; `x`: `number` = 56; `y`: `number` = 0 } |
| `glyphInfos.h.width` | `number` |
| `glyphInfos.h.x` | `number` |
| `glyphInfos.h.y` | `number` |
| `glyphInfos.i` | { `width`: `number` = 8; `x`: `number` = 0; `y`: `number` = 8 } |
| `glyphInfos.i.width` | `number` |
| `glyphInfos.i.x` | `number` |
| `glyphInfos.i.y` | `number` |
| `glyphInfos.j` | { `width`: `number` = 8; `x`: `number` = 8; `y`: `number` = 8 } |
| `glyphInfos.j.width` | `number` |
| `glyphInfos.j.x` | `number` |
| `glyphInfos.j.y` | `number` |
| `glyphInfos.k` | { `width`: `number` = 8; `x`: `number` = 16; `y`: `number` = 8 } |
| `glyphInfos.k.width` | `number` |
| `glyphInfos.k.x` | `number` |
| `glyphInfos.k.y` | `number` |
| `glyphInfos.l` | { `width`: `number` = 8; `x`: `number` = 24; `y`: `number` = 8 } |
| `glyphInfos.l.width` | `number` |
| `glyphInfos.l.x` | `number` |
| `glyphInfos.l.y` | `number` |
| `glyphInfos.m` | { `width`: `number` = 8; `x`: `number` = 32; `y`: `number` = 8 } |
| `glyphInfos.m.width` | `number` |
| `glyphInfos.m.x` | `number` |
| `glyphInfos.m.y` | `number` |
| `glyphInfos.n` | { `width`: `number` = 8; `x`: `number` = 40; `y`: `number` = 8 } |
| `glyphInfos.n.width` | `number` |
| `glyphInfos.n.x` | `number` |
| `glyphInfos.n.y` | `number` |
| `glyphInfos.o` | { `width`: `number` = 8; `x`: `number` = 48; `y`: `number` = 8 } |
| `glyphInfos.o.width` | `number` |
| `glyphInfos.o.x` | `number` |
| `glyphInfos.o.y` | `number` |
| `glyphInfos.p` | { `width`: `number` = 8; `x`: `number` = 56; `y`: `number` = 8 } |
| `glyphInfos.p.width` | `number` |
| `glyphInfos.p.x` | `number` |
| `glyphInfos.p.y` | `number` |
| `glyphInfos.q` | { `width`: `number` = 8; `x`: `number` = 0; `y`: `number` = 16 } |
| `glyphInfos.q.width` | `number` |
| `glyphInfos.q.x` | `number` |
| `glyphInfos.q.y` | `number` |
| `glyphInfos.r` | { `width`: `number` = 8; `x`: `number` = 8; `y`: `number` = 16 } |
| `glyphInfos.r.width` | `number` |
| `glyphInfos.r.x` | `number` |
| `glyphInfos.r.y` | `number` |
| `glyphInfos.s` | { `width`: `number` = 8; `x`: `number` = 16; `y`: `number` = 16 } |
| `glyphInfos.s.width` | `number` |
| `glyphInfos.s.x` | `number` |
| `glyphInfos.s.y` | `number` |
| `glyphInfos.t` | { `width`: `number` = 8; `x`: `number` = 24; `y`: `number` = 16 } |
| `glyphInfos.t.width` | `number` |
| `glyphInfos.t.x` | `number` |
| `glyphInfos.t.y` | `number` |
| `glyphInfos.u` | { `width`: `number` = 8; `x`: `number` = 32; `y`: `number` = 16 } |
| `glyphInfos.u.width` | `number` |
| `glyphInfos.u.x` | `number` |
| `glyphInfos.u.y` | `number` |
| `glyphInfos.v` | { `width`: `number` = 8; `x`: `number` = 40; `y`: `number` = 16 } |
| `glyphInfos.v.width` | `number` |
| `glyphInfos.v.x` | `number` |
| `glyphInfos.v.y` | `number` |
| `glyphInfos.w` | { `width`: `number` = 8; `x`: `number` = 48; `y`: `number` = 16 } |
| `glyphInfos.w.width` | `number` |
| `glyphInfos.w.x` | `number` |
| `glyphInfos.w.y` | `number` |
| `glyphInfos.x` | { `width`: `number` = 8; `x`: `number` = 56; `y`: `number` = 16 } |
| `glyphInfos.x.width` | `number` |
| `glyphInfos.x.x` | `number` |
| `glyphInfos.x.y` | `number` |
| `glyphInfos.y` | { `width`: `number` = 8; `x`: `number` = 0; `y`: `number` = 24 } |
| `glyphInfos.y.width` | `number` |
| `glyphInfos.y.x` | `number` |
| `glyphInfos.y.y` | `number` |
| `glyphInfos.z` | { `width`: `number` = 8; `x`: `number` = 8; `y`: `number` = 24 } |
| `glyphInfos.z.width` | `number` |
| `glyphInfos.z.x` | `number` |
| `glyphInfos.z.y` | `number` |
| `letterHeight` | `number` |
| `spaceWidth` | `number` |
| `spacing` | `number` |
| `textureHeight` | `number` |
| `textureWidth` | `number` |

#### Overrides

[Font](Font.md).[fontInfo](Font.md#fontinfo)

#### Defined in

[src/renderer/textRenderer.ts:270](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/textRenderer.ts#L270)

___

### src

• **src**: `string` = `'/engine_assets/fonts/default font.png'`

#### Overrides

[Font](Font.md).[src](Font.md#src)

#### Defined in

[src/renderer/textRenderer.ts:269](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/textRenderer.ts#L269)

___

### texture

• **texture**: [`Texture`](../modules.md#texture) = `null`

#### Inherited from

[Font](Font.md).[texture](Font.md#texture)

#### Defined in

[src/renderer/textRenderer.ts:221](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/textRenderer.ts#L221)

___

### fontName

▪ `Static` **fontName**: `string` = `'default'`

#### Overrides

[Font](Font.md).[fontName](Font.md#fontname)

#### Defined in

[src/renderer/textRenderer.ts:268](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/textRenderer.ts#L268)

## Methods

### getGlyphCoords

▸ **getGlyphCoords**(`glyph`): `number`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `glyph` | `string` |

#### Returns

`number`[]

#### Inherited from

[Font](Font.md).[getGlyphCoords](Font.md#getglyphcoords)

#### Defined in

[src/renderer/textRenderer.ts:242](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/textRenderer.ts#L242)

___

### getTexture

▸ **getTexture**(): [`Texture`](../modules.md#texture)

#### Returns

[`Texture`](../modules.md#texture)

#### Inherited from

[Font](Font.md).[getTexture](Font.md#gettexture)

#### Defined in

[src/renderer/textRenderer.ts:236](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/textRenderer.ts#L236)

___

### init

▸ `Static` **init**(): `void`

#### Returns

`void`

#### Inherited from

[Font](Font.md).[init](Font.md#init)

#### Defined in

[src/renderer/textRenderer.ts:231](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/textRenderer.ts#L231)
