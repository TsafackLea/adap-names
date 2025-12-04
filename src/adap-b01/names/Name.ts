export const DEFAULT_DELIMITER: string = '.';
export const ESCAPE_CHARACTER = '\\';

/**
 * A name is a sequence of string components separated by a delimiter character.
 * Special characters within the string may need masking, if they are to appear verbatim.
 * There are only two special characters, the delimiter character and the escape character.
 * The escape character can't be set, the delimiter character can.
 * 
 * Homogenous name examples
 * 
 * "oss.cs.fau.de" is a name with four name components and the delimiter character '.'.
 * "///" is a name with four empty components and the delimiter character '/'.
 * "Oh\.\.\." is a name with one component, if the delimiter character is '.'.
 */
export class Name {

    private delimiter: string = DEFAULT_DELIMITER;
    private components: string[] = [];

    /** Expects that all Name components are properly masked */
    constructor(other: string[], delimiter?: string) {
        this.components = other;
        if (delimiter) {
            this.delimiter = delimiter;
        }
    }

    /**
     * Returns a human-readable representation of the Name instance using user-set control characters
     * Control characters are not escaped (creating a human-readable string)
     * Users can vary the delimiter character to be used
     */
    public asString(delimiter: string = this.delimiter): string {
    const resultParts: string[] = [];

    for (let k = 0; k < this.components.length; k++) {
        const comp = this.components[k];
        let raw = "";
        let escaping = false;

        for (let i = 0; i < comp.length; i++) {
            const ch = comp.charAt(i);

            if (escaping) {
                // Zeichen nach ESCAPE_CHARACTER wörtlich übernehmen
                raw += ch;
                escaping = false;
            } else if (ch === ESCAPE_CHARACTER) {
                // Escape einleiten – nächstes Zeichen wird wörtlich genommen
                escaping = true;
            } else {
                raw += ch;
            }
        }

        // Falls ein einzelnes ESCAPE am Ende steht, als Literal behandeln
        if (escaping) {
            raw += ESCAPE_CHARACTER;
        }

        resultParts.push(raw);
    }

    // Komponenten mit gewünschtem Delimiter verbinden
    return resultParts.join(delimiter);
}

    /** 
     * Returns a machine-readable representation of Name instance using default control characters
     * Machine-readable means that from a data string, a Name can be parsed back in
     * The control characters in the data string are the default characters
     */
    public asDataString(): string {
        const maskedForDefault: string[] = [];

        for (let k = 0; k < this.components.length; k++) {
            const comp = this.components[k];

            let raw = "";
            let escaping = false;
            for (let i = 0; i < comp.length; i++) {
                const ch = comp.charAt(i);
                if (escaping) {
                    raw += ch;
                    escaping = false;
                } else if (ch == ESCAPE_CHARACTER) {
                    escaping = true;
                } else {
                    raw += ch;
                }
            }
            if (escaping) {
                raw += ESCAPE_CHARACTER;
            }

            let masked = "";
            for (let i = 0; i < raw.length; i++) {
                const ch = raw.charAt(i);
                if (ch == DEFAULT_DELIMITER || ch == ESCAPE_CHARACTER) {
                    masked += ESCAPE_CHARACTER;
                }
                masked += ch;
            }

            maskedForDefault.push(masked);
        }

        return maskedForDefault.join(DEFAULT_DELIMITER);
    }

    public getComponent(i: number): string {
        if (i < 0 || i >= this.components.length) {
            throw new RangeError("Index out of bounds");
        }
        return this.components[i];
    }

    /** Expects that new Name component c is properly masked */
    public setComponent(i: number, c: string): void {
        if (i < 0 || i >= this.components.length) {
            throw new RangeError("Index out of bounds");
        }
        this.components[i] = c;
    }

    /** Returns number of components in Name instance */
    public getNoComponents(): number {
        return this.components.length;
    }

    /** Expects that new Name component c is properly masked */
    public insert(i: number, c: string): void {
        if (i < 0 || i > this.components.length) {
            throw new RangeError("Index out of bounds");
        }
        this.components.splice(i, 0, c);
    }

    /** Expects that new Name component c is properly masked */
    public append(c: string): void {
        this.components.push(c);
    }

    public remove(i: number): void {
        if (i < 0 || i >= this.components.length) {
            throw new RangeError("Index out of bounds");
        }
        this.components.splice(i, 1);
    }
}
