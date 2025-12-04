import { DEFAULT_DELIMITER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter: string = DEFAULT_DELIMITER) {
        super(delimiter);

        if (!Array.isArray(source)) {
            throw new IllegalArgumentException("Precondition violated: source must be an array of strings.");
        }

        this.components = source.slice();

        for (let i = 0; i < this.components.length; i++) {
            if (typeof this.components[i] !="string") {
                throw new InvalidStateException(
                    "Class invariant violated: all components must be strings."
                );
            }
        }
    }

    public clone(): Name {
        return new StringArrayName(this.components, this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        return super.asString(delimiter);
    }

    public asDataString(): string {
        return super.asDataString();
    }

    public isEqual(other: Name): boolean {
        return super.isEqual(other);
    }

    public getHashCode(): number {
        return super.getHashCode();
    }

    public isEmpty(): boolean {
        return super.isEmpty();
    }

    public getDelimiterCharacter(): string {
        return super.getDelimiterCharacter();
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        if (i < 0 || i >= this.components.length) {
            throw new IllegalArgumentException("Precondition violated: index out of bounds.");
        }
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        if (i < 0 || i >= this.components.length) {
            throw new IllegalArgumentException("Precondition violated: index out of bounds.");
        }
        this.components[i] = c;
        if (typeof this.components[i] != "string") {
            throw new InvalidStateException(
                "Class invariant violated: all components must be strings."
            );
        }
    }

    
    public insert(i: number, c: string): void {

        if (i < 0 || i > this.components.length) {
            
            throw new IllegalArgumentException("Precondition violated: index out of bounds.");
        }
        this.components.splice(i, 0, c);

        if (typeof c != "string") {
            throw new InvalidStateException(
                "Class invariant violated: all components must be strings."
            );
        }
    }

    public append(c: string): void {

        this.components.push(c);
        if (typeof c !="string") {
            throw new InvalidStateException(


                "Class invariant violated: all components must be strings."

            );
        }
    }

    
    public remove(i: number): void {
        if (i < 0 || i >= this.components.length) {

            throw new IllegalArgumentException("Precondition violated: index out of bounds.");
        }
        this.components.splice(i, 1);
    }

    public concat(other: Name): void {
        super.concat(other); 
    }
}
