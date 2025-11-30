import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

   
    constructor(delimiter: string = DEFAULT_DELIMITER) {
        if (typeof delimiter != "string" || delimiter.length != 1 || delimiter == ESCAPE_CHARACTER) {
            throw new IllegalArgumentException(
                "Precondition violated: delimiter must be a single character and not the escape character."
            );
        }
        this.delimiter = delimiter;
    }

    public abstract clone(): Name;

    public asString(delimiter: string = this.delimiter): string {
        if (typeof delimiter != "string" || delimiter.length != 1 || delimiter == ESCAPE_CHARACTER) {
            throw new IllegalArgumentException(
                "Precondition violated: delimiter must be a single character and not the escape character."
            );
        }

        const n = this.getNoComponents();
        if (n == 0) {
            return "";
        }

        let s = this.getComponent(0);
        for (let i = 1; i < n; i++) {
            s += delimiter + this.getComponent(i);
        }
        return s;
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        return this.asString(this.delimiter);
    }

    public isEqual(other: Name): boolean {
        if (other == null || other == undefined) {
            throw new IllegalArgumentException("Precondition violated: other must not be null or undefined.");
        }
        return this.asDataString() == other.asDataString();
    }

    public getHashCode(): number {
        const s = this.asDataString();
        let h = 0;
        for (let i = 0; i < s.length; i++) {
            h = (h * 31 + s.charCodeAt(i)) | 0;
        }
        return h | 0;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        if (other == null || other == undefined) {
            throw new IllegalArgumentException("Precondition violated: other must not be null or undefined.");
        }

        const before = this.getNoComponents();
        const toAdd = other.getNoComponents();

        for (let i = 0; i < toAdd; i++) {
            this.append(other.getComponent(i));
        }

        const after = this.getNoComponents();
        if (after != before + toAdd) {
            
            throw new MethodFailedException(
                "Postcondition violated: concat() did not append all components."
            );
        }
    }
}
