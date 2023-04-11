import Animated from "../components/Animated.js";
import BoxCollider from "../components/BoxCollider.js";
import Platformer from "../components/Platformer.js";
import PlayerDamange from "../components/PlayerDamage.js";
import ExampleEntity from "./ExampleEntity.js";

export default class Player extends engine.GameObjectBase {
    static arg_names = [];
    static arg_types = [];

    direction = "right";

    onCreate() {
        this.get(Animated).setAnimation("idle_right");
    }

    update() {
        if (engine.KeyStates.isPressed("ArrowLeft")) {
            this.get(Platformer).move(-0.4);
        }
        else if (engine.KeyStates.isPressed("ArrowRight")) {
            this.get(Platformer).move(0.4);
        }
        else {
            this.get(Platformer).move(0);
        }
        if (engine.KeyStates.isPressed("ArrowUp")) {
            this.get(Platformer).jump();
        }
        this.get(Platformer).update();

        let direction = this.get(Platformer).dx > 0 ? "right" :
                            this.get(Platformer).dx < 0 ? "left" : this.direction;
        this.direction = direction;
        let action = this.get(Platformer).dy != 0 ? "jump" :
                        this.get(Platformer).dx != 0 ? "walk" : "idle";
        this.get(Animated).setAnimation(action + "_" + direction);
        this.get(Animated).update();

        let enemies = engine.SceneManager.currentScene.getEntitiesWithComponent(PlayerDamange);
        for (let enemy of enemies) {
            if (enemy.get(BoxCollider).isColliding(this.get(BoxCollider))) {
                engine.SceneManager.currentScene.deleteEntity(this);
            }
        }
    }
}
