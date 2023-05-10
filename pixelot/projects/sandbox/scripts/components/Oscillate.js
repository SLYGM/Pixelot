export default class Oscillate extends engine.Component {
    // the arg_names and arg_types arrays are used to define the arguments that are passed to the constructor.
    // the following are some example arguments
    static arg_names = ["Frequency", "Amplitude", "Horizontal"];
    static arg_types = [engine.Types.Number, engine.Types.Number, engine.Types.Boolean];
    dependencies = [];

    constructor(frequency, amplitude, horizontal) {
        super();
        this.frequency = frequency;
        this.amplitude = amplitude;
        this.horizontal = horizontal;
        this.timer = 0;
    }
}