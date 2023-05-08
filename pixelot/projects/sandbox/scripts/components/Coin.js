export default class Coin extends engine.Component {
    // the arg_names and arg_types arrays are used to define the arguments that are passed to the constructor.
    // the following are some example arguments
    static arg_names = ["Collection Radius", "Points"];
    static arg_types = [engine.Types.Number, engine.Types.Number];
    dependencies = [];
    radius;
    points;

    constructor(collection_radius, points) {
        super();
        this.sound = new engine.Sound('./assets/pickupCoin.wav');
        this.radius = collection_radius;
        this.points = points;
    }
}