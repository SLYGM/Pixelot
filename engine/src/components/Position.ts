import { Component } from "../ecs.js";
import { Types } from "../argTypes.js";

export default class Position extends Component {
    static arg_names = ["x", "y"];
    static arg_types = [Types.Number, Types.Number];
    
    x = 0;
    y = 0;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }
}
