import Position from "./Position.js";
export default class Text extends engine.Component {
    static arg_names = ["text", "font", "scale", "visible"];
    static arg_types = [engine.Types.String, engine.Types.String, engine.Types.Number, engine.Types.Boolean];
    dependencies = [Position];
    text;
    x;
    y;
    font;
    scale;
    visible;
    constructor(text, font, scale, visible) {
        super();
        this.text = text;
        this.scale = scale;
        this.visible = visible;
        const font_to_use = engine.TextRenderer.fontMap.get(font);
        if (!font_to_use) {
            console.log(`ERROR: Font not found: ${font}`);
            return;
        }
        this.font = font_to_use;
    }
    getPos() {
        return this.owner.get(Position);
    }
    onCreate() {
        engine.TextRenderer.addTextInstance(this);
    }
    onDelete() {
        engine.TextRenderer.removeTextInstance(this);
    }
}
