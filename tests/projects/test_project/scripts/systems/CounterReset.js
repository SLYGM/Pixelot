import * as engine from 'retro-engine';
import Counter from '../components/Counter.js';

export default class TestSystem2 extends engine.System {
    component = Counter;

    update(entities) {
        for (const entity of entities) {
            entity.get(Counter).counter = 0;
        }
    }
}
