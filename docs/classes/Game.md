[retro-engine](../README.md) / [Exports](../modules.md) / Game

# Class: Game
The game class is the main class responsible for running a game in Pixelot. It can be used to check the elapsed time since the game started and stop the game.
## Table of contents

### Properties

- [start\_scene](Game.md#start_scene)
- [time](Game.md#time)

### Methods

- [stop](Game.md#stop)

## Properties
### start\_scene
The name of the scene that is loaded on game start.

▪ `Static` **start\_scene**: `string`

#### Defined in

[src/gameloop.ts:21](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/gameloop.ts#L21)

___

### time
The current time in milliseconds since the game started.

▪ `Static` **time**: `number` = `0`

#### Defined in

[src/gameloop.ts:20](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/gameloop.ts#L20)


## Methods
### stop
Stop the game loop and close the game.

▸ `Static` **stop**(): `void`

#### Returns

`void`

#### Defined in

[src/gameloop.ts:100](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/gameloop.ts#L100)
