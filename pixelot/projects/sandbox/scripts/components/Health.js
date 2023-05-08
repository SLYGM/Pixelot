export default class Health extends engine.Component {
    static arg_names = ["hp", "hit radius"];
    static arg_types = [engine.Types.Number, engine.Types.Number];

    constructor(hp, hit_radius) {
        super();
        this.hp = hp;
        this.radius = hit_radius;
    }
}
