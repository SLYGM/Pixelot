import { PostProcessing } from "./post_process";

export let $gl: WebGL2RenderingContext = null;
export let $offscreen_canvas: OffscreenCanvas = null;
export let $canvas: HTMLCanvasElement = null;
export let $canvas_bitmap_context: ImageBitmapRenderingContext = null;

export let $rendering_offscreen: boolean;
let resizeObserver: ResizeObserver;

/**
* Load the webgl rendering context.
* Can be set to render off-screen, in which case use `connectCanvas` to connect to an onscreen canvas. For this to work
* your document must have an element with id 'canvas'. The offscreen rendering allows the WebGL context to be retained even
* when there is no canvas on-screen.
* 
*@param offscreen set to true for offscreen rendering (used in app)
*/
export function loadGL(offscreen: boolean = false) {
    $rendering_offscreen = offscreen;
    
    // setup resize observer for resizing canvas when page resizes
    resizeObserver = new ResizeObserver(onResize);
    
    // get rendering context
    if (offscreen) {
        // initialise the off-screen canvas if rendering off-screen
        $offscreen_canvas = new OffscreenCanvas(0, 0);
        $gl = $offscreen_canvas.getContext("webgl2");
    } else {
        $canvas = <HTMLCanvasElement>document.getElementById("canvas");
        $gl = $canvas.getContext("webgl2");
        resizeObserver.observe($canvas, {box: 'device-pixel-content-box'});
    }

    if ($gl) {
        $gl.blendFunc($gl.SRC_ALPHA, $gl.ONE_MINUS_SRC_ALPHA);
        $gl.enable($gl.BLEND);
    } else {
        console.log("Failed to get webgl2 context");
    }
}


function onResize(entries: ResizeObserverEntry[]) {
    const entry = entries[0];
    const width = entry.devicePixelContentBoxSize[0].inlineSize;
    const height = entry.devicePixelContentBoxSize[0].blockSize;
    $canvas.width = width;
    $canvas.height = height;
    
    // update the ping pong buffers to be the same size
    PostProcessing.initPingPongBuffers();
    
    // if rendering off-screen, also update the off-screen canvas size
    if ($rendering_offscreen) {
        $offscreen_canvas.width = $canvas.width;
        $offscreen_canvas.height = $canvas.height;
    }
}


/**
* Connect the rendering to an onscreen canvas. This canvas must have id 'canvas'
*/
export function connectCanvas() {
    $canvas = <HTMLCanvasElement>document.getElementById("canvas");
    $canvas_bitmap_context = $canvas.getContext("bitmaprenderer");
    resizeObserver.observe($canvas, {box: 'device-pixel-content-box'});
    // re-initialise the ping-pong buffers now that the canvas size is updated
    PostProcessing.initPingPongBuffers();
}

/**
* Disconnect the current canvas. Use this when the canvas is no longer available.
*/
export function disconnectCanvas() {
    $canvas = null;
    $canvas_bitmap_context = null;
    resizeObserver.disconnect();
}
