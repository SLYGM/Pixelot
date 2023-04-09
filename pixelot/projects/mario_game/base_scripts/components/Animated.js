import Sprite from "./Sprite.js";

export default class Animated extends engine.Component {
    dependencies = [Sprite];
    static arg_names = [];
    static arg_types = [];

    num_frames = 2;
    frame = 0;
    frame_time = 3;
    frame_timer = 0;
    frames_per_row = 2;

    frame_width = 1;
    frame_height = 1;
    

    constructor() {
        super();
    }

    onCreate() {
        const sprite = this.owner.get(Sprite);
        const texInfo = sprite.tex;
        if (texInfo !== undefined) {
            this.frame_width = 1 / this.frames_per_row;
            this.frame_height = 1 / Math.ceil(this.num_frames / this.frames_per_row);
            sprite.texture_offset = {x: 0, y: 0};
            sprite.texture_scale = {x: this.frame_width, y: this.frame_height};
            setTimeout(() => this.update(), 20);
        }
        else {
            // wait a couple seconds, then try again
            setTimeout(() => this.onCreate(), 2000);
        }
    }

    update() {
        this.frame_timer += 1;
        if (this.frame_timer < this.frame_time) {setTimeout(() => this.update(), 20);return;};
        
        this.frame_timer %= this.frame_time;
        this.frame = (this.frame + 1) % this.num_frames;
        
        if (!this.owner) return;
        const sprite = this.owner.get(Sprite);
        let offset = sprite.texture_offset;
        offset.x = (this.frame % this.frames_per_row) * this.frame_width;
        offset.y = Math.floor(this.frame / this.frames_per_row) * this.frame_height;
        setTimeout(() => this.update(), 20);
    }    

}