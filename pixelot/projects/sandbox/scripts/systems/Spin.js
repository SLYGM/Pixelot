import SpinComponent from '../components/Spin.js';

export default class Spin extends engine.System {
    // the component is the component class that this system will operate on.
    component = SpinComponent;

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
            entity.Sprite.rotation += entity.Spin.speed * dt;
        });
    }
}