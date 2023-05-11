import VelocityComponent from "../components/Velocity.js";
import Position from "../components/Position.js";

export default class Velocity extends engine.System {
    component = VelocityComponent;
    static arg_names = ["horizontal_wind", "vertical_wind"];
    static arg_types = [engine.Types.Number, engine.Types.Number];

    constructor(horizontal_wind, vertical_wind) {
        super();
        this.horizontal_wind = horizontal_wind;
        this.vertical_wind = vertical_wind;
    }

    update(entities, dt) {
        entities.forEach(entity => {
            // X
            if ((this.horizontal_wind > 0 && entity.Velocity.x > 0) || (this.horizontal_wind < 0 && entity.Velocity.x < 0)) {
                // Moving with the wind
                entity.Position.x += (entity.Velocity.x + this.horizontal_wind) * dt;
            } else if (this.horizontal_wind > 0 && entity.Velocity.x < 0) {
                // Moving against the wind (left)
                entity.Position.x += Math.min(entity.Velocity.x + this.horizontal_wind, 0) * dt;
            } else if (this.horizontal_wind < 0 && entity.Velocity.x > 0) {
                // Moving against the wind (right)
                entity.Position.x += Math.max(entity.Velocity.x + this.horizontal_wind, 0) * dt;
            } else {
                entity.get(Position).x += entity.get(VelocityComponent).x * dt;
            }

            // Y
            if ((this.vertical_wind > 0 && entity.Velocity.y > 0) || (this.vertical_wind < 0 && entity.Velocity.y < 0)) {
                // Moving with the wind
                entity.Position.y += (entity.Velocity.y + this.vertical_wind) * dt;
            } else if (this.vertical_wind > 0 && entity.Velocity.y < 0) {
                // Moving against the wind (up)
                entity.Position.y += Math.min(entity.Velocity.y + this.vertical_wind, 0) * dt;
            } else if (this.vertical_wind < 0 && entity.Velocity.y > 0) {
                // Moving against the wind (down)
                entity.Position.y += Math.max(entity.Velocity.y + this.vertical_wind, 0) * dt;
            } else {
                entity.get(Position).y += entity.get(VelocityComponent).y * dt;
            }
        });
    }
}
