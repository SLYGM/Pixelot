// import * as engine from 'retro-engine';
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

    normalize() {
        let magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
        if (magnitude != 0) {
            this.x /= magnitude;
            this.y /= magnitude;
        }
    }

    multiply(multiplier) {
        this.x *= multiplier;
        this.y *= multiplier;
    }
}
