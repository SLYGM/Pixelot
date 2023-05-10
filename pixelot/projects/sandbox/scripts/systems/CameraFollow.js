import CameraFollowComponent from '../components/CameraFollow.js';

export default class CameraFollow extends engine.System {
    // the component is the component class that this system will operate on.
    component = CameraFollowComponent;

    // the arg_names and arg_types arrays are used to define the arguments that are passed to the constructor method.
    static arg_names = [];
    static arg_types = [];

    constructor() {
        super();
    }

    // The update method is called every frame. 
    // The entities parameter is an array of all the entities that have the component that this system operates on.
    update(entities, dt) {
        if (entities.size != 1) {
            console.warn("CameraFollow system expects exactly one entity with a CameraFollow component.");
            return;
        }
        entities.forEach(entity => {
            engine.Renderer.viewport.x = entity.Position.x - engine.Renderer.resolution.x / 2;
            engine.Renderer.viewport.y = entity.Position.y - engine.Renderer.resolution.y / 2;
        });
    }
}