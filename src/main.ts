import {createSprite, addToUpdateQueue, begin_rendering, viewport} from './renderer/renderer.js';

let p = {
    sprite: createSprite(100, 100, './images/frog.png'),
    dx: 100,
    dy: 100,
    update: function(dt: number){
        this.sprite.x += this.dx * dt;
        this.sprite.y += this.dy * dt
        if (this.sprite.x + this.sprite.tex.width > viewport.width || this.sprite.x < 0){
            this.dx *= -1;
        }
        if (this.sprite.y + this.sprite.tex.height > viewport.height || this.sprite.y < 0){
            this.dy *= -1;
        }
    }
}

let viewport_updater = {
    update: function(dt: number) {
        viewport.height += 0 * dt;
        viewport.width += 0 * dt;
    }
}
addToUpdateQueue(viewport_updater);
addToUpdateQueue(p);
begin_rendering();