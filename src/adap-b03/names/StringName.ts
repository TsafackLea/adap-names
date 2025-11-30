import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super();
        this.name = source ?? "";
        this.noComponents = this.name == "" ? 0 : this.name.split(this.delimiter).length;
    }

    public clone(): Name {
        return new StringName(this.name, this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.getAsComponents().join(delimiter);
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
        return this.noComponents == 0;
    }

    public getDelimiterCharacter(): string {
       return this.delimiter;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        const comps = this.getAsComponents();
        if (i < 0 || i >= comps.length) throw new RangeError("index out of bounds");
        return comps[i];
    }

    public setComponent(i: number, c: string) {
        const comps = this.getAsComponents();
        if (i < 0 || i >= comps.length) throw new RangeError("index out of bounds");
        comps[i] = c ?? "";
        this.setFromComponents(comps);
    }

    public insert(i: number, c: string) {
        const comps = this.getAsComponents();
        if (i < 0 || i > comps.length) throw new RangeError("index out of bounds");
        comps.splice(i, 0, c ?? "");
        this.setFromComponents(comps);
    }

    public append(c: string) {
        const comps = this.getAsComponents();
        comps.push(c ?? "");
        this.setFromComponents(comps);
    }

    public remove(i: number) {
        const comps = this.getAsComponents();
        if (i < 0 || i >= comps.length) throw new RangeError("index out of bounds");
        comps.splice(i, 1);
        this.setFromComponents(comps);
    }

    private getAsComponents(): string[] {
        if (this.name = "") return [];
        return this.name.split(this.delimiter);
    }

    private setFromComponents(components: string[]) {
        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
    }

    public concat(other: Name): void {
        const comps = this.getAsComponents();
        for (let i = 0; i < other.getNoComponents(); i++) {
            comps.push(other.getComponent(i));
        }
        this.setFromComponents(comps);
    }

}