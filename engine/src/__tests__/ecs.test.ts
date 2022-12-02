import { expect, test } from "@jest/globals";
import { Component, ComponentType, GameObjectBase, System } from "../ecs.js";
import { Scene } from "../scene.js";

class TestComponent extends Component {
    counter = 0;
}

class TestComponent2 extends Component {
    override dependencies = [TestComponent];
}

class TestEntity extends GameObjectBase {
    counter = 0;
    onCreateRun = false;

    onCreate(): void {
        this.onCreateRun = !this.onCreateRun;
    }

    update(): void {
        this.counter++;
    }
}

class TestSystem extends System {
    component: ComponentType<Component> = TestComponent;

    update(entities: Set<GameObjectBase>): void {
        for (const entity of entities) {
            entity.get(TestComponent).counter++;
        }
    }
}

test("Game Object Functionality", () => {
    const scene = new Scene();
    scene.onCreate();

    const testEntity = new TestEntity("test");
    scene.addEntity(testEntity);
    scene.update();
    scene.update();

    expect(testEntity.counter).toBe(2);
    expect(testEntity.onCreateRun).toBe(true);
});

test("System Functionality", () => {
    const scene = new Scene();
    scene.onCreate();

    const testEntity = new TestEntity("test");
    testEntity.add(new TestComponent());
    scene.addEntity(testEntity);
    scene.addSystem(new TestSystem(), 0);
    scene.update();
    scene.update();

    expect(testEntity.counter).toBe(2);
    expect(testEntity.get(TestComponent).counter).toBe(2);
    expect(testEntity.getAllComponents()).toEqual(["TestComponent"]);
});

test("Component Dependencies", () => {
    const scene = new Scene();
    scene.onCreate();

    const testEntity = new TestEntity("test");
    expect(() => testEntity.add(new TestComponent2)).toThrowError('Component \'TestComponent2\' requires \'TestComponent\'');
    testEntity.add(new TestComponent());
    testEntity.add(new TestComponent2());
    scene.addEntity(testEntity);
    scene.addSystem(new TestSystem(), 0);
    scene.update();
    scene.update();

    expect(testEntity.hasAll([TestComponent, TestComponent2])).toBe(true);
    expect(testEntity.counter).toBe(2);
    expect(testEntity.get(TestComponent).counter).toBe(2);
});
