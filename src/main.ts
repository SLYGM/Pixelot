import {createSprite, addToUpdateQueue, begin_rendering, viewport} from './renderer/renderer.js';

let p = {
    sprite: createSprite(0,150, './images/frog.png'),
    dx: 50,
    dy: 50,
    update: function(dt: number){
        this.sprite.x += this.dx * dt;
        this.sprite.y += this.dy * dt
        //TODO: replace hardcoded resolution with global constant
        if (this.sprite.x + this.sprite.tex.width >= 426 * viewport.sx || this.sprite.x < 0){
            this.dx *= -1;
        }
        if (this.sprite.y + this.sprite.tex.height >= 240 * viewport.sy || this.sprite.y < 0){
            this.dy *= -1;
        }
    }
}

addToUpdateQueue(p);
begin_rendering();