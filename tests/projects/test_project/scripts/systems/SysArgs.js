import SysArgsComponent from "../components/SysArgs.js";
import * as engine from "retro-engine";
export default class SysArgs extends engine.System {
    static arg_names = ["increment"];
    static arg_types = [engine.Types.Number];
    component = SysArgsComponent;

    constructor(increment) {
        super();
        this.increment = increment;
    }

    update(entities) {
        entities.forEach(entity => {
            entity.SysArgs.num += this.increment;
        });
    }
}