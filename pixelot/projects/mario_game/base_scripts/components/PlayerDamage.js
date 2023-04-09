import BoxCollider from "./BoxCollider.js";

export default class PlayerDamange extends engine.Component {
    dependencies = [BoxCollider];
    static arg_names = [];
    static arg_types = [];

    constructor() {
        super();
    }
}