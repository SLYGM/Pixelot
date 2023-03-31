[retro-engine](../README.md) / [Exports](../modules.md) / Component

# Class: Component

## Table of contents

### Constructors

- [constructor](Component.md#constructor)

### Properties

- [dependencies](Component.md#dependencies)
- [owner](Component.md#owner)

### Methods

- [\_create](Component.md#_create)
- [\_delete](Component.md#_delete)
- [onCreate](Component.md#oncreate)
- [onDelete](Component.md#ondelete)
- [registerOwner](Component.md#registerowner)

## Constructors

### constructor

• **new Component**()

## Properties

### dependencies

• **dependencies**: `any`[] = `[]`

The list of components that this component depends on.
E.g. Velocity depends on Position.

#### Defined in

[src/ecs.ts:8](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/ecs.ts#L8)

___

### owner

• **owner**: [`GameObjectBase`](GameObjectBase.md)

#### Defined in

[src/ecs.ts:9](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/ecs.ts#L9)

## Methods

### \_create

▸ **_create**(): `void`

#### Returns

`void`

#### Defined in

[src/ecs.ts:15](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/ecs.ts#L15)

___

### \_delete

▸ **_delete**(): `void`

#### Returns

`void`

#### Defined in

[src/ecs.ts:19](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/ecs.ts#L19)

___

### onCreate

▸ **onCreate**(): `void`

#### Returns

`void`

#### Defined in

[src/ecs.ts:24](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/ecs.ts#L24)

___

### onDelete

▸ **onDelete**(): `void`

#### Returns

`void`

#### Defined in

[src/ecs.ts:26](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/ecs.ts#L26)

___

### registerOwner

▸ **registerOwner**(`owner`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | [`GameObjectBase`](GameObjectBase.md) |

#### Returns

`void`

#### Defined in

[src/ecs.ts:11](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/ecs.ts#L11)
