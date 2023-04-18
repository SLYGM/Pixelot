export default class ExampleEntity extends engine.GameObjectBase {
    static arg_names = ["speed"];
    static arg_types = [engine.Types.Number];

    onCreate(speed) {
        this.speed = speed;
    }

    update() {
        if (engine.KeyStates.isPressed("a")) {
            this.Position.x -= this.speed;
        }
        if (engine.KeyStates.isPressed("d")) {
            this.Position.x += this.speed;
        }
        if (engine.KeyStates.isPressed("w")) {
            this.Position.y -= this.speed;
        }
        if (engine.KeyStates.isPressed("s")) {
            this.Position.y += this.speed;
        }
    }
}
