import { Renderer, SpriteLayer } from "./renderer/renderer.js";
import { Updatable } from "./types.js";
import { SceneManager } from "./sceneManager.js";
import { ImportManager } from "./importManager.js";
import { PostProcessing } from "./engineExport.js";

const nw = (window as any).nw;

export class Game {
    static updateQueue: Updatable[];
    static running = true;
    static render_only = false;
    static time = 0;
    static start_scene: string;

    static {
        Game.updateQueue = new Array<Updatable>();
    }

    static start(render_only: boolean = false) {
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
     * @param src the path to the project json
     */
    static loadGame(projJSONPath: string) {
        const fs = nw.require("fs");

        // load the project json which contains all info needed to initialise the game
        const data = fs.readFileSync(projJSONPath, {encoding: "utf-8"});
        const game_data = JSON.parse(data.toString());
    
        Renderer.setResolution(game_data["resolution"][0], game_data["resolution"][1]);
        this.loadLayers(game_data["layers"]);
        this.loadTextures(game_data["textures"]);
        this.loadShaders(game_data["shaders"]);

        this.start_scene = game_data["start_scene"];
    }
    
    private static loadLayers(layers: string[]) {
        for (const layer of layers) {
            Renderer.addLayer(new SpriteLayer(), layer);
        }
    }
    
    private static loadTextures(textures: {name: string, path: string}[]) {
        for (const texture of textures) {
            Renderer.loadTexture(texture["path"], texture["name"]);
        }
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
        nw.App.closeAllWindows();
    }
}
