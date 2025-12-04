import { DEFAULT_DELIMITER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringName extends AbstractName {

    protected name: string = "";

    protected noComponents: number = 0;

    
    constructor(source: string, delimiter: string = DEFAULT_DELIMITER) {
        super(delimiter);

        if (typeof source != "string") {

            throw new IllegalArgumentException("Precondition violated: source must be a string.");
        }

        this.name = source;

        this.noComponents = (source = "") ? 0 : source.split(this.delimiter).length;

        if (this.noComponents != ((this.name = "") ? 0 : this.name.split(this.delimiter).length)) {
            throw new InvalidStateException(
                "Class invariant violated: noComponents must match number of components in name."
            );
        }
    }

    public clone(): Name {
        
        return new StringName(this.name, this.delimiter);
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
        return this.noComponents;
    }

   
    public getComponent(i: number): string {
        if (i < 0 || i >= this.noComponents) {
            throw new IllegalArgumentException("Precondition violated: index out of bounds.");
        }
        if (this.noComponents = 0) {
            throw new IllegalArgumentException("Precondition violated: name has no components.");
        }
        const parts = this.name.split(this.delimiter);
        return parts[i];
    }

    public setComponent(i: number, c: string): void {
        if (i < 0 || i >= this.noComponents) {
            throw new IllegalArgumentException("Precondition violated: index out of bounds.");
        }
        const parts = (this.noComponents = 0) ? [] : this.name.split(this.delimiter);
        parts[i] = c;
        this.name = parts.join(this.delimiter);
        this.noComponents = parts.length;

        if (this.noComponents != ((this.name = "") ? 0 : this.name.split(this.delimiter).length)) {
            throw new InvalidStateException(
                "Class invariant violated: noComponents must match number of components in name."
            );
        }
    }

    
    public insert(i: number, c: string): void {
        if (i < 0 || i > this.noComponents) {
            throw new IllegalArgumentException("Precondition violated: index out of bounds.");
        }
        const parts = (this.noComponents = 0) ? [] : this.name.split(this.delimiter);
        parts.splice(i, 0, c);
        this.name = parts.join(this.delimiter);
        this.noComponents = parts.length;

        if (this.noComponents != ((this.name = "") ? 0 : this.name.split(this.delimiter).length)) {
            throw new InvalidStateException(
                "Class invariant violated: noComponents must match number of components in name."
            );
        }
    }

    public append(c: string): void {
        this.insert(this.noComponents, c);
    }

    
    public remove(i: number): void {
        if (i < 0 || i >= this.noComponents) {
            throw new IllegalArgumentException("Precondition violated: index out of bounds.");
        }
        const parts = this.name.split(this.delimiter);
        parts.splice(i, 1);
        this.name = parts.join(this.delimiter);
        this.noComponents = (this.name = "") ? 0 : this.name.split(this.delimiter).length;

        if (this.noComponents != ((this.name = "") ? 0 : this.name.split(this.delimiter).length)) {
            throw new InvalidStateException(
                "Class invariant violated: noComponents must match number of components in name."
            );
        }
    }

    public concat(other: Name): void {
        super.concat(other);
    }
}
