import VelocityComponent from "../components/Velocity.js";
export default class TestSys extends engine.System {
    component = VelocityComponent;
    static arg_names = ["text"];
    static arg_types = [engine.Types.String];

    constructor(text) {
        super();
        this.text = text;
    }

    update(entities) {
        console.log(this.text);
    }
}
