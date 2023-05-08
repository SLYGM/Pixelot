export default class Deadly extends engine.Component {
    // the arg_names and arg_types arrays are used to define the arguments that are passed to the constructor.
    // the following are some example arguments
    static arg_names = ["Death Radius"];
    static arg_types = [engine.Types.Number];
    dependencies = [];
    radius;

    constructor(death_radius) {
        super();
        this.sound = new engine.Sound('./assets/hitHurt.wav');
        this.radius = death_radius;
    }
}