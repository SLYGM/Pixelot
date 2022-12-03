import { Component } from "../ecs.js";
import Position from "./Position.js";
import AnimatedSprite from "./AnimatedSprite.js";
import SpriteCollider from "./SpriteCollider.js";


export default class Invader extends Component {
    dependencies = [Position, AnimatedSprite, SpriteCollider];
    
    constructor() {
        super()
    }

    move(x: number, y: number) {
        this.owner.get(Position).x += x;
        this.owner.get(Position).y += y;
        this.owner.get(AnimatedSprite).updateFrame();
    }

}
