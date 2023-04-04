[retro-engine](../README.md) / [Exports](../modules.md) / KeyStates

# Class: KeyStates
The KeyStates class is used to keep track of the state of the keyboard.

## Table of contents

### Properties

- [states](KeyStates.md#states)

### Methods

- [isPressed](KeyStates.md#ispressed)

## Properties

### states
The map of key states.

▪ `Static` `Private` **states**: `Map`<`string`, `boolean`\>

#### Defined in

[src/keyState.ts:2](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/keyState.ts#L2)

## Methods

### isPressed
Checks if a key is currently pressed.

▸ `Static` **isPressed**(`key`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`boolean`

#### Defined in

[src/keyState.ts:27](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/keyState.ts#L27)