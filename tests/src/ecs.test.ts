import { beforeAll, expect, test } from "@jest/globals";
import { Component, ComponentType, GameObjectBase, ImportManager, System, doProjectImports } from "retro-engine";
import { Scene } from "retro-engine/build/scene";

beforeAll(async () => {
    console.log("Importing project scripts...");
    await doProjectImports("test_project", "test");
});

test("Game Object Functionality", () => {
    const scene = new Scene("");

    const TestEntity = ImportManager.getEntity("TestEntity");
    const testEntity: any = new TestEntity.constr("test");
    scene.addEntity(testEntity);
    scene.update();
    scene.update();

    expect(testEntity.counter).toBe(2);
    expect(testEntity.onCreateRun).toBe(true);
    expect(testEntity.onDeleteRun).toBe(false);
    scene.deleteEntity("test");
    expect(testEntity.onDeleteRun).toBe(true);
});

test("System Functionality", () => {
    const scene = new Scene("");

    const TestEntity = ImportManager.getEntity("TestEntity");
    const testEntity: any = new TestEntity.constr("test");
    const Counter = ImportManager.getComponent("Counter");
    testEntity.add(new Counter.constr());
    scene.addEntity(testEntity);
    scene.update();
    scene.update();

    expect(testEntity.counter).toBe(2);
    expect(testEntity.getByName("Counter").counter).toBe(2);
    expect(testEntity.getAllComponents()).toEqual(["Counter"]);
});

// test("System Priority", () => {
    // const scene = new Scene("");

    // const testEntity = new TestEntity("test");
    // testEntity.add(new TestComponent());
    // scene.addEntity(testEntity);
    // const system1 = new TestSystem();
    // const system2 = new TestSystem2();
    // scene.addSystem(system1, 0);
    // scene.addSystem(system2, 1);
    // scene.update();

    // expect(testEntity.get(TestComponent).counter).toBe(0);

    // scene.removeSystem(system1);
    // scene.removeSystem(system2);
    // scene.addSystem(system2, 0);
    // scene.addSystem(system1, 1);
    // scene.update();

    // expect(testEntity.get(TestComponent).counter).toBe(1);
// });

test("Component Functionality", () => {
    const TestEntity = ImportManager.getEntity("TestEntity");
    const testEntity: any = new TestEntity.constr("test");
    const Counter = ImportManager.getComponent("Counter");

    testEntity.add(new Counter.constr());

    const counter = testEntity.getByName("Counter");

    expect(counter.onCreateRun).toBe(true);
    expect(counter.onDeleteRun).toBe(false);

    testEntity.removeByName("Counter");

    expect(testEntity.getByName("Counter")).toBe(undefined);
    expect(counter.onDeleteRun).toBe(true);
});

test("Component Dependencies", () => {
    const scene = new Scene("");

    const TestEntity = ImportManager.getEntity("TestEntity");
    const testEntity: any = new TestEntity.constr("test");
    const Counter = ImportManager.getComponent("Counter");
    const DependencyTest = ImportManager.getComponent("DependencyTest");

    expect(() => testEntity.add(new DependencyTest.constr())).toThrowError('Component \'DependencyTest\' requires \'Counter\'');
    testEntity.add(new Counter.constr());
    testEntity.add(new DependencyTest.constr());
    scene.addEntity(testEntity);
    scene.update();
    scene.update();

    expect(testEntity.hasAll([Counter, DependencyTest])).toBe(true);
    expect(testEntity.counter).toBe(2);
    expect(testEntity.get(Counter).counter).toBe(2);
});
