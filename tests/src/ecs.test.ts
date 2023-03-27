import { beforeAll, expect, test } from "@jest/globals";
import { Component, ComponentType, GameObjectBase, ImportManager, System, doProjectImports } from "retro-engine";
import { Scene } from "retro-engine/build/scene";
import TestEntity from "../projects/test_project/scripts/entities/TestEntity.js";
import Counter from "../projects/test_project/scripts/components/Counter.js";
import DependencyTest from "../projects/test_project/scripts/components/DependencyTest.js";

beforeAll(async () => {
    console.log("Importing project scripts...");
    await doProjectImports("test_project", "test");
});

test("Game Object Functionality", () => {
    const scene = new Scene("");

    // const TestEntity = ImportManager.getEntity("TestEntity");
    // const testEntity: any = new TestEntity.constr("test");
    const testEntity: any = new TestEntity("test");
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

    const testEntity: any = new TestEntity("test");
    testEntity.add(new Counter());
    scene.addEntity(testEntity);
    console.log("TODO: test fails because systems are not being added properly");
    console.log("systems", scene.systems);
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
    const testEntity: any = new TestEntity("test");

    testEntity.add(new Counter());

    const counter = testEntity.getByName("Counter");

    expect(counter.onCreateRun).toBe(true);
    expect(counter.onDeleteRun).toBe(false);

    testEntity.removeByName("Counter");

    expect(testEntity.getByName("Counter")).toBe(undefined);
    expect(counter.onDeleteRun).toBe(true);
});

test("Component Dependencies", () => {
    const scene = new Scene("");

    const testEntity: any = new TestEntity("test");

    expect(() => testEntity.add(new DependencyTest())).toThrowError('Component \'DependencyTest\' requires \'Counter\'');
    testEntity.add(new Counter());
    testEntity.add(new DependencyTest());
    scene.addEntity(testEntity);
    scene.update();
    scene.update();

    expect(testEntity.hasAll([Counter, DependencyTest])).toBe(true);
    expect(testEntity.counter).toBe(2);
    expect(testEntity.get(Counter).counter).toBe(2);
});
