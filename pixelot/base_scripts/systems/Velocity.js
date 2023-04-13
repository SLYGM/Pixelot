import VelocityComponent from "../components/Velocity.js";
import Position from "../components/Position.js";

export default class Velocity extends engine.System {
    component = VelocityComponent;
    static arg_names = [];
    static arg_types = [];

    update(entities, dt) {
        entities.forEach(entity => {
            entity.get(Position).x += entity.get(VelocityComponent).x * dt;
            entity.get(Position).y += entity.get(VelocityComponent).y * dt;
        });
    }
}
