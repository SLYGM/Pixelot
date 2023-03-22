import * as engine from 'retro-engine';
import Counter from './Counter.js';

export default class DependencyTest extends engine.Component {
    dependencies = [Counter];
}
