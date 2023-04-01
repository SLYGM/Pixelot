[retro-engine](../README.md) / [Exports](../modules.md) / MouseState

# Class: MouseState
Class for handling mouse input.

## Table of contents

### Properties

- [btns](MouseState.md#btns)
- [screen\_pos](MouseState.md#screen_pos)
- [world\_pos](MouseState.md#world_pos)

### Methods
- [isPressed](MouseState.md#ispressed)

## Properties

### btns
The map of mouse button states.

▪ `Static` `Private` **btns**: `Map`<`number`, `boolean`\>

#### Defined in

[src/mouseState.ts:7](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/mouseState.ts#L7)

___

### screen\_pos
The position of the mouse on the screen, relative to the top-left corner.

▪ `Static` **screen\_pos**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Defined in

[src/mouseState.ts:5](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/mouseState.ts#L5)

___

### world\_pos
The position of the mouse in the world.

▪ `Static` **world\_pos**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Defined in

[src/mouseState.ts:6](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/mouseState.ts#L6)

## Methods

### isPressed
Checks if a mouse button is currently pressed.

▸ `Static` **isPressed**(`btn`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `btn` | `number` |

#### Returns

`boolean`

#### Defined in

[src/mouseState.ts:55](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/mouseState.ts#L55)