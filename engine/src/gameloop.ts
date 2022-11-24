import { Updatable } from "./types.js";

const nwjs = require("nw.gui");

export class Game {
    static updateQueue: Updatable[];
    static running = true;
    static time = 0;

    static {
        Game.updateQueue = new Array<Updatable>();
    }

    static start() {
        requestAnimationFrame(this.gameloop.bind(this));
    }

    static addToUpdateQueue(object: Updatable) {
        this.updateQueue.push(object);
    }

    static gameloop(t: number) {
        const now = t * 0.001;
        const dt = Math.min(0.1, now - this.time);
        this.time = now;

        this.updateQueue.forEach((u) => u.update(dt));

        if (this.running) {
            requestAnimationFrame(this.gameloop.bind(this));
        }
    }

    static stop() {
        this.running = false;
        nwjs.App.closeAllWindows();
    }
}
