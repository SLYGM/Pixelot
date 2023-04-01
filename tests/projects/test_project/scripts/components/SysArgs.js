import * as engine from 'retro-engine';

export default class SysArgs extends engine.Component {
    static arg_names = [];
    static arg_types = [];
    num = 0;

    constructor() {
        super();
    }
}
