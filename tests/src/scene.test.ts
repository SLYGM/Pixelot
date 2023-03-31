import { expect, test } from "@jest/globals";
import { Scene } from "retro-engine";
import TestEntity from "../projects/test_project/scripts/entities/TestEntity.js";
import CounterIncrement from "../projects/test_project/scripts/systems/Counter.js";
import CounterReset from "../projects/test_project/scripts/systems/CounterReset.js";
import Velocity from "../projects/test_project/scripts/components/Velocity.js";
import Counter from "../projects/test_project/scripts/components/Counter.js";

test("Basic functionality", () => {
    const scene = new Scene("test_scene");
    expect(scene).not.toBe(null);
    expect(scene.name).toBe("test_scene");
    expect(scene.getEntities().size).toBe(0);
    expect(scene.getSystems().length).toBe(0);

    scene.addEntity(new TestEntity("test_entity"));
    expect(scene.getEntities().size).toBe(1);

    scene.addSystem(new CounterIncrement(), 0);
    expect(scene.getSystems().length).toBe(1);

    scene.destroy();
    expect(scene.getEntities().size).toBe(0);
    expect(scene.getSystems().length).toBe(0);
});

test("Entity manipulation", () => {
    const scene = new Scene("test_scene");
    const entity = new TestEntity("test_entity");

    scene.addEntity(entity);
    expect(scene.getEntities().size).toBe(1);

    scene.renameEntity("test_entity", "new_name");
    expect(scene.getEntity("new_name")).toBe(entity);

    scene.addEntity(new TestEntity("test_entity_2"));
    expect(scene.getEntities().size).toBe(2);

    entity.add(new Velocity(1, 1));
    const entities = scene.getEntitiesWithComponent(Velocity);
    expect(entities.length).toBe(1);
    expect(entities[0]).toBe(entity);

    scene.deleteEntity("new_name");
    expect(scene.getEntities().size).toBe(1);
    expect(scene.getEntity("new_name")).toBe(undefined);
    scene.destroy();
});

test("System Priority", () => {
    const scene = new Scene("");

    const testEntity = new TestEntity("test");
    testEntity.add(new Counter());
    scene.addEntity(testEntity);
    const system1 = new CounterIncrement();
    const system2 = new CounterReset();
    scene.addSystem(system1, 0);
    scene.addSystem(system2, 1);
    scene.update();

    // Counter is reset after incrementing
    expect(testEntity.get(Counter).counter).toBe(0);

    scene.removeSystem(system1);
    scene.removeSystem(system2);
    scene.addSystem(system2, 0);
    scene.addSystem(system1, 1);
    scene.update();

    // Counter is reset before incrementing
    expect(testEntity.get(Counter).counter).toBe(1);
});
