export default class Velocity extends engine.Component {
    static arg_names = ["x", "y"];
    static arg_types = [engine.Types.Number, engine.Types.Number];
    x = 0;
    y = 0;
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }
}
