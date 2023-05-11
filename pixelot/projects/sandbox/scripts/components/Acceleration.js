import Velocity from "./Velocity.js";

export default class Acceleration extends engine.Component {
    // the arg_names and arg_types arrays are used to define the arguments that are passed to the constructor.
    // the following are some example arguments
    static arg_names = ["Horizontal Strength", "Vertical Strength"];
    static arg_types = [engine.Types.Number, engine.Types.Number];
    dependencies = [Velocity];
    radius;

    constructor(horizontal_strength, vertical_strength) {
        super();
        this.horizontal_strength = horizontal_strength;
        this.vertical_strength = vertical_strength;
    }
}