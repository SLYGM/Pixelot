import { expect, test } from '@jest/globals';
import { Component, ComponentType, GameObjectBase, System } from './ecs.js';
import { Scene } from './scene.js';

class TestComponent extends Component {
  counter: number = 0;
}

class TestEntity extends GameObjectBase {
  counter: number = 0;
  onCreateRun: boolean = false;

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

test('Game Object Functionality', () => {
  const scene = new Scene();
  scene.onCreate();

  const testEntity = new TestEntity("test");
  scene.addEntity(testEntity);
  scene.update();
  scene.update();

  expect(testEntity.counter).toBe(2);
  expect(testEntity.onCreateRun).toBe(true);
});

test('System Functionality', () => {
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
});
