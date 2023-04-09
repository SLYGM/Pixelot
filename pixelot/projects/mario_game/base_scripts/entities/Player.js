import BoxCollider from "../components/BoxCollider.js";
import Platformer from "../components/Platformer.js";
import PlayerDamange from "../components/PlayerDamage.js";
import ExampleEntity from "./ExampleEntity.js";

export default class Player extends engine.GameObjectBase {
    static arg_names = [];
    static arg_types = [];

    onCreate() {
    }

    update() {
        if (engine.KeyStates.isPressed("ArrowLeft")) {
            this.get(Platformer).move(-0.1);
        }
        if (engine.KeyStates.isPressed("ArrowRight")) {
            this.get(Platformer).move(0.1);
        }
        if (engine.KeyStates.isPressed("ArrowUp")) {
            this.get(Platformer).jump();
        }
        this.get(Platformer).update();

        let enemies = engine.SceneManager.currentScene.getEntitiesWithComponent(PlayerDamange);
        for (let enemy of enemies) {
            if (enemy.get(BoxCollider).isColliding(this.get(BoxCollider))) {
                engine.SceneManager.currentScene.deleteEntity(this);
            }
        }
    }
}
