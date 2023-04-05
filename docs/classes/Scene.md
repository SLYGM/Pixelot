[retro-engine](../README.md) / [Exports](../modules.md) / Scene

# Class: Scene
Class representing a scene. A scene is a collection of entities and systems.

## Table of contents

### Properties
- [name](Scene.md#name)

### Methods

- [addEntity](Scene.md#addentity)
- [addSystem](Scene.md#addsystem)
- [deleteEntity](Scene.md#deleteentity)
- [getEntities](Scene.md#getentities)
- [getEntitiesWithComponent](Scene.md#getentitieswithcomponent)
- [getEntity](Scene.md#getentity)
- [getSystems](Scene.md#getsystems)
- [hasSystem](Scene.md#hassystem)
- [removeSystem](Scene.md#removesystem)
- [renameEntity](Scene.md#renameentity)
- [spawnPrefab](Scene.md#spawnprefab)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Defined in

[src/scene.ts:22](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L22)

## Properties

### name
The name of the scene.

• **name**: `string`

#### Defined in

[src/scene.ts:20](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L20)

## Methods

### addEntity
Add an entity to the scene.

▸ **addEntity**<`T`\>(`entity`, `args?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GameObjectBase`](GameObjectBase.md)<`T`\> |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `entity` | `T` | `undefined` |
| `args` | `any`[] | `[]` |

#### Returns

`void`

#### Defined in

[src/scene.ts:55](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L55)

___

### addSystem
Manually add a system to the scene. The priority determines the order in which systems are updated. Systems with a higher priority are updated first. Systems with the same priority are updated in the order they were added.
> Generally, systems are added automatically when an entity with the required components is added to the scene.

▸ **addSystem**(`system`, `priority`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `system` | [`System`](System.md) |
| `priority` | `number` |

#### Returns

`void`

#### Defined in

[src/scene.ts:147](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L147)

___

### deleteEntity
Delete an entity from the scene.

▸ **deleteEntity**(`entity`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `GameObjectBase` |

#### Returns

`void`

#### Defined in

[src/scene.ts:111](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L111)

___

___

### deleteEntityByName
Delete an entity from the scene.

▸ **deleteEntityByName**(`name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`void`

#### Defined in

[src/scene.ts:102](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L102)

___

### getEntities
Get a map of all entities in the scene.

▸ **getEntities**(): `Map`<`string`, [`GameObjectBase`](GameObjectBase.md)\>

#### Returns

`Map`<`string`, [`GameObjectBase`](GameObjectBase.md)\>

#### Defined in

[src/scene.ts:42](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L42)

___

### getEntitiesWithComponent
Get a list of all entities with a specific component.

▸ **getEntitiesWithComponent**<`T`\>(`component`): [`GameObjectBase`](GameObjectBase.md)[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Component`](Component.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `component` | [`ComponentType`](../modules.md#componenttype)<`T`\> |

#### Returns

[`GameObjectBase`](GameObjectBase.md)[]

#### Defined in

[src/scene.ts:139](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L139)

___

### getEntity
Get an entity by name.

▸ **getEntity**(`name`): [`GameObjectBase`](GameObjectBase.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`GameObjectBase`](GameObjectBase.md)

#### Defined in

[src/scene.ts:89](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L89)

___

### getSystems
Get a list of all systems in the scene.

▸ **getSystems**(): [`SystemNode`](../modules.md#systemnode)[]

#### Returns

[`SystemNode`](../modules.md#systemnode)[]

#### Defined in

[src/scene.ts:46](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L46)

___

### hasSystem
Check if a system is in the scene.

▸ **hasSystem**(`system_name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `system_name` | `string` |

#### Returns

`boolean`

#### Defined in

[src/scene.ts:50](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L50)

___

### removeSystem
Remove a system from the scene.

▸ **removeSystem**(`system`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `system` | [`System`](System.md) |

#### Returns

`void`

#### Defined in

[src/scene.ts:163](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L163)

___

### renameEntity
Rename an entity in the scene.

▸ **renameEntity**(`old_name`, `new_name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `old_name` | `string` |
| `new_name` | `string` |

#### Returns

`void`

#### Defined in

[src/scene.ts:129](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L129)

___

### spawnPrefab
Spawn a prefab in the scene. The optional `name` parameter can be used to give the spawned entity a custom name, which can be used to access the entity by name through the `Scene` it is in.

▸ **spawnPrefab**(`prefab_name`, `args`, `name?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefab_name` | `string` |
| `args` | `any`[] |
| `name` | `string` |

#### Returns

`void`

#### Defined in

[src/scene.ts:81](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L81)
