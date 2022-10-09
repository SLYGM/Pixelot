import {createSprite, addToUpdateQueue, begin_rendering} from './renderer/renderer.js';

let p = {
    sprite: createSprite(0, 0, './images/BlackHole.png'),
    update: function(dt: number){
        this.sprite.x += 10 * dt;
        this.sprite.y += 10 * dt
    }
}
addToUpdateQueue(p);
begin_rendering();