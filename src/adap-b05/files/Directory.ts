import { Node } from "./Node";
import { InvalidStateException } from "../common/InvalidStateException";


export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public hasChildNode(cn: Node): boolean {
        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        this.childNodes.add(cn);
    }

    public removeChildNode(cn: Node): void {
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }

    /**
     * Suche rekursiv in diesem Verzeichnisbaum.
     * Keine extra Hilfsmethode – nur Überschreiben von findNodes().
     */
      public findNodes(bn: string): Set<Node> {

        
        const result = super.findNodes(bn);

        for (const child of this.childNodes) {

            const childMatches = child.findNodes(bn);

            for (const n of childMatches) {

              
                if (result.size > 0) {
                    throw new InvalidStateException(
                        "Invalid file system state: multiple nodes with same base name"
                    );
                }

                result.add(n);
            }
        }

        return result;
    }

}
