import SelfDestructComponent from '../components/SelfDestruct.js';

export default class SelfDestruct extends engine.System {
  // the component is the component class that this system will operate on.
  component = SelfDestructComponent;

  // the arg_names and arg_types arrays are used to define the arguments that are passed to the constructor method.
  static arg_names = [];
  static arg_types = [];

  // The update method is called every frame. 
  // The entities parameter is an array of all the entities that have the component that this system operates on.
  update(entities, dt) {
    entities.forEach(entity => {
      entity.SelfDestruct.time -= dt;
      if (entity.SelfDestruct.time <= 0) {
        entity.scene.deleteEntity(entity);
      }
    });
  }
}
