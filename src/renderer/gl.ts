const _canvas = <HTMLCanvasElement>document.getElementById("canvas");
const _gl = this.canvas.getContext("webgl2");

if (_gl) {
    _gl.blendFunc(_gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA);
    _gl.enable(_gl.BLEND);
} else {
    console.log("Failed to get webgl2 context");
}