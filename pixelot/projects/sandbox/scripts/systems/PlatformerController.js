import PlatformerControllerComponent from "../components/PlatformerController.js";

export default class PlatformerController extends engine.System {
    component = PlatformerControllerComponent;
    static arg_names = [];
    static arg_types = [];

    update(entities, dt) {
        entities.forEach(entity => {
            if (entity.PlatformerController.grounded) {
                if (engine.Input.getKey("ArrowLeft")) {
                    entity.Velocity.x = -entity.PlatformerController.speed;
                    entity.Animation.flip_x = true;
                } else if (engine.Input.getKey("ArrowRight")) {
                    entity.Velocity.x = entity.PlatformerController.speed;
                    entity.Animation.flip_x = false;
                } else {
                    entity.Velocity.x = 0;
                }
                if (engine.Input.getKeyDown("ArrowUp")) {
                    entity.Velocity.y = -entity.PlatformerController.jump_force;
                }
            }
        });
    }
}