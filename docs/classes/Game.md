[retro-engine](../README.md) / [Exports](../modules.md) / Game

# Class: Game

## Table of contents

### Constructors

- [constructor](Game.md#constructor)

### Properties

- [isDevMode](Game.md#isdevmode)
- [project\_name](Game.md#project_name)
- [render\_only](Game.md#render_only)
- [running](Game.md#running)
- [start\_scene](Game.md#start_scene)
- [time](Game.md#time)
- [updateQueue](Game.md#updatequeue)

### Methods

- [addToUpdateQueue](Game.md#addtoupdatequeue)
- [gameloop](Game.md#gameloop)
- [loadGame](Game.md#loadgame)
- [loadShaders](Game.md#loadshaders)
- [loadTextures](Game.md#loadtextures)
- [start](Game.md#start)
- [stop](Game.md#stop)

## Constructors

### constructor

• **new Game**()

## Properties

### isDevMode

▪ `Static` **isDevMode**: `boolean` = `true`

#### Defined in

[src/gameloop.ts:22](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/gameloop.ts#L22)

___

### project\_name

▪ `Static` **project\_name**: `string`

#### Defined in

[src/gameloop.ts:23](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/gameloop.ts#L23)

___

### render\_only

▪ `Static` **render\_only**: `boolean` = `false`

#### Defined in

[src/gameloop.ts:19](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/gameloop.ts#L19)

___

### running

▪ `Static` **running**: `boolean` = `true`

#### Defined in

[src/gameloop.ts:18](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/gameloop.ts#L18)

___

### start\_scene

▪ `Static` **start\_scene**: `string`

#### Defined in

[src/gameloop.ts:21](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/gameloop.ts#L21)

___

### time

▪ `Static` **time**: `number` = `0`

#### Defined in

[src/gameloop.ts:20](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/gameloop.ts#L20)

___

### updateQueue

▪ `Static` **updateQueue**: [`Updatable`](../modules.md#updatable)[]

#### Defined in

[src/gameloop.ts:17](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/gameloop.ts#L17)

## Methods

### addToUpdateQueue

▸ `Static` **addToUpdateQueue**(`object`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | [`Updatable`](../modules.md#updatable) |

#### Returns

`void`

#### Defined in

[src/gameloop.ts:37](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/gameloop.ts#L37)

___

### gameloop

▸ `Static` `Private` **gameloop**(`t`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `t` | `number` |

#### Returns

`void`

#### Defined in

[src/gameloop.ts:41](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/gameloop.ts#L41)

___

### loadGame

▸ `Static` **loadGame**(`project_dir?`): `void`

Load a project from a project json file

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `project_dir?` | `string` | (optional) The path to the root of the project (containing the .proj file). Required for projects loaded via the UI, but not for built projects. |

#### Returns

`void`

#### Defined in

[src/gameloop.ts:61](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/gameloop.ts#L61)

___

### loadShaders

▸ `Static` `Private` **loadShaders**(`shaders`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `shaders` | { `args`: `any`[] ; `name`: `string`  }[] |

#### Returns

`void`

#### Defined in

[src/gameloop.ts:92](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/gameloop.ts#L92)

___

### loadTextures

▸ `Static` `Private` **loadTextures**(`textures`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `textures` | { `name`: `string` ; `path`: `string`  }[] |

#### Returns

`void`

#### Defined in

[src/gameloop.ts:86](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/gameloop.ts#L86)

___

### start

▸ `Static` **start**(`render_only?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `render_only` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[src/gameloop.ts:29](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/gameloop.ts#L29)

___

### stop

▸ `Static` **stop**(): `void`

#### Returns

`void`

#### Defined in

[src/gameloop.ts:100](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/gameloop.ts#L100)
