export class KeyStates {
    private static states: Map<KeyboardEvent["key"], boolean>;
    static {
        this.states = new Map();

        if (document) {
            // attach keydown handler
            document.addEventListener("keydown", (event) => {
                this.keyDownHandler(event);
            });

            // attach keyup handler
            document.addEventListener("keyup", (event) => {
                this.keyUpHandler(event);
            });
        }
    }

    static keyDownHandler(event: KeyboardEvent) {
        this.states.set(event.key, true);
    }

    static keyUpHandler(event: KeyboardEvent) {
        this.states.set(event.key, false);
    }

    static isPressed(key: KeyboardEvent["key"]) {
        if (this.states.has(key)) {
            return this.states.get(key);
        }

        // if there is not yet an entry in the map, then the key hasn't been pressed
        return false;
    }
}
