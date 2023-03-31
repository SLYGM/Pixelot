[retro-engine](../README.md) / [Exports](../modules.md) / KeyStates

# Class: KeyStates

## Table of contents

### Constructors

- [constructor](KeyStates.md#constructor)

### Properties

- [states](KeyStates.md#states)

### Methods

- [isPressed](KeyStates.md#ispressed)
- [keyDownHandler](KeyStates.md#keydownhandler)
- [keyUpHandler](KeyStates.md#keyuphandler)

## Constructors

### constructor

• **new KeyStates**()

## Properties

### states

▪ `Static` `Private` **states**: `Map`<`string`, `boolean`\>

#### Defined in

[src/keyState.ts:2](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/keyState.ts#L2)

## Methods

### isPressed

▸ `Static` **isPressed**(`key`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`boolean`

#### Defined in

[src/keyState.ts:27](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/keyState.ts#L27)

___

### keyDownHandler

▸ `Static` **keyDownHandler**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `KeyboardEvent` |

#### Returns

`void`

#### Defined in

[src/keyState.ts:19](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/keyState.ts#L19)

___

### keyUpHandler

▸ `Static` **keyUpHandler**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `KeyboardEvent` |

#### Returns

`void`

#### Defined in

[src/keyState.ts:23](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/keyState.ts#L23)
