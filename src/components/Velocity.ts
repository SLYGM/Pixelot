import { Component } from "../ecs.js";

export default class Velocity2 extends Component {

    x: number = 0;
    y: number = 0;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }
}
