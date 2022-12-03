import Position from "../components/Position.js";
import Sprite from "../components/Sprite.js";
import { GameObjectBase } from "../ecs.js";
import { $scene } from "../sceneManager.js";
import UIDigit from "./UIDigit.js";

export default class Score extends GameObjectBase {
    score: number = 0;
    digits: UIDigit[] = [];
    x: number = 5;
    y: number = 10;
    onCreate(): void {
        this.updateScore();
    }

    update(): void {
        this.updateScore();
    }

    createNewDigit() : UIDigit {
        let digit = new UIDigit(`score_digit_${this.digits.length}`).add(new Position).add(new Sprite('0', 'sprites', 2));
        digit.get(Position).x = this.x + this.digits.length * (8 + 2);
        digit.get(Position).y = this.y;
        $scene.addEntity(digit);
        this.digits.push(digit);
        return digit;
    }

    updateScore() {
        let score = String(this.score);
        while (this.digits.length !== score.length) {
            this.createNewDigit();
        }
        for (let i = 0; i < score.length; i++) {
            this.digits[i].setValue(Number.parseInt(score[i]));
        }
    }
}
