export let $gl: WebGL2RenderingContext = null;
export let $canvas: HTMLCanvasElement = null;

export function loadGL() {
    $canvas = <HTMLCanvasElement>document.getElementById("canvas");
    $gl = $canvas.getContext("webgl2");

    if ($gl) {
        $gl.blendFunc($gl.SRC_ALPHA, $gl.ONE_MINUS_SRC_ALPHA);
        $gl.enable($gl.BLEND);
    } else {
        console.log("Failed to get webgl2 context");
    }
}
