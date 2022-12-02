import * as engine from 'retro-engine';
export default class Player extends engine.GameObjectBase {
    static arg_names = ["hp"];
    static arg_types = [engine.Types.Number];
    onCreate(hp) {
        this.hp = hp;
        console.log(this.hp);
    }
    update() {
        if (engine.KeyStates.isPressed("a")) {
            this.Position.x = 50;
            this.Position.y = 50;
        }
        // } else {
        //     this.Position.x = engine.MouseState.world_pos.x;
        //     this.Position.y = engine.MouseState.world_pos.y;
        // }
    }
}
