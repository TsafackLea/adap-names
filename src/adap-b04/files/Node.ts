import { Name } from "../names/Name";
import { Directory } from "./Directory";

import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

export class Node {

    protected baseName: string = "";
    protected parentNode: Directory;

    constructor(bn: string, pn: Directory) {
        
        if (bn == null || bn == undefined || bn.trim().length == 0) {
            throw new IllegalArgumentException("base name must be a non-empty string");
        }
        if (pn == null || pn == undefined) {
            throw new IllegalArgumentException("parent directory must be defined");
        }

        this.doSetBaseName(bn);
        this.parentNode = pn;

        
        if (this.baseName == null || this.baseName == undefined || this.baseName.trim().length == 0) {
            throw new InvalidStateException("base name must be a non-empty string");
        }
        if (this.parentNode == null || this.parentNode == undefined) {
            throw new InvalidStateException("parent directory must be defined");
        }

        
        this.initialize(pn);

        
        if (this.baseName !== bn) {
            throw new MethodFailedException("base name was not set correctly");
        }
        if (this.parentNode !== pn) {
            throw new MethodFailedException("parent directory was not set correctly");
        }
        if (!pn.hasChildNode(this)) {
            throw new MethodFailedException("new node is not contained in parent directory");
        }

        
        if (this.baseName == null || this.baseName == undefined || this.baseName.trim().length == 0) {
            throw new InvalidStateException("base name must be a non-empty string");
        }
        if (this.parentNode == null || this.parentNode == undefined) {
            throw new InvalidStateException("parent directory must be defined");
        }
        if (!this.parentNode.hasChildNode(this)) {
            throw new InvalidStateException("parent directory must contain this node");
        }
    }

    protected initialize(pn: Directory): void {
        this.parentNode = pn;
        this.parentNode.addChildNode(this);
    }

    public move(to: Directory): void {
        
        if (this.baseName == null || this.baseName == undefined || this.baseName.trim().length == 0) {
            throw new InvalidStateException("base name must be a non-empty string");
        }
        if (this.parentNode == null || this.parentNode == undefined) {
            throw new InvalidStateException("parent directory must be defined");
        }
        if (!this.parentNode.hasChildNode(this)) {
            throw new InvalidStateException("parent directory must contain this node");
        }

        
        if (to == null || to == undefined) {
            throw new IllegalArgumentException("target directory must be defined");
        }
        if (to == this.parentNode) {
            throw new IllegalArgumentException("target directory must be different from current parent");
        }

        const oldParent: Directory = this.parentNode;

        
        this.parentNode.removeChildNode(this);
        
        this.parentNode = to;
        
        to.addChildNode(this);

       
        if (this.parentNode != to) {
            throw new MethodFailedException("node was not moved to target directory");
        }
        if (oldParent.hasChildNode(this)) {
            throw new MethodFailedException("node still contained in old parent directory");
        }
        if (!to.hasChildNode(this)) {
            throw new MethodFailedException("node not contained in target directory");
        }

        
        if (this.baseName == null || this.baseName == undefined || this.baseName.trim().length == 0) {
            throw new InvalidStateException("base name must be a non-empty string");
        }
        if (this.parentNode == null || this.parentNode == undefined) {
            throw new InvalidStateException("parent directory must be defined");
        }
        if (!this.parentNode.hasChildNode(this)) {
            throw new InvalidStateException("parent directory must contain this node");
        }
    }

    public getFullName(): Name {
        
        if (this.baseName == null || this.baseName == undefined || this.baseName.trim().length == 0) {
            throw new InvalidStateException("base name must be a non-empty string");
        }
        if (this.parentNode == null || this.parentNode == undefined) {
            throw new InvalidStateException("parent directory must be defined");
        }
        if (!this.parentNode.hasChildNode(this)) {
            throw new InvalidStateException("parent directory must contain this node");
        }

        const result: Name = this.parentNode.getFullName();
        result.append(this.getBaseName());

       
        if (result == null || result == undefined) {
            throw new MethodFailedException("full name must be defined");
        }

        
        if (this.baseName == null || this.baseName == undefined || this.baseName.trim().length == 0) {
            throw new InvalidStateException("base name must be a non-empty string");
        }
        if (this.parentNode == null || this.parentNode == undefined) {
            throw new InvalidStateException("parent directory must be defined");
        }
        if (!this.parentNode.hasChildNode(this)) {
            throw new InvalidStateException("parent directory must contain this node");
        }

        return result;
    }

    public getBaseName(): string {
        
        if (this.baseName == null || this.baseName == undefined || this.baseName.trim().length == 0) {
            throw new InvalidStateException("base name must be a non-empty string");
        }
        if (this.parentNode == null || this.parentNode == undefined) {
            throw new InvalidStateException("parent directory must be defined");
        }

        const result = this.doGetBaseName();

        if (result == null || result == undefined || result.trim().length == 0) {
            throw new MethodFailedException("base name returned must be non-empty");
        }

        
        if (this.baseName == null || this.baseName == undefined || this.baseName.trim().length == 0) {
            throw new InvalidStateException("base name must be a non-empty string");
        }
        if (this.parentNode == null || this.parentNode == undefined) {
            throw new InvalidStateException("parent directory must be defined");
        }

        return result;
    }

    protected doGetBaseName(): string {
        return this.baseName;
    }

    public rename(bn: string): void {
       
        if (this.baseName == null || this.baseName == undefined || this.baseName.trim().length == 0) {
            throw new InvalidStateException("base name must be a non-empty string");
        }
        if (this.parentNode == null || this.parentNode == undefined) {
            throw new InvalidStateException("parent directory must be defined");
        }
        if (!this.parentNode.hasChildNode(this)) {
            throw new InvalidStateException("parent directory must contain this node");
        }

       
        if (bn == null || bn == undefined || bn.trim().length == 0) {
            throw new IllegalArgumentException("new base name must be a non-empty string");
        }

        this.doSetBaseName(bn);

        
        if (this.baseName != bn) {
            throw new MethodFailedException("base name was not updated");
        }

        
        if (this.baseName === null || this.baseName === undefined || this.baseName.trim().length === 0) {
            throw new InvalidStateException("base name must be a non-empty string");
        }
        if (this.parentNode == null || this.parentNode == undefined) {
            throw new InvalidStateException("parent directory must be defined");
        }
        if (!this.parentNode.hasChildNode(this)) {
            throw new InvalidStateException("parent directory must contain this node");
        }
    }

    protected doSetBaseName(bn: string): void {
        this.baseName = bn;
    }

    public getParentNode(): Directory {
       
        if (this.parentNode == null || this.parentNode == undefined) {
            throw new InvalidStateException("parent directory must be defined");
        }

        const result = this.parentNode;

        if (result == null || result == undefined) {
            throw new MethodFailedException("parent directory must be returned");
        }

        if (this.parentNode == null || this.parentNode == undefined) {
            throw new InvalidStateException("parent directory must be defined");
        }

        return result;
    }

}
