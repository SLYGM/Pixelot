export class Type {
    parse(value: string): any {
        throw new TypeError("using base Type.parse is not allowed");
    }

    stringify(value: any): string {
        throw new TypeError("using base Type.stringify is not allowed");
    }
}

class StringType extends Type{
    parse(value: string): string {
        return value;
    }

    stringify(value: string): string {
        return value;
    }
}

class NumberType extends Type {
    parse(value: string): number {
        return parseFloat(value);
    }

    stringify(value: number): string {
        return value.toString();
    }
}

class BoolType extends Type {
    parse(value: string): boolean {
        return value === "true";
    }

    stringify(value: boolean): string {
        return value.toString();
    }
}

export class Types {
    static String = new StringType();
    static Number = new NumberType();
    static Boolean = new BoolType();
}