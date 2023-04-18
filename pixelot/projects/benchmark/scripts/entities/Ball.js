
export default class Ball extends engine.GameObjectBase {

  // the arg_names and arg_types arrays are used to define the arguments that are passed to the onCreate() method.
  // the following are some example arguments
  static arg_names = ["speed"];
  static arg_types = [engine.Types.Number];

  // The onCreate() method is called when the object is created.
  onCreate(speed) {
    this.speed = speed;
  }

  // The update() method is called every frame.
  update() {

  }
}
