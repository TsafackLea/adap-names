import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter.charAt(0);
    }

    public abstract clone(): Name;

    public asString(delimiter: string = this.delimiter): string {
        const d = delimiter.charAt(0);
        const n = this.getNoComponents();

        if (n == 0) {
            return "";
        }

        let s = "";

        for (let i = 0; i < n; i++) {
            let comp = this.getComponent(i);

            // Maskiere Escape + Delimiter (damit asDataString parsebar bleibt)
            comp = comp.split(ESCAPE_CHARACTER).join(ESCAPE_CHARACTER + ESCAPE_CHARACTER);
            comp = comp.split(d).join(ESCAPE_CHARACTER + d);

            if (i > 0) s += d;
            s += comp;
        }

        return s;
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        return this.asString(DEFAULT_DELIMITER);
    }

   
    public isEqual(other: Name): boolean {
        const n = this.getNoComponents();
        if (n != other.getNoComponents()) return false;

        for (let i = 0; i < n; i++) {
            if (this.getComponent(i) != other.getComponent(i)) return false;
        }
        return true;
    }

    
    public getHashCode(): number {
        let hashCode: number = 0;
        const s: string = this.asDataString();

        for (let i: number = 0; i < s.length; i++) {
            const c: number = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        return hashCode;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() == 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    
    abstract getNoComponents(): number;
    abstract getComponent(i: number): string;

    abstract setComponent(i: number, c: string): Name;
    abstract insert(i: number, c: string): Name;
    abstract append(c: string): Name;
    abstract remove(i: number): Name;

    
    public abstract concat(other: Name): Name;
}
