import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringName extends AbstractName {

    protected readonly name: string = "";
    protected readonly noComponents: number = 0;

    constructor(source: string, delimiter: string = DEFAULT_DELIMITER) {
        super(delimiter);

        IllegalArgumentException.assert(typeof source == "string", "source must be a string");

        this.name = source;
        this.noComponents = (source == "") ? 0 : source.split(this.delimiter).length;

        InvalidStateException.assert(this.delimiter.length == 1, "delimiter must be 1 char");
    }

    public clone(): Name {
        return new StringName(this.name, this.delimiter);
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        IllegalArgumentException.assert(i >= 0 && i < this.noComponents, "index out of bounds");
        IllegalArgumentException.assert(this.noComponents != 0, "name has no components");

        const parts = this.name.split(this.delimiter);
        return parts[i];
    }

    public setComponent(i: number, c: string): Name {
        IllegalArgumentException.assert(i >= 0 && i < this.noComponents, "index out of bounds");

        const parts = (this.noComponents == 0) ? [] : this.name.split(this.delimiter);
        parts[i] = c;

        return new StringName(parts.join(this.delimiter), this.delimiter);
    }

    public insert(i: number, c: string): Name {
        IllegalArgumentException.assert(i >= 0 && i <= this.noComponents, "index out of bounds");

        const parts = (this.noComponents == 0) ? [] : this.name.split(this.delimiter);
        parts.splice(i, 0, c);

        return new StringName(parts.join(this.delimiter), this.delimiter);
    }

    public append(c: string): Name {
        const parts = (this.noComponents == 0) ? [] : this.name.split(this.delimiter);
        parts.push(c);
        return new StringName(parts.join(this.delimiter), this.delimiter);
    }

    public remove(i: number): Name {
        IllegalArgumentException.assert(i >= 0 && i < this.noComponents, "index out of bounds");

        const parts = (this.noComponents == 0) ? [] : this.name.split(this.delimiter);
        parts.splice(i, 1);

        return new StringName(parts.join(this.delimiter), this.delimiter);
    }

    public concat(other: Name): Name {
        InvalidStateException.assert(this.delimiter.length === 1, "delimiter invariant");

        const n1 = this.getNoComponents();
        const n2 = other.getNoComponents();

        let s = this.name;

        if (n1 > 0 && n2 > 0) {
            s += this.delimiter;
        }

        for (let i = 0; i < n2; i++) {
            if (n1 > 0 || i > 0) {
                if (i > 0) s += this.delimiter;
            }
            s += other.getComponent(i);
        }

        const result = new StringName(s, this.delimiter);

        MethodFailedException.assert(result.getNoComponents() == n1 + n2, "concat postcondition");

        return result;
    }
}
