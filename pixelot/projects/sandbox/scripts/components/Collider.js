import Position from "../components/Position.js";

export default class Collider extends engine.Component {
  // the arg_names and arg_types arrays are used to define the arguments that are passed to the constructor.
  // the following are some example arguments
  static arg_names = ["radius"];
  static arg_types = [engine.Types.Number];
  dependencies = [Position];

  constructor(radius) {
    super();
    this.radius = radius;
  }
}
