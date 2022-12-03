import Sprite from "../components/Sprite.js";
import { GameObjectBase } from "../ecs.js";

export default class UIDigit extends GameObjectBase {
    value: number = 0;
    onCreate() {
    }

    setValue(value: number) {
        this.value = value;
        this.get(Sprite).tex = `${this.value}`;
    }

    update(): void {
    }
}
