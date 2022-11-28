import { Component } from "../ecs.js";
import { Types } from "../argTypes.js";

export default class Position extends Component {
    arg_names = ["x", "y"];
    arg_types = [Types.Number, Types.Number];
    
    x = 0;
    y = 0;
}
