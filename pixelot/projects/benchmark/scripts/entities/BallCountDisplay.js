
import Collider from "../components/Collider.js";

export default class BallCountDisplay extends engine.GameObjectBase {

  // the arg_names and arg_types arrays are used to define the arguments that are passed to the onCreate() method.
  // the following are some example arguments
  static arg_names = [];
  static arg_types = [];

  // The onCreate() method is called when the object is created.
  onCreate() {

  }

  // The update() method is called every frame.
  update(dt) {
    let entities = engine.SceneManager.currentScene.getEntitiesWithComponent(Collider);
    this.Text.text = "Balls " + entities.length;
    this.Position.x = 0;
    this.Position.y = 10;
  }
}
