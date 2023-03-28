import { beforeAll, expect, test } from "@jest/globals";
import { Scene, SceneManager, doProjectImports } from "retro-engine";

beforeAll(async () => {
    console.log("Importing project scripts...");
    await doProjectImports("test_project", "test");
});

test("Load and edit scene", () => {
    SceneManager.loadScene("./projects/test_project/scenes/test_scene.scene");
    const scene = SceneManager.loaded_scenes.get("test_scene");
    expect(scene).not.toBe(null);
    expect(SceneManager.currentScene).toBe(scene);
    expect(scene.name).toBe("test_scene");
    expect(SceneManager.getSceneNames()).toEqual(["test_scene"]);
    const entities = scene.getEntities();
    expect(entities.size).toBe(2);

    SceneManager.unloadScene("test_scene");
    expect(SceneManager.loaded_scenes.get("test_scene")).toBe(undefined);
    expect(SceneManager.getSceneNames()).toEqual([]);
    expect(SceneManager.currentScene).toBe(null);
});
