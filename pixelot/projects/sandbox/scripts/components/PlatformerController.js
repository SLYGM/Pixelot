import BoxCollider from "./BoxCollider.js";
import Position from "./Position.js";
import PlatformerAnimation from "./PlatformerAnimation.js";
import Velocity from "./Velocity.js";

export default class PlatformerController extends engine.Component {
    dependencies = [BoxCollider, Position, PlatformerAnimation, Velocity];
    static arg_names = ["speed", "jump_force"];
    static arg_types = [engine.Types.Number, engine.Types.Number];

    constructor(speed, jump_force) {
        super();
        this.speed = speed;
        this.jump_force = jump_force;
        this.grounded = false;
    }

    jump() {
        if (this.grounded) {
            this.Velocity.y = -this.jump_force;
            this.grounded = false;
        }
    }
}