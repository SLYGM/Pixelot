[retro-engine](../README.md) / [Exports](../modules.md) / SceneManager

# Class: SceneManager
Class that manages the scenes in the game. Can be used to switch between scenes, add entities and systems to scenes. It is also possible to pre-load scenes and prevent scenes from unloading, if you wish to quickly switch between them.

## Table of contents

### Properties

- [currentScene](SceneManager.md#currentscene)

### Methods

- [addEntityToScene](SceneManager.md#addentitytoscene)
- [addSystemToScene](SceneManager.md#addsystemtoscene)
- [getSceneNames](SceneManager.md#getscenenames)
- [preLoadScene](SceneManager.md#preloadscene)
- [switchToScene](SceneManager.md#switchtoscene)
- [unloadScene](SceneManager.md#unloadscene)

### currentScene

▪ `Static` **currentScene**: [`Scene`](Scene.md)

#### Defined in

[src/sceneManager.ts:18](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/sceneManager.ts#L18)

## Methods

### addEntityToScene

▸ `Static` **addEntityToScene**<`T`\>(`sceneName`, `entity`, `args?`): `void`

Add an entity to a specified scene in the scene manager

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GameObjectBase`](GameObjectBase.md)<`T`\> |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `sceneName` | `string` | `undefined` | name of scene to which entity is to be added |
| `entity` | `T` | `undefined` | entity obect to be added |
| `args` | `any`[] | `[]` | - |

#### Returns

`void`

#### Defined in

[src/sceneManager.ts:193](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/sceneManager.ts#L193)

___

### addSystemToScene

▸ `Static` **addSystemToScene**(`sceneName`, `system`, `priority`): `void`

Add a system to a specified scene in the scene manager

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sceneName` | `string` | name of scene to which system is to be added |
| `system` | [`System`](System.md) | system object to be added |
| `priority` | `number` | priority of system to be added |

#### Returns

`void`

#### Defined in

[src/sceneManager.ts:204](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/sceneManager.ts#L204)
___

### getSceneNames

▸ `Static` **getSceneNames**(): `string`[]

Gets an array of loaded scene names

#### Returns

`string`[]

array of strings of scene names

#### Defined in

[src/sceneManager.ts:31](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/sceneManager.ts#L31)
___

### preLoadScene

▸ `Static` **preLoadScene**(`scene_name`): `void`

Pre-load the scene with the given name, so that it can be quickly switched to later

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scene_name` | `string` | The name of the scene to load |

#### Returns

`void`

#### Defined in

[src/sceneManager.ts:74](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/sceneManager.ts#L74)

___

### switchToScene

▸ `Static` **switchToScene**(`scene_name`, `unload_current?`): `void`

Switches the current scene to the scene with the given name

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `scene_name` | `string` | `undefined` | The name of the scene to switch to |
| `unload_current` | `boolean` | `true` | Whether to unload the current scene |

#### Returns

`void`

#### Defined in

[src/sceneManager.ts:42](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/sceneManager.ts#L42)

___

### unloadScene

▸ `Static` **unloadScene**(`scene_name`): `void`

Unload the scene with the given name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scene_name` | `string` | name of the scene to unload |

#### Returns

`void`

#### Defined in

[src/sceneManager.ts:99](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/sceneManager.ts#L99)
