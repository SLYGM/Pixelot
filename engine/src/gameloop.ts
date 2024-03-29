import { Renderer, SpriteLayer } from "./renderer/renderer.js";
import { Updatable } from "./types.js";
import { SceneManager } from "./sceneManager.js";
import { ImportManager } from "./importManager.js";
import { PostProcessing } from "./renderer/post_process.js";
import { PathUtils } from "./utils/baseutils.js";

const nw = (window as any).nw;
let fs;
if (nw) {
    fs = nw.require("fs");
} else {
    fs = require("fs");
}

export class Game {
    static updateQueue: Updatable[];
    static running = true;
    static render_only = false;
    static time = 0;
    static start_scene: string;
    static isDevMode: boolean = true;
    static project_name: string;

    static {
        Game.updateQueue = new Array<Updatable>();
    }

    static start(render_only = false) {
        Game.addToUpdateQueue(SceneManager);
        SceneManager.switchToScene(this.start_scene);

        this.render_only = render_only;
        requestAnimationFrame(this.gameloop.bind(this));
    }

    static addToUpdateQueue(object: Updatable) {
        this.updateQueue.push(object);
    }

    private static gameloop(t: number) {
        const now = t * 0.001;
        const dt = Math.min(0.1, now - this.time);
        this.time = now;

        if (!this.render_only) this.updateQueue.forEach((u) => u.update(dt));
        //call the renderer to update - should always be done last
        Renderer.render();

        if (this.running) {
            requestAnimationFrame(this.gameloop.bind(this));
        }
    }

    /**
     * Load a project from a project json file
     * 
     * @param project_dir (optional) The path to the root of the project (containing the .proj file).
     * Required for projects loaded via the UI, but not for built projects.
     */
    static loadGame(project_dir?: string) {
        this.isDevMode = project_dir ? true : false;
        let project_file_path: string;
        if (project_dir) {
            SceneManager.project_dir = project_dir;
            // to find the project name, find the folder name after the projects folder
            const path_folders = project_dir.split('/');
            const projects_index = path_folders.findIndex((s) => s === 'projects');
            this.project_name = path_folders[projects_index + 1];
            project_file_path = project_dir + "/project.proj";
        } else {
            project_file_path = "./game/project.proj";
        }

        // load the project json which contains all info needed to initialise the game
        const data = fs.readFileSync(project_file_path, {encoding: "utf-8"});
        const game_data = JSON.parse(data.toString());
    
        Renderer.setResolution(game_data["resolution"][0], game_data["resolution"][1]);
        this.loadShaders(game_data["shaders"]);

        this.start_scene = game_data["start_scene"];
    }
    
    private static loadShaders(shaders: {name: string, args: any[]}[]) {
        for (const shader of shaders) {
            const typed_constr = ImportManager.getShader(shader["name"]);
            const args = typed_constr.parseArgs(shader["args"]);
            PostProcessing.add(new typed_constr.constr(...args));
        }
    }

    static stop() {
        this.running = false;
        if (nw) {
            nw.App.closeAllWindows();
        }
    }
}
