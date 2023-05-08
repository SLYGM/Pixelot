export default class RPGController extends engine.GameObjectBase {
    static arg_names = ["speed"];
    static arg_types = [engine.Types.Number];

    onCreate(speed) {
        this.speed = speed;
    }

    update(dt) {
        if (engine.KeyStates.isPressed("a")) {
            this.Position.x -= this.speed * dt;
        }
        if (engine.KeyStates.isPressed("d")) {
            this.Position.x += this.speed * dt;
        }
        if (engine.KeyStates.isPressed("w")) {
            this.Position.y -= this.speed * dt;
        }
        if (engine.KeyStates.isPressed("s")) {
            this.Position.y += this.speed * dt;
        }
    }
}
