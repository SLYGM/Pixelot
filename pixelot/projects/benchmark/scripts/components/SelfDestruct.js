export default class SelfDestruct extends engine.Component {
  // the arg_names and arg_types arrays are used to define the arguments that are passed to the constructor.
  // the following are some example arguments
  static arg_names = ["time alive"];
  static arg_types = [engine.Types.Number];
  dependencies = [];

  constructor(destruction_timer) {
    super();
    this.time = destruction_timer;
  }
}
