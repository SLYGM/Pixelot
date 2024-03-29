export class Type {
    parse(value: string): any {
        throw new TypeError("using base Type.parse is not allowed");
    }

    stringify(value: any): string {
        throw new TypeError("using base Type.stringify is not allowed");
    }
}

class StringType extends Type{
    override parse(value: string): string {
        return value;
    }

    override stringify(value: string): string {
        return value;
    }
}

class NumberType extends Type {
    override parse(value: string): number {
        return parseFloat(value);
    }

    override stringify(value: number): string {
        return value.toString();
    }
}

class BoolType extends Type {
    override parse(value: string): boolean {
        return value === "true";
    }

    override stringify(value: boolean): string {
        return value.toString();
    }
}

class FileType extends Type {
    override parse(value: string): string {
        return value;
    }

    override stringify(value: string): string {
        return value;
    }
}

export class Types {
    static String = new StringType();
    static Number = new NumberType();
    static Boolean = new BoolType();
    static File = new FileType();
}
