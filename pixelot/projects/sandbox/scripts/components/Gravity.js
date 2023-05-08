import Velocity from './Velocity.js';

export default class Gravity extends engine.Component {
    // the arg_names and arg_types arrays are used to define the arguments that are passed to the constructor.
    // the following are some example arguments
    static arg_names = [];
    static arg_types = [];
    dependencies = [Velocity];

    constructor() {
        super();
    }
}