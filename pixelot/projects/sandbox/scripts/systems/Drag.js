import DragComponent from '../components/Drag.js';

export default class Drag extends engine.System {
    // the component is the component class that this system will operate on.
    component = DragComponent;

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
            entity.Velocity.x -= entity.Velocity.x * entity.Drag.strength * dt;
            entity.Velocity.y -= entity.Velocity.y * entity.Drag.strength * dt;
        });
    }
}