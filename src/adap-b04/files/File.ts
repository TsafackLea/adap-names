import { Node } from "./Node";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED
}

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);

        
        if (this.state == null || this.state == undefined) {
            throw new InvalidStateException("Invalid initial file state.");
        }
    }

   
    public open(): void {

        
        if (this.state == FileState.OPEN) {
            throw new IllegalArgumentException("Precondition violated: File is already open.");
        }
        if (this.state == FileState.DELETED) {
            throw new IllegalArgumentException("Precondition violated: File is deleted.");
        }

        
        this.state = FileState.OPEN;

        
        if (this.state != FileState.OPEN) {
            throw new MethodFailedException("Postcondition violated: File was not opened.");
        }
    }

    
    public read(noBytes: number): Int8Array {

       
        if (this.state == FileState.CLOSED) {
            throw new IllegalArgumentException("Precondition violated: File is closed.");
        }
        if (this.state == FileState.DELETED) {
            throw new IllegalArgumentException("Precondition violated: File is deleted.");
        }
        if (noBytes < 0) {
            throw new IllegalArgumentException("Precondition violated: number of bytes < 0.");
        }

        
        return new Int8Array(noBytes);
    }

    
    public close(): void {

       
        if (this.state == FileState.CLOSED) {
            throw new IllegalArgumentException("Precondition violated: File already closed.");
        }
        if (this.state == FileState.DELETED) {
            throw new IllegalArgumentException("Precondition violated: File is deleted.");
        }

        
        this.state = FileState.CLOSED;

       
        if (this.state != FileState.CLOSED) {
            throw new MethodFailedException("Postcondition violated: File was not closed.");
        }
    }

    
    protected doGetFileState(): FileState {
        return this.state;
    }
}
