import * as engine from 'retro-engine';
import VelocityComponent from "../components/Velocity.js";
export default class Velocity extends engine.System {
    component = VelocityComponent;
    //TODO: these args values aren't used yet
    static arg_names = [];
    static arg_types = [];
    update(entities) {
        entities.forEach(entity => {
            entity.Position.x += entity.Velocity.x;
            entity.Position.y += entity.Velocity.y;
        });
    }
}
