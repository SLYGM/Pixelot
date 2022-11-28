import { Component } from "../ecs.js";

export default class Position extends Component {
    x = 0;
    y = 0;

    constructor(x=0, y=0) {
        super();
        this.x = x;
        this.y = y;
    }

    toJSONCompatible() : any[] {
        return [this.x,this.y];
    }

}
