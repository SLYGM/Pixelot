import AnimatedSprite from "../components/AnimatedSprite.js";
import { GameObjectBase, System } from "../ecs.js";
import { Game } from "../gameloop.js";

export default class SpriteAnimationSystem extends System {
    component = AnimatedSprite;

    update(entities: Set<GameObjectBase>) {
        entities.forEach((e) => {
            let sprite = e.get(AnimatedSprite);
            if (sprite.manualUpdate) return;
            let dt = Game.dt;
            let t = sprite.t;
            let t2 = (sprite.t + dt) % (1 / sprite.fps) ;
            sprite.t = t2;
            if (t2 > t) return;
            sprite.updateFrame();
        });
    }
}
