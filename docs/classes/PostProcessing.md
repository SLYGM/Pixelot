[retro-engine](../README.md) / [Exports](../modules.md) / PostProcessing

# Class: PostProcessing
Class responsible for managing post processing effects. Can be used to add/remove shaders programmatically.

## Table of contents

### Methods

- [add](PostProcessing.md#add)
- [remove](PostProcessing.md#remove)

## Methods

### add
Add a post process to the top of the stack. Post processes are applied in the order they are added.

▸ `Static` **add**(`post_process`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `post_process` | [`PostProcess`](PostProcess.md) |

#### Returns

`void`

#### Defined in

[src/renderer/post_process.ts:157](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/post_process.ts#L157)


### remove
Remove a post process from the stack.

▸ `Static` **remove**(`post_process`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `post_process` | [`PostProcess`](PostProcess.md) |

#### Returns

`void`

#### Defined in

[src/renderer/post_process.ts:161](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/post_process.ts#L161)
