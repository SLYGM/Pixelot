import { Renderer, SpriteLayer } from "./renderer/renderer.js";

import { SceneManager } from "./sceneManager.js";
import { Game } from "./gameloop.js";

import { doImports, ImportManager } from "./importManager.js";
import { PostProcessing } from "./engineExport.js";

const fs = require("fs");

function loadGame() {
    // load the project.json which contains all info needed to initialise the game
    const data = fs.readFileSync('./project.json', {encoding: "utf-8"});
    const game_data = JSON.parse(data.toString());

    Renderer.setResolution(game_data["resolution"][0], game_data["resolution"][1]);
    loadLayers(game_data["layers"]);
    loadTextures(game_data["textures"]);
    loadShaders(game_data["shaders"]);

    Game.addToUpdateQueue(SceneManager);
    SceneManager.loadScene(game_data["start_scene"]);
    Game.start();
}

function loadLayers(layers: string[]) {
    for (const layer of layers) {
        Renderer.addLayer(new SpriteLayer(), layer);
    }
}

function loadTextures(textures: {name: string, path: string}[]) {
    for (const texture of textures) {
        Renderer.loadTexture(texture["path"], texture["name"]);
    }
}

function loadShaders(shaders: {name: string, args: any[]}[]) {
    for (const shader of shaders) {
        const typed_constr = ImportManager.getShader(shader["name"]);
        const args = typed_constr.parseArgs(shader["args"]);
        PostProcessing.add(new typed_constr.constr(...args));
    }
}


await doImports();
loadGame();
