import GravityComponent from '../components/Gravity.js';

export default class Gravity extends engine.System {
    // the component is the component class that this system will operate on.
    component = GravityComponent;

    // the arg_names and arg_types arrays are used to define the arguments that are passed to the constructor method.
    static arg_names = ["Strength"];
    static arg_types = [engine.Types.Number];

    constructor(strength) {
        super();
        this.Strength = strength;
    }

    // The update method is called every frame. 
    // The entities parameter is an array of all the entities that have the component that this system operates on.
    update(entities, dt) {
        entities.forEach(entity => {
            entity.Velocity.y += this.Strength * dt;
        });
    }
}
