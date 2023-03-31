[retro-engine](../README.md) / [Exports](../modules.md) / Component

# Class: Component
The base class inhgerited by all user-defined components.  

**`Example`**

An example user-defined component:
```js
class Position extends engine.Component {
  static arg_names = ["x", "y"];
  static arg_types = [engine.Types.Number, engine.Types.Number];
  x;
  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distanceTo(other) {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
  }
}
```

## Table of contents

### Constructors

- [constructor](Component.md#constructor)

### Properties

- [dependencies](Component.md#dependencies)
- [owner](Component.md#owner)

### Methods
- [onCreate](Component.md#oncreate)
- [onDelete](Component.md#ondelete)

## Constructors

### constructor
The constructor can be freely overridden to add any desired arguments, **as long as these are reflected in the `arg_types` and `arg_names`**.

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
The entity that owns this component.

• **owner**: [`GameObjectBase`](GameObjectBase.md)

#### Defined in

[src/ecs.ts:9](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/ecs.ts#L9)

## Methods

### onCreate
This method is called once the owner of the component has been added to a scene, so some operations can only be performed here rather than in the constructor, for example if you wanted to access the `this.owner.scene` property.

▸ **onCreate**(): `void`

#### Returns

`void`

#### Defined in

[src/ecs.ts:24](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/ecs.ts#L24)

___

### onDelete
Called when the component is removed, or the owner is deleted.

▸ **onDelete**(): `void`

#### Returns

`void`

#### Defined in

[src/ecs.ts:26](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/ecs.ts#L26)