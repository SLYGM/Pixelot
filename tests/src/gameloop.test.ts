import { beforeAll, expect, jest, test } from "@jest/globals";
import { GLUtils, Game, Renderer, SceneManager, doProjectImports, loadGL } from "retro-engine";

beforeAll(async () => {
    // Loading webgl in the test environment doesn't work, so we tell jest to mock these functions
    Renderer.setResolution = jest.fn();
    // @ts-ignore
    Game.loadTextures = jest.fn();

    await doProjectImports("test_project", "test");
    SceneManager.project_dir = "./projects/test_project/";
});

test("Load game", () => {
    Game.loadGame("./projects/test_project/");
    expect(Game.start_scene).toBe("test_scene");
});
