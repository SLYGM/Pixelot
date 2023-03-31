[retro-engine](../README.md) / [Exports](../modules.md) / PostProcessing

# Class: PostProcessing

## Table of contents

### Constructors

- [constructor](PostProcessing.md#constructor)

### Properties

- [basic\_process](PostProcessing.md#basic_process)
- [curr\_buffer](PostProcessing.md#curr_buffer)
- [frame\_buffers](PostProcessing.md#frame_buffers)
- [post\_queue](PostProcessing.md#post_queue)
- [render\_buff](PostProcessing.md#render_buff)
- [render\_tex](PostProcessing.md#render_tex)
- [textures](PostProcessing.md#textures)

### Methods

- [#currBuffer](PostProcessing.md##currbuffer)
- [#prevTexture](PostProcessing.md##prevtexture)
- [#renderToBuffer](PostProcessing.md##rendertobuffer)
- [#renderToScreen](PostProcessing.md##rendertoscreen)
- [#switchBuffer](PostProcessing.md##switchbuffer)
- [#upscaleScene](PostProcessing.md##upscalescene)
- [add](PostProcessing.md#add)
- [apply](PostProcessing.md#apply)
- [init](PostProcessing.md#init)
- [initPingPongBuffers](PostProcessing.md#initpingpongbuffers)
- [initRenderBuffer](PostProcessing.md#initrenderbuffer)
- [remove](PostProcessing.md#remove)

## Constructors

### constructor

• **new PostProcessing**()

## Properties

### basic\_process

▪ `Static` **basic\_process**: [`PostProcess`](PostProcess.md)

#### Defined in

[src/renderer/post_process.ts:24](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/post_process.ts#L24)

___

### curr\_buffer

▪ `Static` **curr\_buffer**: `number` = `0`

#### Defined in

[src/renderer/post_process.ts:19](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/post_process.ts#L19)

___

### frame\_buffers

▪ `Static` **frame\_buffers**: `WebGLFramebuffer`[]

#### Defined in

[src/renderer/post_process.ts:18](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/post_process.ts#L18)

___

### post\_queue

▪ `Static` **post\_queue**: [`PostProcess`](PostProcess.md)[] = `[]`

#### Defined in

[src/renderer/post_process.ts:20](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/post_process.ts#L20)

___

### render\_buff

▪ `Static` **render\_buff**: `WebGLFramebuffer`

#### Defined in

[src/renderer/post_process.ts:23](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/post_process.ts#L23)

___

### render\_tex

▪ `Static` **render\_tex**: `WebGLTexture`

#### Defined in

[src/renderer/post_process.ts:22](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/post_process.ts#L22)

___

### textures

▪ `Static` **textures**: `WebGLTexture`[]

#### Defined in

[src/renderer/post_process.ts:21](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/post_process.ts#L21)

## Methods

### #currBuffer

▸ `Static` `Private` **#currBuffer**(): `WebGLFramebuffer`

#### Returns

`WebGLFramebuffer`

#### Defined in

[src/renderer/post_process.ts:149](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/post_process.ts#L149)

___

### #prevTexture

▸ `Static` `Private` **#prevTexture**(): `WebGLTexture`

#### Returns

`WebGLTexture`

#### Defined in

[src/renderer/post_process.ts:153](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/post_process.ts#L153)

___

### #renderToBuffer

▸ `Static` `Private` **#renderToBuffer**(`buffer`, `post_process`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | `WebGLFramebuffer` |
| `post_process` | [`PostProcess`](PostProcess.md) |

#### Returns

`void`

#### Defined in

[src/renderer/post_process.ts:132](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/post_process.ts#L132)

___

### #renderToScreen

▸ `Static` `Private` **#renderToScreen**(): `void`

#### Returns

`void`

#### Defined in

[src/renderer/post_process.ts:126](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/post_process.ts#L126)

___

### #switchBuffer

▸ `Static` `Private` **#switchBuffer**(): `void`

#### Returns

`void`

#### Defined in

[src/renderer/post_process.ts:145](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/post_process.ts#L145)

___

### #upscaleScene

▸ `Static` `Private` **#upscaleScene**(): `void`

#### Returns

`void`

#### Defined in

[src/renderer/post_process.ts:111](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/post_process.ts#L111)

___

### add

▸ `Static` **add**(`post_process`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `post_process` | [`PostProcess`](PostProcess.md) |

#### Returns

`void`

#### Defined in

[src/renderer/post_process.ts:157](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/post_process.ts#L157)

___

### apply

▸ `Static` **apply**(): `void`

#### Returns

`void`

#### Defined in

[src/renderer/post_process.ts:88](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/post_process.ts#L88)

___

### init

▸ `Static` **init**(): `void`

#### Returns

`void`

#### Defined in

[src/renderer/post_process.ts:26](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/post_process.ts#L26)

___

### initPingPongBuffers

▸ `Static` **initPingPongBuffers**(): `void`

#### Returns

`void`

#### Defined in

[src/renderer/post_process.ts:60](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/post_process.ts#L60)

___

### initRenderBuffer

▸ `Static` **initRenderBuffer**(): `void`

#### Returns

`void`

#### Defined in

[src/renderer/post_process.ts:79](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/post_process.ts#L79)

___

### remove

▸ `Static` **remove**(`post_process`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `post_process` | [`PostProcess`](PostProcess.md) |

#### Returns

`void`

#### Defined in

[src/renderer/post_process.ts:161](https://github.com/SLYGM/RetroEngineTM/blob/7ef0169/engine/src/renderer/post_process.ts#L161)
