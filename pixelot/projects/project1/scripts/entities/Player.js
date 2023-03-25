//@ts-nocheck
// import * as engine from 'retro-engine';

export default class Player extends engine.GameObjectBase {
    static arg_names = ["hp", "invincible"];
    static arg_types = [engine.Types.Number, engine.Types.Boolean];
    onCreate(hp, invincible) {
        this.hp = hp;
        this.invincible = invincible;
        this.keyPressed
        this.sound = new engine.Sound('./assets/sound/aeuuuh.wav');
    }
    update() {
        if (engine.KeyStates.isPressed("a")) {
            this.Position.x = 50;
            this.Position.y = 50;
            if (!this.keyPressed) {
                this.sound.play();
                this.keyPressed = true;
            }
            
        } else {
            this.keyPressed = false;
        }
    }
}
