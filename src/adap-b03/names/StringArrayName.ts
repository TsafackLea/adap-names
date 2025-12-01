import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        
        this.components = (source ?? []).slice();
    }

    public clone(): Name {
        return new StringArrayName(this.components.slice(), this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
    }

    public asDataString(): string {
        return this.asString(this.delimiter);
    }

    public isEqual(other: Name): boolean {
        return super.isEqual(other);
    }

    public getHashCode(): number {
        return super.getHashCode();
    }

    public isEmpty(): boolean {
        return this.components.length == 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {

        return this.components.length;
        
    }

    public getComponent(n: number): string {
        if (n < 0 || n >= this.components.length) throw new RangeError("index out of bounds");
        return this.components[n];
    }

    public setComponent(n: number, c: string) {
       if (n < 0 || n >= this.components.length) throw new RangeError("index out of bounds");
        this.components[n] = c ?? "";
    }

    public insert(i: number, c: string) {
        if (i < 0 || i > this.components.length) throw new RangeError("index out of bounds");
        this.components.splice(i, 0, c ?? "");
    }

    public append(c: string) {
        this.components.push(c ?? "");
    }

    public remove(n: number) {
         if (n < 0 || n >= this.components.length) throw new RangeError("index out of bounds");
        this.components.splice(n, 1);
    }

    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.components.push(other.getComponent(i));
        }
    }
}