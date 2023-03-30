import BarrelShader from "../shaders/barrel.js";
import BarShader from "../shaders/bars.js";

export default class ShaderAdder extends engine.GameObjectBase {
    static arg_names = [];
    static arg_types = [];

    onCreate() {
        this.barShader = new BarShader()
        this.barrelShader = new BarrelShader()
        engine.PostProcessing.add(this.barShader);
        engine.PostProcessing.add(this.barrelShader);
    }

    onDelete() {
        console.log("Deleting shader adder");
        engine.PostProcessing.remove(this.barShader);
        engine.PostProcessing.remove(this.barrelShader);
    }

    update() {}
}