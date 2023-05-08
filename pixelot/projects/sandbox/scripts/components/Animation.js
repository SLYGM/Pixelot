import Sprite from "./Sprite.js";

export default class Animation extends engine.Component {
    dependencies = [Sprite];

    static arg_names = ["frame 1", "frame 2", "frame 3", "frame 4", "time per frame"];
    static arg_types = [engine.Types.File, engine.Types.File, engine.Types.File, engine.Types.File, engine.Types.Number];

    frame = 0;
    frame_timer = 0;
    frames = [null, null, null, null];

    constructor(frame1, frame2, frame3, frame4, time_per_frame) {
        super();
        this.frames[0] = frame1;
        this.frames[1] = frame2;
        this.frames[2] = frame3;
        this.frames[3] = frame4;
        this.time_per_frame = time_per_frame;
        this.frame_timer = time_per_frame;
    }
}