import ColliderComponent from '../components/Collider.js';
export default class Collider extends engine.System {
  // the component is the component class that this system will operate on.
  component = ColliderComponent;

  // the arg_names and arg_types arrays are used to define the arguments that are passed to the constructor method.
  static arg_names = [];
  static arg_types = [];

  // The update method is called every frame. 
  // The entities parameter is an array of all the entities that have the component that this system operates on.
  update(entities) {
    // console.log("Updating Collider System");
    entities = Array.from(entities);
    for (let i = 0; i < entities.length; i++) {
      let entity1 = entities[i];
      // Check for collisions with walls
      if (entity1.Position.x + entity1.Collider.radius >= 426) {
        entity1.Velocity.x *= -1;
      } else if (entity1.Position.x - entity1.Collider.radius <= 0) {
        entity1.Velocity.x *= -1;
      }
      if (entity1.Position.y + entity1.Collider.radius >= 240) {
        entity1.Velocity.y *= -1;
      } else if (entity1.Position.y - entity1.Collider.radius <= 0) {
        entity1.Velocity.y *= -1;
      }

      // Check for collisions with other entities
      for (let j = i + 1; j < entities.length; j++) {
        let entity2 = entities[j];
        let x_dist = entity1.Position.x - entity2.Position.x;
        let y_dist = entity1.Position.y - entity2.Position.y;
        let dist = Math.sqrt(x_dist * x_dist + y_dist * y_dist);
        if (dist < entity1.Collider.radius + entity2.Collider.radius) {
          // Colliding!
          console.log("Colliding!");
          // change velocity
          let entity1_direction_x = entity1.Position.x - entity2.Position.x;
          let entity1_direction_y = entity1.Position.y - entity2.Position.y;
          entity1.Velocity.x = entity1_direction_x;
          entity1.Velocity.y = entity1_direction_y;
          entity1.Velocity.normalize();
          entity1.Velocity.multiply(entity1.speed);
          let entity2_direction_x = entity2.Position.x - entity1.Position.x;
          let entity2_direction_y = entity2.Position.y - entity1.Position.y;
          entity2.Velocity.x = entity2_direction_x;
          entity2.Velocity.y = entity2_direction_y;
          entity2.Velocity.normalize();
          entity2.Velocity.multiply(entity2.speed);
        }
      }
    }
  }
}
