import Sprite from "./Sprite.js";

export default class PlatformerAnimation extends engine.Component {
    dependencies = [Sprite];
    //Note: this could be much simpler if we could flip the texture, but that's not supported yet, and faster to do it this way for this demo
    static arg_names = ["idle_left_source", "idle_right_source", "walk_left_source", "walk_right_source", "jump_left_source", "jump_right_source"];
    static arg_types = [engine.Types.File, engine.Types.File, engine.Types.File, engine.Types.File, engine.Types.File, engine.Types.File];

    frame = 0;
    frame_timer = 0;
    frame_width = 1;
    frame_height = 1;

    animations = {
        idle_left: {
            num_frames: 1,
            frame_time: 0,
            frames_per_row: 1,
            source: null
        },
        idle_right: {
            num_frames: 1,
            frame_time: 0,
            frames_per_row: 1,
            source: null
        },
        walk_right: {
            num_frames: 2,
            frame_time: 15,
            frames_per_row: 1,
            source: null
        },
        walk_left: {
            num_frames: 2,
            frame_time: 15,
            frames_per_row: 1,
            source: null
        },
        jump_left: {
            num_frames: 1,
            frame_time: 0,
            frames_per_row: 1,
            source: null
        },
        jump_right: {
            num_frames: 1,
            frame_time: 0,
            frames_per_row: 1,
            source: null
        }
    }

    animation = "idle_left";


    constructor(idle_left_source, idle_right_source, walk_left_source, walk_right_source, jump_left_source, jump_right_source) {
        super();
        if (idle_left_source != "" && idle_left_source != undefined && idle_left_source != null) {
            this.animations.idle_left.source = idle_left_source;
            engine.Renderer.loadTexture(engine.PathUtils.assetPath(idle_left_source));
        }
        if (idle_right_source != "" && idle_right_source != undefined && idle_right_source != null) {
            this.animations.idle_right.source = idle_right_source;
            engine.Renderer.loadTexture(engine.PathUtils.assetPath(idle_right_source));
        }
        if (walk_left_source != "" && walk_left_source != undefined && walk_left_source != null) {
            this.animations.walk_left.source = walk_left_source;
            engine.Renderer.loadTexture(engine.PathUtils.assetPath(walk_left_source));
        }
        if (walk_right_source != "" && walk_right_source != undefined && walk_right_source != null) {
            this.animations.walk_right.source = walk_right_source;
            engine.Renderer.loadTexture(engine.PathUtils.assetPath(walk_right_source));
        }
        if (jump_left_source != "" && jump_left_source != undefined && jump_left_source != null) {
            this.animations.jump_left.source = jump_left_source;
            engine.Renderer.loadTexture(engine.PathUtils.assetPath(jump_left_source));
        }
        if (jump_right_source != "" && jump_right_source != undefined && jump_right_source != null) {
            this.animations.jump_right.source = jump_right_source;
            engine.Renderer.loadTexture(engine.PathUtils.assetPath(jump_right_source));
        }
    }

    updateFrameDetails() {
        const sprite = this.owner.get(Sprite);
        const anim = this.animations[this.animation];
        const texInfo = sprite.tex;
        if (texInfo !== undefined) {
            this.frame_width = 1 / anim.frames_per_row;
            this.frame_height = 1 / Math.ceil(anim.num_frames / anim.frames_per_row);
            sprite.texture_offset = { x: 0, y: 0 };
            sprite.texture_scale = { x: this.frame_width, y: this.frame_height };
        }
        else {
            // wait a couple seconds, then try again
            setTimeout(() => this.updateFrameDetails(), 100);
        }
    }

    setAnimation(animation) {
        // console.log("setAnimation", animation);
        if (this.animation === animation) return;
        const sprite = this.owner.get(Sprite);
        const anim = this.animations[animation];
        // console.log("setAnimation", animation, anim)
        if (anim === undefined) return;
        if (anim.source === null) return;
        this.animation = animation;
        sprite.setTex(anim.source);
        const texInfo = sprite.tex;
        this.updateFrameDetails();
        // console.log("setAnimation", animation, texInfo, this.frame_width, this.frame_height, this.frame);
        this.frame = 0;
        this.frame_timer = 0;
    }


    onCreate() {
        this.setAnimation("idle_left");
    }

    update() {
        const anim = this.animations[this.animation];
        this.frame_timer += 1;
        if (this.frame_timer < anim.frame_time || anim.num_frames <= 1) { return; };

        this.frame_timer %= anim.frame_time;
        this.frame = (this.frame + 1) % anim.num_frames;

        if (!this.owner) return;
        const sprite = this.owner.get(Sprite);
        let offset = sprite.texture_offset;
        offset.x = (this.frame % anim.frames_per_row) * this.frame_width;
        offset.y = Math.floor(this.frame / anim.frames_per_row) * this.frame_height;
        // setTimeout(() => this.update(), 20);
    }

}