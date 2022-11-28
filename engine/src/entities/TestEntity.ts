// @ts-nocheck
import * as engine from '../engineExport';

class TestEntity extends engine.GameObjectBase {
    arg_names = ["x", "y"];
    arg_types = [engine.Types.Number, engine.Types.Number];

    onCreate(x, y): void {
        this.Position.x = x;
        this.Position.y = y;
    }

    update(): void {
        if (engine.KeyStates.isPressed("a")) {
            this.Position.x = 50;
            this.Position.y = 50;
        } else {
            this.Position.x = engine.MouseState.world_pos.x;
            this.Position.y = engine.MouseState.world_pos.y;
        }
    }
}