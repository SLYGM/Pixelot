import { beforeAll, expect, jest, test } from "@jest/globals";
import { Renderer, Scene, SceneManager, doProjectImports} from "retro-engine";

beforeAll(async () => {
    // Tell jest to mock things that don't work in the test environment
    // @ts-ignore
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
    }));
    // @ts-ignore
    global.OffscreenCanvas = jest.fn().mockImplementation(() => ({
        getContext: jest.fn(),
    }));
    Renderer.addLayer = jest.fn();
    // @ts-ignore
    Renderer.getLayer = jest.fn();
    // @ts-ignore
    Renderer.loadTexture = jest.fn();

    await doProjectImports("test_project", "test");
    SceneManager.project_dir = "./projects/test_project/";
});

test("Load and edit scene", () => {
    SceneManager.switchToScene("test_scene");
    const scene = SceneManager.loaded_scenes.get("test_scene");
    expect(scene).not.toBe(undefined);
    expect(SceneManager.currentScene).toBe(scene);
    expect(scene.name).toBe("test_scene");
    expect(SceneManager.getSceneNames()).toEqual(["test_scene"]);
    const entities = scene.getEntities();
    expect(entities.length).toBe(2);

    SceneManager.unloadScene("test_scene");
    expect(SceneManager.loaded_scenes.get("test_scene")).toBe(undefined);
    expect(SceneManager.getSceneNames()).toEqual([]);
    expect(SceneManager.currentScene).toBe(null);
});

test("Preload scene", () => {
    SceneManager.preLoadScene("test_scene");
    const scene = SceneManager.loaded_scenes.get("test_scene");
    expect(scene).not.toBe(undefined);
    expect(SceneManager.currentScene).toBe(null);
    expect(scene.name).toBe("test_scene");
    expect(SceneManager.getSceneNames()).toEqual(["test_scene"]);
    const entities = scene.getEntities();
    expect(entities.length).toBe(2);

    SceneManager.switchToScene("test_scene");
    expect(SceneManager.currentScene).toBe(scene);

    SceneManager.unloadScene("test_scene");
    expect(SceneManager.loaded_scenes.get("test_scene")).toBe(undefined);
    expect(SceneManager.getSceneNames()).toEqual([]);
    expect(SceneManager.currentScene).toBe(null);
});

test("LoadSystem Args", () => {
    SceneManager.preLoadScene("system_args");
    const scene = SceneManager.loaded_scenes.get("system_args");
    expect(scene).not.toBe(undefined);

    scene!.update();
    const ent = scene!.getEntity("sys_arg_test_entity");
    expect((ent as any).SysArgs.num).toBe(5);
});