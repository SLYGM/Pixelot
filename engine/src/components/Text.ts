import { Component } from "../ecs.js";
import Position from "./Position.js";
import { Types } from "../argTypes.js";
import { TextRenderer, Font } from "../renderer/textRenderer.js";

export default class Text extends Component {
    static arg_names = ["text", "font", "scale", "visible"];
    static arg_types = [Types.String, Types.String, Types.Number, Types.Boolean];

    override dependencies = [Position];

    text: string;
    x: number;
    y: number;
    font: Font;
    scale: number;
    visible: boolean;

    constructor(text: string, font: string, scale: number, visible: boolean = true) {
        super();
        this.text = text;
        this.scale = scale;
        this.visible = visible;
        const font_to_use = TextRenderer.fontMap.get(font);
        if (!font_to_use) {
            console.log(`ERROR: Font not found: ${font}`);
            return;
        }
        this.font = font_to_use;
    }

    getPos() {
        return this.owner.get(Position);
    }

    override onCreate(): void {
        TextRenderer.addTextInstance(this);
    }

    override onDelete() {
        TextRenderer.removeTextInstance(this);
    }
}