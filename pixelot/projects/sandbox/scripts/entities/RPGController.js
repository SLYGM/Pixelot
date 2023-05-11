export default class RPGController extends engine.GameObjectBase {
    static arg_names = ["speed"];
    static arg_types = [engine.Types.Number];

    onCreate(speed) {
        this.speed = speed;
    }

    update(dt) {
        this.Velocity.x = 0;
        this.Velocity.y = 0;
        
        if (engine.KeyStates.isPressed("a")) {
            this.Velocity.x -= this.speed;
        }
        if (engine.KeyStates.isPressed("d")) {
            this.Velocity.x += this.speed;
        }
        if (engine.KeyStates.isPressed("w")) {
            this.Velocity.y -= this.speed;
        }
        if (engine.KeyStates.isPressed("s")) {
            this.Velocity.y += this.speed;
        }
    }
}
