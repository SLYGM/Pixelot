[retro-engine](../README.md) / [Exports](../modules.md) / System

# Class: System
Represents a system that acts on a specific component. Systems are added automatically to the engine when a component is added to an entity.
> Note that currently for a system to be added automatically its name must be the same as the component it acts on.

**`Example`**

An example user-defined game object:
```js

import VelocityComponent from "./VelocityComponent.js";
class Velocity extends engine.System {
  static arg_names = [];
  static arg_types = [];
  component = VelocityComponent;
  
  update(entities) {
    entities.forEach(entity => {
        entity.Position.x += entity.Velocity.x;
        entity.Position.y += entity.Velocity.y;
    });
  }
}
```


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
The constructor function can be freely overridden and additional properties can be added to the system, **as long as the `arg_names` and `arg_types` are updated accordingly**.

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
