[retro-engine](../README.md) / [Exports](../modules.md) / System

# Class: System

## Table of contents

### Constructors

- [constructor](System.md#constructor)

### Properties

- [component](System.md#component)

### Methods

- [update](System.md#update)

## Constructors

### constructor

• **new System**()

## Properties

### component

• `Abstract` **component**: [`ComponentType`](../modules.md#componenttype)<[`Component`](Component.md)\>

The component that this system acts on.

#### Defined in

[src/ecs.ts:205](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/ecs.ts#L205)

## Methods

### update

▸ `Abstract` **update**(`entities`): `void`

This function is run once per frame.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entities` | `Set`<[`GameObjectBase`](GameObjectBase.md)\> | The list of entities that the system acts on. |

#### Returns

`void`

#### Defined in

[src/ecs.ts:211](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/ecs.ts#L211)
