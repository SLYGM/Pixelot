import { Type } from "./argTypes.js";
import { Constructor } from "./types.js";

export class TypedConstructor<T> {
    arg_names: string[];
    arg_types: Type[];
    constr: Constructor<T>;


    constructor(arg_names: string[], arg_types: Type[], constr: Constructor<T>) {
        this.arg_names = arg_names;
        this.arg_types = arg_types;
        this.constr = constr;
    }

    parseArgs(args: string[]): any[] {
        const parsed_args: any[] = [];
        for (let i = 0; i < this.arg_names.length; i++) {
            parsed_args.push(this.arg_types[i].parse(args[i]));
        }
        return parsed_args;
    }
}