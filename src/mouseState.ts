import { _canvas } from './renderer/gl.js';
import { Renderer } from './renderer/renderer.js'

export class MouseState {
    static screen_pos = { x: 0, y: 0 };
    static world_pos = { x: 0, y: 0 };
    private static btns: Map<MouseEvent['button'], boolean>;

    static {
        this.btns = new Map();

        // track mouse position
        // TODO: the mouse position is unknown until the mouse is moved
        document.addEventListener('mousemove', event => {
            this.handleMouseMove(event);
        })

        document.addEventListener('mouseup', event => {
            this.handleMouseUp(event);
        })
    }

    private static handleMouseMove(event: MouseEvent) {
        this.updatePos(event.clientX, event.clientY);
    }

    private static updatePos(x: number, y: number) {
        this.screen_pos.x = x;
        this.screen_pos.y = y;

        let frac_x = x/_canvas.clientWidth;
        let frac_y = y/_canvas.clientHeight;
        // TODO: stop using hard-coded canvas values
        this.world_pos.x = Renderer.viewport.x + 428 * Renderer.viewport.sx * frac_x;
        this.world_pos.y = Renderer.viewport.x + 240 * Renderer.viewport.sx * frac_y;
    }

    private static handleMouseUp(event: MouseEvent) {
        this.btns.set(event.button, false);
    }

    private static handleMouseDown(event: MouseEvent) {
        this.btns.set(event.button, true);
    }

    static isPressed(btn: MouseEvent['button']) {
        if (this.btns.has(btn)) {
            return this.btns.get(btn);
        }

        // if the button doesn't appear in the map, then it hasn't been pressed yet
        return false;
    }
}