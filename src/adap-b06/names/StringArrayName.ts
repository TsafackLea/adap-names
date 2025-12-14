import { DEFAULT_DELIMITER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringArrayName extends AbstractName {

    protected readonly components: string[] = [];

    constructor(source: string[], delimiter: string = DEFAULT_DELIMITER) {
        super(delimiter);

        IllegalArgumentException.assert(Array.isArray(source), "source must be an array");
        this.components = source.slice();

        
        InvalidStateException.assert(this.delimiter.length == 1, "delimiter must be 1 char");
    }

    public clone(): Name {
        return new StringArrayName(this.components, this.delimiter);
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        IllegalArgumentException.assert(i >= 0 && i < this.components.length, "index out of bounds");
        return this.components[i];
    }

    
    public setComponent(i: number, c: string): Name {
        IllegalArgumentException.assert(i >= 0 && i < this.components.length, "index out of bounds");
        const copy = this.components.slice();
        copy[i] = c;
        return new StringArrayName(copy, this.delimiter);
    }

    public insert(i: number, c: string): Name {
        IllegalArgumentException.assert(i >= 0 && i <= this.components.length, "index out of bounds");
        const copy = this.components.slice();
        copy.splice(i, 0, c);
        return new StringArrayName(copy, this.delimiter);
    }

    public append(c: string): Name {
        const copy = this.components.slice();
        copy.push(c);
        return new StringArrayName(copy, this.delimiter);
    }

    public remove(i: number): Name {
        IllegalArgumentException.assert(i >= 0 && i < this.components.length, "index out of bounds");
        const copy = this.components.slice();
        copy.splice(i, 1);
        return new StringArrayName(copy, this.delimiter);
    }

    public concat(other: Name): Name {
        
        InvalidStateException.assert(this.delimiter.length == 1, "delimiter invariant");

        const n1 = this.getNoComponents();
        const n2 = other.getNoComponents();

        const merged = this.components.slice();
        for (let i = 0; i < n2; i++) {
            merged.push(other.getComponent(i));
        }

        const result = new StringArrayName(merged, this.delimiter);

        
        MethodFailedException.assert(result.getNoComponents() == n1 + n2, "concat postcondition");

        return result;
    }
}
