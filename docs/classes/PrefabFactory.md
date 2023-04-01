[retro-engine](../README.md) / [Exports](../modules.md) / PrefabFactory

# Class: PrefabFactory

## Table of contents

### Constructors

- [constructor](PrefabFactory.md#constructor)

### Properties

- [prefabs](PrefabFactory.md#prefabs)

### Methods

- [create](PrefabFactory.md#create)
- [getAllPrefabNames](PrefabFactory.md#getallprefabnames)
- [getPrefab](PrefabFactory.md#getprefab)
- [loadPrefab](PrefabFactory.md#loadprefab)

## Constructors

### constructor

• **new PrefabFactory**()

## Properties

### prefabs

▪ `Static` `Private` **prefabs**: `Map`<`string`, `Prefab`\>

#### Defined in

[src/prefabs.ts:55](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/prefabs.ts#L55)

## Methods

### create

▸ `Static` **create**(`prefab_name`, `name?`): [`GameObjectBase`](GameObjectBase.md)

Create a prefab instance with the given name and arguments. 
This function won't call the `onCreate` method, as this should be called by the scene.
**NOTE**: if using in editor, then make sure to use `PrefabFactory.loadPrefab` before calling this function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefab_name` | `string` | - |
| `name?` | `string` | name of the prefab to spawn |

#### Returns

[`GameObjectBase`](GameObjectBase.md)

Spawned entity instance

#### Defined in

[src/prefabs.ts:95](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/prefabs.ts#L95)

___

### getAllPrefabNames

▸ `Static` **getAllPrefabNames**(): `string`[]

#### Returns

`string`[]

list of all prefab names

#### Defined in

[src/prefabs.ts:73](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/prefabs.ts#L73)

___

### getPrefab

▸ `Static` **getPrefab**(`name`): `Prefab`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | name of the prefab |

#### Returns

`Prefab`

prefab instance, or null if not found

#### Defined in

[src/prefabs.ts:82](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/prefabs.ts#L82)

___

### loadPrefab

▸ `Static` **loadPrefab**(`path`): `void`

Loads a `.prefab` file into the prefab factory. This is used to spawn prefabs.
Use this function to load prefabs in the editor, before creating instances of them.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`void`

#### Defined in

[src/prefabs.ts:64](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/prefabs.ts#L64)
