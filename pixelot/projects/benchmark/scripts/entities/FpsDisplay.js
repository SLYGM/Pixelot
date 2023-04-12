
export default class FpsDisplay extends engine.GameObjectBase {

  // the arg_names and arg_types arrays are used to define the arguments that are passed to the onCreate() method.
  // the following are some example arguments
  static arg_names = [];
  static arg_types = [];

  // The onCreate() method is called when the object is created.
  onCreate() {

  }

  // The update() method is called every frame.
  update(dt) {
    let fps = 1.0 / dt;
    this.Text.text = "FPS " + fps.toFixed(2);
    this.Position.x = 0;
    this.Position.y = 0;
  }
}
