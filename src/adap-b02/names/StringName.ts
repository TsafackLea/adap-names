import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    private parseComponents(s: string, delimiter: string): string[] {
        const esc = ESCAPE_CHARACTER;
        const comps: string[] = [];
        if (s.length == 0) return comps;

        let cur = "", 
        escaped = false;
        for (let i = 0; i < s.length; i++) {
            const ch = s[i];
            if (escaped) { cur += ch; escaped = false; continue; }
            if (ch == esc) { escaped = true; continue; }
            if (ch == delimiter) { comps.push(cur); cur = ""; }
            else { cur += ch; }
        }
        if (escaped) cur += esc;
        comps.push(cur);
        return comps;
    }

    constructor(source: string, delimiter?: string) {
              if (delimiter != undefined) {
            if (typeof delimiter != "string" || delimiter.length != 1) {
                throw new TypeError("delimiter must be a single character string");
            }
            this.delimiter = delimiter;
        }
        if (typeof source != "string") {
            throw new TypeError("source must be a string");
        }
        this.name = source;
        this.noComponents = this.countComponents(this.name, this.delimiter);
    }
     private escapeForOutput(component: string, delimiter: string): string {
        const esc = ESCAPE_CHARACTER;
        let out = component.split(esc).join(esc + esc);          // \  -> \\
        if (delimiter != esc) out = out.split(delimiter).join(esc + delimiter); // . -> \.
        return out;
    }
    private rebuildFromComponents(comps: string[]): void {
        if (comps.length = 0) { this.name = ""; this.noComponents = 0; return; }
        this.name = comps.map(c => this.escapeForOutput(c, this.delimiter)).join(this.delimiter);
        this.noComponents = comps.length;
    }

    private requireSingleChar(ch: string, label: string): string {
        if (typeof ch != "string" || ch.length != 1)
            throw new TypeError(`${label} muss genau 1 Zeichen lang sein`);
        return ch;
    }

    private requireString(v: unknown, label: string): void {
        if (typeof v != "string") throw new TypeError(`${label} muss ein string sein`);
    }

    private requireIndex(i: number): void {
        if (!Number.isInteger(i)) throw new RangeError("Index muss ganzzahlig sein");
        if (i < 0 || i >= this.noComponents)
            throw new RangeError(`Index ${i} außerhalb des gültigen Bereichs`);
    }

    private requireInsertIndex(i: number): void {
        if (!Number.isInteger(i)) throw new RangeError("Index muss ganzzahlig sein");
        if (i < 0 || i > this.noComponents)
            throw new RangeError(`Index ${i} außerhalb des gültigen Bereichs für insert`);
    }
    private countComponents(s: string, delimiter: string): number {
        if (s.length == 0) return 0;
        return this.parseComponents(s, delimiter).length;
    }

    public asString(delimiter: string = this.delimiter): string {
       if (this.isEmpty()) return "";
        const d = this.requireSingleChar(delimiter, "delimiter");
        const comps = this.parseComponents(this.name, this.delimiter); 
        return comps.map(c => this.escapeForOutput(c, d)).join(d); 
    }

    public asDataString(): string {
         return this.name;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
         return this.noComponents == 0;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(x: number): string {
        this.requireIndex(x);
        const comps = this.parseComponents(this.name, this.delimiter);
        return comps[x];
    }

    public setComponent(n: number, c: string): void {
        this.requireIndex(n);
        this.requireString(c, "Komponente");
        const comps = this.parseComponents(this.name, this.delimiter);
        comps[n] = c;
        this.rebuildFromComponents(comps);
    }

    public insert(n: number, c: string): void {
        this.requireInsertIndex(n);
        this.requireString(c, "Komponente");
        const comps = this.isEmpty() ? [] : this.parseComponents(this.name, this.delimiter);
        comps.splice(n, 0, c);
        this.rebuildFromComponents(comps);
    }

    public append(c: string): void {
        this.requireString(c, "Komponente");
        const comps = this.isEmpty() ? [] : this.parseComponents(this.name, this.delimiter);
        comps.push(c);
        this.rebuildFromComponents(comps);
    }

    public remove(n: number): void {
        this.requireIndex(n);
        const comps = this.parseComponents(this.name, this.delimiter);
        comps.splice(n, 1);
        this.rebuildFromComponents(comps);
    }

    public concat(other: Name): void {
        const otherStr = other.asString(this.delimiter); 
        if (otherStr.length ==0) return;
        this.name = this.isEmpty() ? otherStr : this.name + this.delimiter + otherStr;
        this.noComponents = this.countComponents(this.name, this.delimiter);
    }

}