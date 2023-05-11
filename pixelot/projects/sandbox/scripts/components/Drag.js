import Velocity from "./Velocity.js";

export default class Drag extends engine.Component {
    // the arg_names and arg_types arrays are used to define the arguments that are passed to the constructor.
    // the following are some example arguments
    static arg_names = ["Strength"];
    static arg_types = [engine.Types.Number];
    dependencies = [Velocity];
    radius;

    constructor(strength) {
        super();
        this.strength = strength;
    }
}