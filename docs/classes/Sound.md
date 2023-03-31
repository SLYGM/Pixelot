[retro-engine](../README.md) / [Exports](../modules.md) / Sound

# Class: Sound

## Table of contents

### Constructors

- [constructor](Sound.md#constructor)

### Properties

- [buffer](Sound.md#buffer)
- [gain](Sound.md#gain)
- [panner](Sound.md#panner)

### Methods

- [getAudioFile](Sound.md#getaudiofile)
- [play](Sound.md#play)

## Constructors

### constructor

• **new Sound**(`filepath`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filepath` | `string` |

#### Defined in

[src/audio.ts:14](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/audio.ts#L14)

## Properties

### buffer

• `Private` **buffer**: `AudioBuffer`

#### Defined in

[src/audio.ts:10](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/audio.ts#L10)

___

### gain

• `Private` **gain**: `GainNode`

#### Defined in

[src/audio.ts:11](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/audio.ts#L11)

___

### panner

• `Private` **panner**: `StereoPannerNode`

#### Defined in

[src/audio.ts:12](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/audio.ts#L12)

## Methods

### getAudioFile

▸ `Private` **getAudioFile**(`filepath`): `Promise`<`AudioBuffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `filepath` | `string` |

#### Returns

`Promise`<`AudioBuffer`\>

#### Defined in

[src/audio.ts:26](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/audio.ts#L26)

___

### play

▸ **play**(`gain?`, `pan?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `gain` | `number` | `1` |
| `pan` | `number` | `0` |

#### Returns

`void`

#### Defined in

[src/audio.ts:30](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/audio.ts#L30)
