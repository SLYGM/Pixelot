import { Component, Types } from "retro-engine";
export default class Velocity extends Component {
    static arg_names = ["x", "y"];
    static arg_types = [Types.Number, Types.Number];
    x = 0;
    y = 0;
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }
}
