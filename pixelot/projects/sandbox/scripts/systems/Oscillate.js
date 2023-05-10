import OscillateComponent from '../components/Oscillate.js';

export default class Oscillate extends engine.System {
    // the component is the component class that this system will operate on.
    component = OscillateComponent;

    // the arg_names and arg_types arrays are used to define the arguments that are passed to the constructor method.
    static arg_names = [];
    static arg_types = [];

    constructor() {
        super();
    }

    // The update method is called every frame. 
    // The entities parameter is an array of all the entities that have the component that this system operates on.
    update(entities, dt) {
        entities.forEach(entity => {
            entity.Oscillate.timer += dt;
            if (entity.Oscillate.horizontal) {
                entity.Position.x += Math.cos(entity.Oscillate.timer * entity.Oscillate.frequency * Math.PI) * entity.Oscillate.amplitude;
            } else {
                entity.Position.y += Math.cos(entity.Oscillate.timer * entity.Oscillate.frequency * Math.PI) * entity.Oscillate.amplitude;
            }
        });
    }
}