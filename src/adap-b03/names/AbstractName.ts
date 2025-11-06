import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
       this.delimiter = delimiter;
    }

    public clone(): Name {
        const Ctor: any = (this as any).constructor;
        const copy: AbstractName = new Ctor(this.delimiter);
        for (let i = 0; i < this.getNoComponents(); i++) {
            copy.append(this.getComponent(i));
        }
        return copy as Name;
    }

    public asString(delimiter: string = this.delimiter): string {
       if (delimiter === this.delimiter) {
            return this.joinMaskedComponents(this.delimiter);
        
        }

        const raw = this.getRawComponents(this.delimiter);
        const remasked = raw.map(c => this.maskComponent(c, delimiter));
        return remasked.join(delimiter);
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        if (this.delimiter === DEFAULT_DELIMITER) {
            return this.joinMaskedComponents(DEFAULT_DELIMITER);
        }
        const raw = this.getRawComponents(this.delimiter);
        const remasked = raw.map(c => this.maskComponent(c, DEFAULT_DELIMITER));
        return remasked.join(DEFAULT_DELIMITER);
    }

    public isEqual(other: Name): boolean {
        if (this === other) return true;
        if (this.getNoComponents() !== other.getNoComponents()) return false;

        
        for (let i = 0; i < this.getNoComponents(); i++) {
            const a = this.unmaskComponent(this.getComponent(i), this.delimiter);
            const b = this.unmaskComponent(other.getComponent(i), (other as any).getDelimiterCharacter?.() ?? this.delimiter);
            if (a !== b) return false;
        }
        return true;
    }

    public getHashCode(): number {
       let hash = 17;
        const prime = 31;

        for (let i = 0; i < this.getNoComponents(); i++) {
            const raw = this.unmaskComponent(this.getComponent(i), this.delimiter);
            for (let j = 0; j < raw.length; j++) {
                hash = (hash * prime + raw.charCodeAt(j)) | 0;
            }
        }
        
        return  hash >> 0;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() == 0;
    }

    public getDelimiterCharacter(): string {
        throw new Error("needs implementation or deletion");
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        throw new Error("needs implementation or deletion");
    }

}