import * as engine from 'retro-engine';
import VelocityComponent from "../components/Velocity.js";
import Position from "../components/Position.js";

export default class Velocity extends engine.System {
    component = VelocityComponent;
    //TODO: these args values aren't used yet
    static arg_names = [];
    static arg_types = [];
    update(entities) {
        entities.forEach(entity => {
            entity.get(Position).x += entity.get(VelocityComponent).x;
            entity.get(Position).y += entity.get(VelocityComponent).y;
        });
    }
}
