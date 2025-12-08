import { Node } from "./Node";

import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        
        if (bn == null || bn == undefined || bn.trim().length == 0) {
            throw new IllegalArgumentException("base name must be a non-empty string");
        }
        if (pn == null || pn == undefined) {
            throw new IllegalArgumentException("parent directory must be defined");
        }

        super(bn, pn);

       
        if (this.childNodes == null || this.childNodes == undefined) {
            throw new InvalidStateException("childNodes set must be defined");
        }
        for (const child of this.childNodes) {
            if (child == null || child == undefined) {
                throw new InvalidStateException("childNodes must not contain null/undefined");
            }
        }
    }

    public hasChildNode(cn: Node): boolean {
        
        if (this.childNodes == null || this.childNodes == undefined) {
            throw new InvalidStateException("childNodes set must be defined");
        }

        
        if (cn == null || cn == undefined) {
            throw new IllegalArgumentException("child node must be defined");
        }

        const result = this.childNodes.has(cn);

        
        if (this.childNodes == null || this.childNodes == undefined) {
            throw new InvalidStateException("childNodes set must be defined");
        }
        for (const child of this.childNodes) {
            if (child == null || child == undefined) {
                throw new InvalidStateException("childNodes must not contain null/undefined");
            }
        }

        return result;
    }

    public addChildNode(cn: Node): void {
        
        if (this.childNodes == null || this.childNodes == undefined) {
            throw new InvalidStateException("childNodes set must be defined");
        }

        
        if (cn == null || cn == undefined) {
            throw new IllegalArgumentException("child node must be defined");
        }
        if (this.childNodes.has(cn)) {
            throw new IllegalArgumentException("directory already contains given child node");
        }

        this.childNodes.add(cn);

        
        if (!this.childNodes.has(cn)) {
            throw new MethodFailedException("child node was not added to directory");
        }

        
        if (this.childNodes == null || this.childNodes == undefined) {
            throw new InvalidStateException("childNodes set must be defined");
        }
        for (const child of this.childNodes) {
            if (child == null || child == undefined) {
                throw new InvalidStateException("childNodes must not contain null/undefined");
            }
        }
    }

    public removeChildNode(cn: Node): void {
        
        if (this.childNodes == null || this.childNodes == undefined) {
            throw new InvalidStateException("childNodes set must be defined");
        }

        
        if (cn == null || cn == undefined) {
            throw new IllegalArgumentException("child node must be defined");
        }
        if (!this.childNodes.has(cn)) {
            throw new IllegalArgumentException("directory does not contain given child node");
        }

        this.childNodes.delete(cn);

        
        if (this.childNodes.has(cn)) {
            throw new MethodFailedException("child node was not removed from directory");
        }

       
        if (this.childNodes == null || this.childNodes == undefined) {
            throw new InvalidStateException("childNodes set must be defined");
        }
        for (const child of this.childNodes) {
            if (child == null || child == undefined) {
                throw new InvalidStateException("childNodes must not contain null/undefined");
            }
        }
    }

}
