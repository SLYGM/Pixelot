import { beforeAll, expect, test } from "@jest/globals";
import { Scene, doProjectImports } from "retro-engine";

beforeAll(async () => {
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

    expect(entity.getAllComponents()).toEqual(["Position", "Sprite", "Velocity"]);
    expect(entity.getComponent("Position").x).toBe(1);
    expect(entity.getComponent("Position").y).toBe(2);
    expect(entity.getComponent("Velocity").x).toBe(3);
    expect(entity.getComponent("Velocity").y).toBe(4);
    expect(entity.getComponent("Sprite").z_index).toBe(0);
});
