import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        if (!Array.isArray(source)) throw new TypeError("source muss ein string[] sein");

        if (delimiter !== undefined) {
            if (typeof delimiter !== "string" || delimiter.length !== 1)
                throw new TypeError("delimiter muss genau 1 Zeichen lang sein");
            this.delimiter = delimiter;
        }
        
        this.components = [...source];
    }

    private requireSingleChar(ch: string, label: string): string {
        if (typeof ch !== "string" || ch.length !== 1)
            throw new TypeError(`${label} muss genau 1 Zeichen lang sein`);
        return ch;
    }

    private escapeForOutput(component: string, delimiter: string): string {
        const esc = ESCAPE_CHARACTER;
        let out = component.split(esc).join(esc + esc);          
        if (delimiter !== esc) out = out.split(delimiter).join(esc + delimiter); 
        return out;
    }
    public asString(delimiter: string = this.delimiter): string {
        const d = this.requireSingleChar(delimiter, "delimiter");
        return this.components.map(c => this.escapeForOutput(c, d)).join(d);
    }

    public asDataString(): string {
        return this.asString(this.delimiter);
    }

    public getDelimiterCharacter(): string {
         return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.components.length === 0;
    }

    public getNoComponents(): number {
        return this.components.length;
    }
    private requireIndex(i: number): void {
        if (!Number.isInteger(i)) throw new RangeError("Index muss ganzzahlig sein");
        if (i < 0 || i >= this.components.length)
            throw new RangeError("Index " +{i} + "außerhalb des gültigen Bereichs");
    }

    private requireString(v: unknown, label: string): void {
        if (typeof v !== "string") throw new TypeError( label + "muss ein string sein");
    }

    public getComponent(i: number): string {
        this.requireIndex(i);
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        this.requireIndex(i);
        this.requireString(c, "Komponente");
        this.components[i] = c;
    }
     
     private requireInsertIndex(i: number): void {
        if (!Number.isInteger(i)) throw new RangeError("Index muss ganzzahlig sein");
        if (i < 0 || i > this.components.length)
            throw new RangeError("Index " + i + " außerhalb des gültigen Bereichs für insert");
    }

    public insert(i: number, c: string): void {
        this.requireInsertIndex(i);
        this.requireString(c, "Komponente");
        this.components.splice(i, 0, c);
    }

    public append(c: string): void {
        this.requireString(c, "Komponente");
        this.components.push(c);
    }

    public remove(i: number): void {
        this.requireIndex(i);
        this.components.splice(i, 1);
    }

    private parseComponents(s: string, delimiter: string): string[] {
        const esc = ESCAPE_CHARACTER;
        const comps: string[] = [];
        let cur = "", escaped = false;

        if (s.length === 0) return [""];

        for (let i = 0; i < s.length; i++) {
            const ch = s[i];
            if (escaped) { cur += ch; escaped = false; continue; }
            if (ch === esc) { escaped = true; continue; }
            if (ch === delimiter) { comps.push(cur); cur = ""; }
            else { cur += ch; }
        }
        if (escaped) cur += esc; // trailing \
        comps.push(cur);
        return comps;
    }

    public concat(other: Name): void {
        const serialized = other.asString(this.delimiter); 
        const more = this.parseComponents(serialized, this.delimiter);
        this.components.push(...more);
    }

}