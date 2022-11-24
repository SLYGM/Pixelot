import { Component } from "../ecs.js";

export default class Velocity extends Component {
    x = 0;
    y = 0;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }
}
