[retro-engine](../README.md) / [Exports](../modules.md) / AutoMap

# Class: AutoMap<K, V\>

## Type parameters

| Name |
| :------ |
| `K` |
| `V` |

## Hierarchy

- `Map`<`K`, `V`\>

  ↳ **`AutoMap`**

## Table of contents

### Constructors

- [constructor](AutoMap.md#constructor)

### Properties

- [[toStringTag]](AutoMap.md#[tostringtag])
- [factory](AutoMap.md#factory)
- [size](AutoMap.md#size)
- [[species]](AutoMap.md#[species])

### Methods

- [[iterator]](AutoMap.md#[iterator])
- [clear](AutoMap.md#clear)
- [delete](AutoMap.md#delete)
- [entries](AutoMap.md#entries)
- [forEach](AutoMap.md#foreach)
- [get](AutoMap.md#get)
- [has](AutoMap.md#has)
- [keys](AutoMap.md#keys)
- [set](AutoMap.md#set)
- [values](AutoMap.md#values)

## Constructors

### constructor

• **new AutoMap**<`K`, `V`\>(`factory`)

#### Type parameters

| Name |
| :------ |
| `K` |
| `V` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `factory` | (`key`: `K`) => `V` |

#### Overrides

Map&lt;K, V\&gt;.constructor

#### Defined in

[src/utils/baseutils.ts:53](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/utils/baseutils.ts#L53)

## Properties

### [toStringTag]

• `Readonly` **[toStringTag]**: `string`

#### Inherited from

Map.\_\_@toStringTag@191

#### Defined in

../../../../../../Tools/nvm/v18.12.1/node_modules/typedoc/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:137

___

### factory

• `Private` **factory**: (`key`: `K`) => `V`

#### Type declaration

▸ (`key`): `V`

##### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |

##### Returns

`V`

#### Defined in

[src/utils/baseutils.ts:53](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/utils/baseutils.ts#L53)

___

### size

• `Readonly` **size**: `number`

#### Inherited from

Map.size

#### Defined in

../../../../../../Tools/nvm/v18.12.1/node_modules/typedoc/node_modules/typescript/lib/lib.es2015.collection.d.ts:46

___

### [species]

▪ `Static` `Readonly` **[species]**: `MapConstructor`

#### Inherited from

Map.\_\_@species@238

#### Defined in

../../../../../../Tools/nvm/v18.12.1/node_modules/typedoc/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:319

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`<[`K`, `V`]\>

Returns an iterable of entries in the map.

#### Returns

`IterableIterator`<[`K`, `V`]\>

#### Inherited from

Map.\_\_@iterator@56

#### Defined in

../../../../../../Tools/nvm/v18.12.1/node_modules/typedoc/node_modules/typescript/lib/lib.es2015.iterable.d.ts:119

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Inherited from

Map.clear

#### Defined in

../../../../../../Tools/nvm/v18.12.1/node_modules/typedoc/node_modules/typescript/lib/lib.es2015.collection.d.ts:21

___

### delete

▸ **delete**(`key`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |

#### Returns

`boolean`

true if an element in the Map existed and has been removed, or false if the element does not exist.

#### Inherited from

Map.delete

#### Defined in

../../../../../../Tools/nvm/v18.12.1/node_modules/typedoc/node_modules/typescript/lib/lib.es2015.collection.d.ts:25

___

### entries

▸ **entries**(): `IterableIterator`<[`K`, `V`]\>

Returns an iterable of key, value pairs for every entry in the map.

#### Returns

`IterableIterator`<[`K`, `V`]\>

#### Inherited from

Map.entries

#### Defined in

../../../../../../Tools/nvm/v18.12.1/node_modules/typedoc/node_modules/typescript/lib/lib.es2015.iterable.d.ts:124

___

### forEach

▸ **forEach**(`callbackfn`, `thisArg?`): `void`

Executes a provided function once per each key/value pair in the Map, in insertion order.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callbackfn` | (`value`: `V`, `key`: `K`, `map`: `Map`<`K`, `V`\>) => `void` |
| `thisArg?` | `any` |

#### Returns

`void`

#### Inherited from

Map.forEach

#### Defined in

../../../../../../Tools/nvm/v18.12.1/node_modules/typedoc/node_modules/typescript/lib/lib.es2015.collection.d.ts:29

___

### get

▸ **get**(`key`): `V`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |

#### Returns

`V`

#### Overrides

Map.get

#### Defined in

[src/utils/baseutils.ts:57](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/utils/baseutils.ts#L57)

___

### has

▸ **has**(`key`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |

#### Returns

`boolean`

boolean indicating whether an element with the specified key exists or not.

#### Inherited from

Map.has

#### Defined in

../../../../../../Tools/nvm/v18.12.1/node_modules/typedoc/node_modules/typescript/lib/lib.es2015.collection.d.ts:38

___

### keys

▸ **keys**(): `IterableIterator`<`K`\>

Returns an iterable of keys in the map

#### Returns

`IterableIterator`<`K`\>

#### Inherited from

Map.keys

#### Defined in

../../../../../../Tools/nvm/v18.12.1/node_modules/typedoc/node_modules/typescript/lib/lib.es2015.iterable.d.ts:129

___

### set

▸ **set**(`key`, `value`): [`AutoMap`](AutoMap.md)<`K`, `V`\>

Adds a new element with a specified key and value to the Map. If an element with the same key already exists, the element will be updated.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |
| `value` | `V` |

#### Returns

[`AutoMap`](AutoMap.md)<`K`, `V`\>

#### Inherited from

Map.set

#### Defined in

../../../../../../Tools/nvm/v18.12.1/node_modules/typedoc/node_modules/typescript/lib/lib.es2015.collection.d.ts:42

___

### values

▸ **values**(): `IterableIterator`<`V`\>

Returns an iterable of values in the map

#### Returns

`IterableIterator`<`V`\>

#### Inherited from

Map.values

#### Defined in

../../../../../../Tools/nvm/v18.12.1/node_modules/typedoc/node_modules/typescript/lib/lib.es2015.iterable.d.ts:134
