import AnimationComponent from '../components/Animation.js';

export default class Animation extends engine.System {
    // the component is the component class that this system will operate on.
    component = AnimationComponent;

    // the arg_names and arg_types arrays are used to define the arguments that are passed to the constructor method.
    static arg_names = [];
    static arg_types = [];

    // The update method is called every frame. 
    // The entities parameter is an array of all the entities that have the component that this system operates on.
    update(entities, dt) {
        entities.forEach(entity => {
            entity.Animation.frame_timer -= dt;
            if (entity.Animation.frame_timer <= 0) {
                entity.Animation.frame_timer = entity.Animation.time_per_frame;
                entity.Animation.frame++;
                if (entity.Animation.frame >= 4) {
                    entity.Animation.frame = 0;
                }
                entity.Sprite.setTex(entity.Animation.frames[entity.Animation.frame]);
            }
        });
    }
}