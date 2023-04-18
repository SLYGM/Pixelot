import { expect, test } from "@jest/globals";
import { Scene } from "retro-engine";
import TestEntity from "../projects/test_project/scripts/entities/TestEntity.js";
import Counter from "../projects/test_project/scripts/components/Counter.js";
import CounterIncrement from "../projects/test_project/scripts/systems/Counter.js";
import DependencyTest from "../projects/test_project/scripts/components/DependencyTest.js";

test("Game Object Functionality", () => {
    const scene = new Scene("");

    const testEntity: any = new TestEntity("test");
    scene.addEntity(testEntity);
    scene.update(0);
    scene.update(0);

    expect(testEntity.counter).toBe(2);
    expect(testEntity.onCreateRun).toBe(true);
    expect(testEntity.onDeleteRun).toBe(false);
    scene.deleteEntityByName("test");
    expect(testEntity.onDeleteRun).toBe(true);
});

test("Un-named Entities", () => {
    const scene = new Scene("");

    const testEntity1 = new TestEntity();
    const testEntity2 = new TestEntity();
    const testEntity3 = new TestEntity("named");
    scene.addEntity(testEntity1);
    scene.addEntity(testEntity2);
    scene.addEntity(testEntity3);
    scene.update(0);
    scene.update(0);

    expect(testEntity1.counter).toBe(2);
    expect(testEntity1.onCreateRun).toBe(true);
    expect(testEntity2.counter).toBe(2);
    expect(testEntity2.onCreateRun).toBe(true);
    expect(scene.getEntities().length).toBe(3);
    expect(scene.getEntity("named")).toBe(testEntity3);

    scene.deleteEntity(testEntity1);
    expect(scene.getEntities().length).toBe(2);
    expect(testEntity1.onDeleteRun).toBe(true);
});

test("System Functionality", () => {
    const scene = new Scene("");

    const testEntity: any = new TestEntity("test");
    testEntity.add(new Counter());
    scene.addEntity(testEntity);
    scene.addSystem(new CounterIncrement(), 0);
    scene.update(0);
    scene.update(0);

    expect(testEntity.counter).toBe(2);
    expect(testEntity.getByName("Counter").counter).toBe(2);
    expect(testEntity.getAllComponents()).toEqual(["Counter"]);
});

test("Component Functionality", () => {
    const testEntity: any = new TestEntity("test");
    testEntity.add(new Counter());

    const counter = testEntity.getByName("Counter");
    expect(counter.counter).toBe(0);
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
    scene.addSystem(new CounterIncrement(), 0);
    scene.update(0);
    scene.update(0);

    expect(testEntity.hasAll([Counter, DependencyTest])).toBe(true);
    expect(testEntity.counter).toBe(2);
    expect(testEntity.get(Counter).counter).toBe(2);
});

test("Entity delta time", () => {
    const scene = new Scene("");

    const testEntity: any = new TestEntity("test");
    scene.addEntity(testEntity);
    scene.update(0.5);

    expect(testEntity.dt).toBe(0.5);
});

test("System delta time", () => {
    const scene = new Scene("");

    const testEntity: any = new TestEntity("test");
    testEntity.add(new Counter());
    scene.addEntity(testEntity);
    scene.addSystem(new CounterIncrement(), 0);
    scene.update(0.5);

    expect(testEntity.Counter.system_dt).toBe(0.5);
});
