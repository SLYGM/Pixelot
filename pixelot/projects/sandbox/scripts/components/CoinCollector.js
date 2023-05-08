export default class CoinCollector extends engine.Component {
    // the arg_names and arg_types arrays are used to define the arguments that are passed to the constructor.
    // the following are some example arguments
    static arg_names = ["Collection Radius"];
    static arg_types = [engine.Types.Number];
    dependencies = [];
    score = 0;
    radius;

    constructor(collection_radius) {
        super();
        this.radius = collection_radius;
        this.score = 0;
    }
}