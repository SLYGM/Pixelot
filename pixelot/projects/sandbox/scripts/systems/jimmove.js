import JimMoveComponent from '../components/jimmove.js';


export default class JimMove extends engine.System {
  // the component is the component class that this system will operate on.
  component = JimMoveComponent;

  // the arg_names and arg_types arrays are used to define the arguments that are passed to the constructor method.
  static arg_names = [];
  static arg_types = [];


  platforms = [];
  // The update method is called every frame. 
  // The entities parameter is an array of all the entities that have the component that this system operates on.
  update(entities, dt) {
    if (this.platforms == []) {
      this.platforms = [engine.SceneManager.currentScene.getEntities().filter((p) => p.name.includes("SmallPlatform"))];

    }

    entities.forEach(e => {
      if (engine.KeyStates.isPressed("a")) {
        e.Position.x -= 200 * dt;
      }
      if (engine.KeyStates.isPressed("d")) {
        e.Position.x += 200 * dt;
      }

      let lowestPlatform = -1e9;
      this.platforms = engine.SceneManager.currentScene.getEntities().forEach((p) => {
        if (p.name.includes("SmallPlatform")) {
          lowestPlatform = Math.max(lowestPlatform, p.Position.y);
          if (e.BoxCollider.isColliding(p.BoxCollider) && e.Velocity.y > 0) {
            e.Velocity.y = -500;
          }
        }
      });

      if (e.Velocity.y > 500) {
        e.Velocity.y = 500;
      }

      console.log(lowestPlatform, e.Position.y);

      // lose condition
      if (e.Position.y > lowestPlatform) {
        console.log("Game over");
      }

    })
  }
}
