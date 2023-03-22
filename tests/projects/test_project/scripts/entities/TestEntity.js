import * as engine from 'retro-engine';

export default class TestEntity extends engine.GameObjectBase {
    counter = 0;
    onCreateRun = false;
    onDeleteRun = false;

    onCreate() {
        this.onCreateRun = !this.onCreateRun;
    }

    update() {
        this.counter++;
    }

    onDelete() {
        this.onDeleteRun = !this.onDeleteRun;
    }
}
