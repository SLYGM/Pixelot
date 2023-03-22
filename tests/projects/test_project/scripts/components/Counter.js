import * as engine from 'retro-engine';

export default class Counter extends engine.Component {
    counter = 0;
    onCreateRun = false;
    onDeleteRun = false;

    onCreate() {
        this.onCreateRun = !this.onCreateRun;
    }

    onDelete() {
        this.onDeleteRun = !this.onDeleteRun;
    }
}

