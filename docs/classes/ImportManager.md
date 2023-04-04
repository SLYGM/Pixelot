[retro-engine](../README.md) / [Exports](../modules.md) / ImportManager

# Class: ImportManager

## Table of contents

### Constructors

- [constructor](ImportManager.md#constructor)

### Properties

- [cached\_imports](ImportManager.md#cached_imports)
- [components](ImportManager.md#components)
- [entities](ImportManager.md#entities)
- [shaders](ImportManager.md#shaders)
- [systems](ImportManager.md#systems)

### Methods

- [getAllComponents](ImportManager.md#getallcomponents)
- [getAllEntities](ImportManager.md#getallentities)
- [getComponent](ImportManager.md#getcomponent)
- [getEntity](ImportManager.md#getentity)
- [getFilePaths](ImportManager.md#getfilepaths)
- [getMapFromImport](ImportManager.md#getmapfromimport)
- [getRecord](ImportManager.md#getrecord)
- [getScriptTypeFromImport](ImportManager.md#getscripttypefromimport)
- [getShader](ImportManager.md#getshader)
- [getSystem](ImportManager.md#getsystem)
- [hasComponent](ImportManager.md#hascomponent)
- [hasEntity](ImportManager.md#hasentity)
- [hasShader](ImportManager.md#hasshader)
- [hasSystem](ImportManager.md#hassystem)
- [importGameScripts](ImportManager.md#importgamescripts)
- [importProjectScripts](ImportManager.md#importprojectscripts)
- [importScript](ImportManager.md#importscript)
- [removeScript](ImportManager.md#removescript)

## Constructors

### constructor

• **new ImportManager**()

## Properties

### cached\_imports

▪ `Static` `Private` **cached\_imports**: `Map`<`string`, `ImportRecord`\>

#### Defined in

[src/importManager.ts:60](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/importManager.ts#L60)

___

### components

▪ `Static` `Private` **components**: `Map`<`string`, `TypedConstructor`<[`Component`](Component.md)\>\>

#### Defined in

[src/importManager.ts:55](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/importManager.ts#L55)

___

### entities

▪ `Static` `Private` **entities**: `Map`<`string`, `TypedConstructor`<[`GameObjectBase`](GameObjectBase.md)\>\>

#### Defined in

[src/importManager.ts:57](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/importManager.ts#L57)

___

### shaders

▪ `Static` `Private` **shaders**: `Map`<`string`, `TypedConstructor`<[`PostProcess`](PostProcess.md)\>\>

#### Defined in

[src/importManager.ts:58](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/importManager.ts#L58)

___

### systems

▪ `Static` `Private` **systems**: `Map`<`string`, `TypedConstructor`<[`System`](System.md)\>\>

#### Defined in

[src/importManager.ts:56](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/importManager.ts#L56)

## Methods

### getAllComponents

▸ `Static` **getAllComponents**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/importManager.ts:232](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/importManager.ts#L232)

___

### getAllEntities

▸ `Static` **getAllEntities**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/importManager.ts:253](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/importManager.ts#L253)

___

### getComponent

▸ `Static` **getComponent**(`component`): `TypedConstructor`<[`Component`](Component.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `component` | `string` |

#### Returns

`TypedConstructor`<[`Component`](Component.md)\>

#### Defined in

[src/importManager.ts:223](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/importManager.ts#L223)

___

### getEntity

▸ `Static` **getEntity**(`entity`): `TypedConstructor`<[`GameObjectBase`](GameObjectBase.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `string` |

#### Returns

`TypedConstructor`<[`GameObjectBase`](GameObjectBase.md)\>

#### Defined in

[src/importManager.ts:245](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/importManager.ts#L245)

___

### getFilePaths

▸ `Static` **getFilePaths**(`srcPath`): `ProjectFiles`

#### Parameters

| Name | Type |
| :------ | :------ |
| `srcPath` | `string` |

#### Returns

`ProjectFiles`

#### Defined in

[src/importManager.ts:62](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/importManager.ts#L62)

___

### getMapFromImport

▸ `Static` **getMapFromImport**(`imp`): `Map`<`string`, `TypedConstructor`<[`Component`](Component.md)\>\> \| `Map`<`string`, `TypedConstructor`<[`System`](System.md)\>\> \| `Map`<`string`, `TypedConstructor`<[`GameObjectBase`](GameObjectBase.md)\>\> \| `Map`<`string`, `TypedConstructor`<[`PostProcess`](PostProcess.md)\>\>

Get the relevant import map for an import. i.e. if the default import is a component, then return the component map.

#### Parameters

| Name | Type |
| :------ | :------ |
| `imp` | `any` |

#### Returns

`Map`<`string`, `TypedConstructor`<[`Component`](Component.md)\>\> \| `Map`<`string`, `TypedConstructor`<[`System`](System.md)\>\> \| `Map`<`string`, `TypedConstructor`<[`GameObjectBase`](GameObjectBase.md)\>\> \| `Map`<`string`, `TypedConstructor`<[`PostProcess`](PostProcess.md)\>\>

#### Defined in

[src/importManager.ts:104](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/importManager.ts#L104)

___

### getRecord

▸ `Static` **getRecord**(`script`): `ImportRecord`

#### Parameters

| Name | Type |
| :------ | :------ |
| `script` | `string` |

#### Returns

`ImportRecord`

#### Defined in

[src/importManager.ts:189](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/importManager.ts#L189)

___

### getScriptTypeFromImport

▸ `Static` **getScriptTypeFromImport**(`imp`): ``"component"`` \| ``"system"`` \| ``"entity"`` \| ``"shader"``

#### Parameters

| Name | Type |
| :------ | :------ |
| `imp` | `any` |

#### Returns

``"component"`` \| ``"system"`` \| ``"entity"`` \| ``"shader"``

#### Defined in

[src/importManager.ts:119](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/importManager.ts#L119)

___

### getShader

▸ `Static` **getShader**(`shader`): `TypedConstructor`<[`PostProcess`](PostProcess.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `shader` | `string` |

#### Returns

`TypedConstructor`<[`PostProcess`](PostProcess.md)\>

#### Defined in

[src/importManager.ts:257](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/importManager.ts#L257)

___

### getSystem

▸ `Static` **getSystem**(`system`): `TypedConstructor`<[`System`](System.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `system` | `string` |

#### Returns

`TypedConstructor`<[`System`](System.md)\>

#### Defined in

[src/importManager.ts:236](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/importManager.ts#L236)

___

### hasComponent

▸ `Static` **hasComponent**(`component`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `component` | `string` |

#### Returns

`boolean`

#### Defined in

[src/importManager.ts:229](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/importManager.ts#L229)

___

### hasEntity

▸ `Static` **hasEntity**(`entity`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `string` |

#### Returns

`boolean`

#### Defined in

[src/importManager.ts:250](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/importManager.ts#L250)

___

### hasShader

▸ `Static` **hasShader**(`shader`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `shader` | `string` |

#### Returns

`boolean`

#### Defined in

[src/importManager.ts:262](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/importManager.ts#L262)

___

### hasSystem

▸ `Static` **hasSystem**(`system`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `system` | `string` |

#### Returns

`boolean`

#### Defined in

[src/importManager.ts:241](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/importManager.ts#L241)

___

### importGameScripts

▸ `Static` **importGameScripts**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/importManager.ts:194](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/importManager.ts#L194)

___

### importProjectScripts

▸ `Static` **importProjectScripts**(`project`, `mode?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `project` | `string` | `undefined` |
| `mode` | `string` | `"dev"` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/importManager.ts:133](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/importManager.ts#L133)

___

### importScript

▸ `Static` **importScript**(`project`, `script`, `mode?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `project` | `string` | `undefined` |
| `script` | `string` | `undefined` |
| `mode` | `string` | `"dev"` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/importManager.ts:155](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/importManager.ts#L155)

___

### removeScript

▸ `Static` **removeScript**(`script`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `script` | `string` |

#### Returns

`void`

#### Defined in

[src/importManager.ts:181](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/importManager.ts#L181)
