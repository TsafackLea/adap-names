import { Node } from "./Node";
import { Directory } from "./Directory";
import { MethodFailedException } from "../common/MethodFailedException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    public open(): void {

        if (this.state == FileState.DELETED) {

            throw new MethodFailedException("File is deleted");
        }
        this.state = FileState.OPEN;
    }

    /**
     * Liest noBytes Bytes; bei MethodFailedException wird maximal
     * drei Mal versucht (gesamt, nicht pro Byte). Nach der dritten
     * Fehlfunktion wird die Exception weitergereicht.
     */
    public read(noBytes: number): Int8Array {
        const result: Int8Array = new Int8Array(noBytes);

        let tries: number = 0;

        for (let i: number = 0; i < noBytes; i++) {
            try {

                result[i] = this.readNextByte();
                
            } catch (ex) {
                
                if (ex instanceof MethodFailedException) {
                    tries++;

                    
                    if (tries >= 3) {
                        throw ex;
                    }

                   
                    i--;
                } else {
                   
                    throw ex;
                }
            }
        }

        return result;
    }

    protected readNextByte(): number {
        if (this.state != FileState.OPEN) {
            throw new MethodFailedException("File is not open");
        }

        
        return 0;
    }

    public close(): void {
        if (this.state == FileState.OPEN) {
            this.state = FileState.CLOSED;
        }
    }

    protected doGetFileState(): FileState {
        return this.state;
    }
}
