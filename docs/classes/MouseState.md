[retro-engine](../README.md) / [Exports](../modules.md) / MouseState

# Class: MouseState

## Table of contents

### Constructors

- [constructor](MouseState.md#constructor)

### Properties

- [btns](MouseState.md#btns)
- [screen\_pos](MouseState.md#screen_pos)
- [world\_pos](MouseState.md#world_pos)

### Methods

- [handleMouseDown](MouseState.md#handlemousedown)
- [handleMouseMove](MouseState.md#handlemousemove)
- [handleMouseUp](MouseState.md#handlemouseup)
- [isPressed](MouseState.md#ispressed)
- [updatePos](MouseState.md#updatepos)

## Constructors

### constructor

• **new MouseState**()

## Properties

### btns

▪ `Static` `Private` **btns**: `Map`<`number`, `boolean`\>

#### Defined in

[src/mouseState.ts:7](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/mouseState.ts#L7)

___

### screen\_pos

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

▪ `Static` **world\_pos**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Defined in

[src/mouseState.ts:6](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/mouseState.ts#L6)

## Methods

### handleMouseDown

▸ `Static` `Private` **handleMouseDown**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `MouseEvent` |

#### Returns

`void`

#### Defined in

[src/mouseState.ts:51](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/mouseState.ts#L51)

___

### handleMouseMove

▸ `Static` `Private` **handleMouseMove**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `MouseEvent` |

#### Returns

`void`

#### Defined in

[src/mouseState.ts:31](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/mouseState.ts#L31)

___

### handleMouseUp

▸ `Static` `Private` **handleMouseUp**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `MouseEvent` |

#### Returns

`void`

#### Defined in

[src/mouseState.ts:47](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/mouseState.ts#L47)

___

### isPressed

▸ `Static` **isPressed**(`btn`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `btn` | `number` |

#### Returns

`boolean`

#### Defined in

[src/mouseState.ts:55](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/mouseState.ts#L55)

___

### updatePos

▸ `Static` `Private` **updatePos**(`x`, `y`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Returns

`void`

#### Defined in

[src/mouseState.ts:35](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/mouseState.ts#L35)
