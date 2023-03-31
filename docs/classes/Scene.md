[retro-engine](../README.md) / [Exports](../modules.md) / Scene

# Class: Scene

## Table of contents

### Constructors

- [constructor](Scene.md#constructor)

### Properties

- [added\_systems](Scene.md#added_systems)
- [dt](Scene.md#dt)
- [entities](Scene.md#entities)
- [name](Scene.md#name)
- [systems](Scene.md#systems)

### Methods

- [addEntity](Scene.md#addentity)
- [addSystem](Scene.md#addsystem)
- [deleteEntity](Scene.md#deleteentity)
- [destroy](Scene.md#destroy)
- [getEntities](Scene.md#getentities)
- [getEntitiesWithComponent](Scene.md#getentitieswithcomponent)
- [getEntity](Scene.md#getentity)
- [getSystems](Scene.md#getsystems)
- [hasSystem](Scene.md#hassystem)
- [onPause](Scene.md#onpause)
- [onResume](Scene.md#onresume)
- [removeSystem](Scene.md#removesystem)
- [renameEntity](Scene.md#renameentity)
- [spawnPrefab](Scene.md#spawnprefab)
- [update](Scene.md#update)

## Constructors

### constructor

• **new Scene**(`name`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Defined in

[src/scene.ts:22](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L22)

## Properties

### added\_systems

• `Private` **added\_systems**: `Map`<`string`, `boolean`\>

#### Defined in

[src/scene.ts:16](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L16)

___

### dt

• **dt**: `number`

#### Defined in

[src/scene.ts:19](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L19)

___

### entities

• `Private` **entities**: `Map`<`string`, [`GameObjectBase`](GameObjectBase.md)\>

#### Defined in

[src/scene.ts:13](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L13)

___

### name

• **name**: `string`

#### Defined in

[src/scene.ts:20](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L20)

___

### systems

• `Private` **systems**: [`SystemNode`](../modules.md#systemnode)[]

#### Defined in

[src/scene.ts:15](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L15)

## Methods

### addEntity

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

▸ **addSystem**(`system`, `priority`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `system` | [`System`](System.md) |
| `priority` | `number` |

#### Returns

`void`

#### Defined in

[src/scene.ts:123](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L123)

___

### deleteEntity

▸ **deleteEntity**(`name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`void`

#### Defined in

[src/scene.ts:94](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L94)

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Defined in

[src/scene.ts:30](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L30)

___

### getEntities

▸ **getEntities**(): `Map`<`string`, [`GameObjectBase`](GameObjectBase.md)\>

#### Returns

`Map`<`string`, [`GameObjectBase`](GameObjectBase.md)\>

#### Defined in

[src/scene.ts:42](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L42)

___

### getEntitiesWithComponent

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

[src/scene.ts:115](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L115)

___

### getEntity

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

▸ **getSystems**(): [`SystemNode`](../modules.md#systemnode)[]

#### Returns

[`SystemNode`](../modules.md#systemnode)[]

#### Defined in

[src/scene.ts:46](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L46)

___

### hasSystem

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

### onPause

▸ **onPause**(): `void`

#### Returns

`void`

#### Defined in

[src/scene.ts:38](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L38)

___

### onResume

▸ **onResume**(): `void`

#### Returns

`void`

#### Defined in

[src/scene.ts:40](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L40)

___

### removeSystem

▸ **removeSystem**(`system`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `system` | [`System`](System.md) |

#### Returns

`void`

#### Defined in

[src/scene.ts:139](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L139)

___

### renameEntity

▸ **renameEntity**(`old_name`, `new_name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `old_name` | `string` |
| `new_name` | `string` |

#### Returns

`void`

#### Defined in

[src/scene.ts:105](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L105)

___

### spawnPrefab

▸ **spawnPrefab**(`prefab_name`, `args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefab_name` | `string` |
| `args` | `any`[] |

#### Returns

`void`

#### Defined in

[src/scene.ts:81](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L81)

___

### update

▸ **update**(): `void`

#### Returns

`void`

#### Defined in

[src/scene.ts:144](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/scene.ts#L144)
