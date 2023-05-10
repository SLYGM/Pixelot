import Sprite from './Sprite.js';

export default class Spin extends engine.Component {
    // the arg_names and arg_types arrays are used to define the arguments that are passed to the constructor.
    // the following are some example arguments
    static arg_names = ["speed"];
    static arg_types = [engine.Types.Number];
    dependencies = [Sprite];

    constructor(speed) {
        super();
        this.speed = speed;
    }
}