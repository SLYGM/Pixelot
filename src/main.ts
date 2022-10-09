import {createSprite, addToUpdateQueue, begin_rendering} from './renderer/renderer.js';


const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const gl = canvas.getContext("webgl2") as WebGL2RenderingContext;
let p = {
    sprite: createSprite(0, 0, './images/BlackHole.png'),
    dx: 100,
    dy: 100,
    update: function(dt: number){
        this.sprite.x += this.dx * dt;
        this.sprite.y += this.dy * dt
        if (this.sprite.x + this.sprite.tex.width > gl.canvas.clientWidth || this.sprite.x < 0){
            this.dx *= -1;
        }
        if (this.sprite.y + this.sprite.tex.height > gl.canvas.clientHeight || this.sprite.y < 0){
            this.dy *= -1;
        }
    }
}
addToUpdateQueue(p);
begin_rendering();