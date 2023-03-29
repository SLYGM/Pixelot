import { beforeAll, expect, test } from "@jest/globals";
import { Scene, doProjectImports, Renderer } from "retro-engine";

beforeAll(async () => {
    // @ts-ignore
    Renderer.getLayer = jest.fn();
    console.log("Importing project scripts...");
    await doProjectImports("test_project", "test");
});

test("Load prefab", () => {
    const scene = new Scene("");

    scene.spawnPrefab("test_prefab", []);

    expect(scene.getEntities().size).toBe(1);
    // NOTE: This is the only way to get the entity since entities created from prefabs are not given a name.
    // This should probably be changed in the future.
    const entity = scene.getEntities().values().next().value;

    const allComponents = entity.getAllComponents();
    expect(allComponents.length).toBe(3);
    expect(allComponents.includes("Position")).toBe(true);
    expect(allComponents.includes("Velocity")).toBe(true);
    expect(allComponents.includes("Sprite")).toBe(true);
    expect(entity.Position.x).toBe(1);
    expect(entity.Position.y).toBe(2);
    expect(entity.Velocity.x).toBe(3);
    expect(entity.Velocity.y).toBe(4);
    expect(entity.Sprite.zindex).toBe(0);
});
