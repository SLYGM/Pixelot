[retro-engine](../README.md) / [Exports](../modules.md) / GameObjectBase

# Class: GameObjectBase

The base class inherited by all game objects.
> Note that when creating a game object, a proxy is returned which allows you to directly access entity components without having to use the `get` method. In the example below, the `Velocity` component is accessed directly.

**`Example`**

An example user-defined game object:
```js
class Player extends engine.GameObjectBase {
  static arg_names = ["Jump Speed"];
  static arg_types = [engine.Types.Number];

  times_jumped;
  onCreate(jump_speed) {
    this.jump_speed = jump_speed;
    this.times_jumped = 0;
  }
  update() {
    if (engine.KeyStates.isPressed("Space")) {
      this.Velocity.y = this.jump_speed;
      this.times_jumped++;
    }
  }
}
```

## Table of contents

### Constructors

- [constructor](GameObjectBase.md#constructor)

### Properties

- [name](GameObjectBase.md#name)
- [scene](GameObjectBase.md#scene)

### Methods

- [add](GameObjectBase.md#add)
- [get](GameObjectBase.md#get)
- [getAllComponents](GameObjectBase.md#getallcomponents)
- [getByName](GameObjectBase.md#getbyname)
- [has](GameObjectBase.md#has)
- [hasAll](GameObjectBase.md#hasall)
- [onCreate](GameObjectBase.md#oncreate)
- [onDelete](GameObjectBase.md#ondelete)
- [remove](GameObjectBase.md#remove)
- [removeByName](GameObjectBase.md#removebyname)
- [update](GameObjectBase.md#update)

## Constructors

### constructor

• **new GameObjectBase**(`name`)

Constructor which wraps the object in a proxy.
This allows the user to access the components directly.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the entity, used for retrieving an entity from a scene by name. |

#### Defined in

[src/ecs.ts:61](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/ecs.ts#L61)

## Properties
___

### name

• **name**: `string`

#### Defined in

[src/ecs.ts:54](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/ecs.ts#L54)

___

### scene

• **scene**: [`Scene`](Scene.md) = `null`

#### Defined in

[src/ecs.ts:55](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/ecs.ts#L55)

## Methods

### add

▸ **add**(`component`): [`GameObjectBase`](GameObjectBase.md)

Add a new component to the entity.
Returns itself allowing calls to be chained.

**`Example`**

```ts
entity.add(new Position(0, 0)).add(new Velocity(0, 0));
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `component` | [`Component`](Component.md) | The component to add |

#### Returns

[`GameObjectBase`](GameObjectBase.md)

#### Defined in

[src/ecs.ts:116](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/ecs.ts#L116)

___

### get

▸ **get**<`T`\>(`c`): `T`

Get the component instance of the given type.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Component`](Component.md)<`T`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `c` | [`ComponentType`](../modules.md#componenttype)<`T`\> | The type of the component to get. |

#### Returns

`T`

The component instance.

#### Defined in

[src/ecs.ts:140](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/ecs.ts#L140)

___

### getAllComponents

▸ **getAllComponents**(): `string`[]

Get the names of all components linked to this entity

#### Returns

`string`[]

All components linked to this entity

#### Defined in

[src/ecs.ts:158](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/ecs.ts#L158)

___

### getByName

▸ **getByName**(`name`): [`Component`](Component.md)

Get the component instance of the given component name, returns null if the component doesn't exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the component to get. |

#### Returns

[`Component`](Component.md)

The component instance.

#### Defined in

[src/ecs.ts:149](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/ecs.ts#L149)

___

### has

▸ **has**<`T`\>(`c`): `boolean`

Returns true if the entity has the given component.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Component`](Component.md)<`T`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `c` | [`ComponentType`](../modules.md#componenttype)<`T`\> | The type of the component to check. |

#### Returns

`boolean`

True if the entity has the component.

#### Defined in

[src/ecs.ts:168](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/ecs.ts#L168)

___

### hasAll

▸ **hasAll**(`components`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `components` | `any`[] |

#### Returns

`boolean`

#### Defined in

[src/ecs.ts:173](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/ecs.ts#L173)

___

### onCreate

▸ `Abstract` **onCreate**(`...args`): `void`

User-defined function that is called when the entity is added to a scene, after all components have been created (if using a editor created entity, or prefab entity).

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`void`

#### Defined in

[src/ecs.ts:95](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/ecs.ts#L95)

___

### onDelete

▸ **onDelete**(): `void`

User-defined function that is called when the entity is deleted.

#### Returns

`void`

#### Defined in

[src/ecs.ts:100](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/ecs.ts#L100)

___

### remove

Remove a component from the entity.

▸ **remove**<`T`\>(`c`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Component`](Component.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `c` | [`ComponentType`](../modules.md#componenttype)<`T`\> |

#### Returns

`void`

#### Defined in

[src/ecs.ts:179](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/ecs.ts#L179)

___

### removeByName
Remove a component from the entity by its name.

▸ **removeByName**(`name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`void`

#### Defined in

[src/ecs.ts:183](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/ecs.ts#L183)
___

### update

▸ **update**(): `void`

User-defined function that is called every frame.

#### Returns

`void`

#### Defined in

[src/ecs.ts:105](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/ecs.ts#L105)
