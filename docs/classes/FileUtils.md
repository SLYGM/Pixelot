[retro-engine](../README.md) / [Exports](../modules.md) / FileUtils

# Class: FileUtils

## Table of contents

### Constructors

- [constructor](FileUtils.md#constructor)

### Methods

- [findFile](FileUtils.md#findfile)

## Constructors

### constructor

• **new FileUtils**()

## Methods

### findFile

▸ `Static` **findFile**(`name`, `startPath`): `string`

Find the path to the file with the given name in the given directory and its subdirectories.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | name of the file to find e.g. 'scene.json' |
| `startPath` | `string` | starting path of the search e.g. './projects/project1/' |

#### Returns

`string`

file path if found, null otherwise

#### Defined in

[src/utils/baseutils.ts:28](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/utils/baseutils.ts#L28)
