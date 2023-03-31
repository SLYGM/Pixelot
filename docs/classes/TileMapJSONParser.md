[retro-engine](../README.md) / [Exports](../modules.md) / TileMapJSONParser

# Class: TileMapJSONParser

## Table of contents

### Constructors

- [constructor](TileMapJSONParser.md#constructor)

### Methods

- [parse](TileMapJSONParser.md#parse)
- [parseObjectLayer](TileMapJSONParser.md#parseobjectlayer)
- [parseTileLayer](TileMapJSONParser.md#parsetilelayer)
- [parseTileSet](TileMapJSONParser.md#parsetileset)

## Constructors

### constructor

• **new TileMapJSONParser**()

## Methods

### parse

▸ `Static` **parse**(`json_path`): `TileMapLayer`

Parse a tilemap object from a `.json` file, exported from Tiled (https://www.mapeditor.org/).  
In order to export in the correct format, ensure that the tilesets are embedded in the `json` file (can be toggled when opening a tileset in Tiled).   
Additionally, make sure to export it directly into the projects directory, as Tiled will configure the paths to the tilesets relative to the `json` file.  
As such, also make sure that the tileset images are being stored within the projects directory.  
**This means that if you want to move the location of the tilemap `.json` you should delete it and re-export from Tiled to ensure the relative paths stay valid**

This function supports arbitrary layers and tilesets, but won't support any custom properties, or transparency colours set in Tiled.
In order to add transparency, make tilesets with transparent backgrounds in an image editor, and then export them as `.png` files.

To retrieve objects from the object layer, use the `getObject` function of the `TileMapObjectLayer` class. 
To retrieve an object layer from the tilemap, use the `getObjectLayer` function of the `TileMapLayer` class.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json_path` | `string` | path to the json file |

#### Returns

`TileMapLayer`

a new TileMapLayer object, if the json file is valid

#### Defined in

[src/renderer/tilemap.ts:265](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/tilemap.ts#L265)

___

### parseObjectLayer

▸ `Static` `Private` **parseObjectLayer**(`layer`): `TileMapObjectLayer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | `any` |

#### Returns

`TileMapObjectLayer`

#### Defined in

[src/renderer/tilemap.ts:318](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/tilemap.ts#L318)

___

### parseTileLayer

▸ `Static` `Private` **parseTileLayer**(`layer`): `TileMapSubLayer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | `any` |

#### Returns

`TileMapSubLayer`

#### Defined in

[src/renderer/tilemap.ts:305](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/tilemap.ts#L305)

___

### parseTileSet

▸ `Static` `Private` **parseTileSet**(`tileset`, `json_path`): `TileSet`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tileset` | `any` |
| `json_path` | `string` |

#### Returns

`TileSet`

#### Defined in

[src/renderer/tilemap.ts:335](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/tilemap.ts#L335)
