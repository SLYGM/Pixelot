import { Component } from "retro-engine";
import { Types } from "retro-engine";
export default class Position extends Component {
    static arg_names = ["x", "y"];
    static arg_types = [Types.Number, Types.Number];
    x = 0;
    y = 0;
}
