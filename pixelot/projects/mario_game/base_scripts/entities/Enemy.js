import Animated from "../components/Animated.js";
import BoxCollider from "../components/BoxCollider.js";
import Platformer from "../components/Platformer.js";
import PlayerDamange from "../components/PlayerDamage.js";
import ExampleEntity from "./ExampleEntity.js";

export default class Enemy extends engine.GameObjectBase {
    static arg_names = [];
    static arg_types = [];

    direction = 1;

    onCreate() {
    }

    update() {
        this.get(Platformer).move(0.2 * this.direction);
        this.get(Platformer).update();
        this.direction = this.get(Platformer).dx == 0 ? this.direction * -1 : this.direction;
    }
}
