import { File } from "./File";

export class ObjFile implements File {

    protected data: Object[] = [];
    protected length: number = 0;
    protected _isOpen: boolean = false;
  
    public isEmpty(): boolean {
      return this.length == 0;
    }

    public isOpen(): boolean {
      return this._isOpen;
    }
  
    public isClosed(): boolean {
      return !this._isOpen;
    }
  
    public open(): void {
      this.assertIsClosedFile();
      this._isOpen = true;
    }

    public read(): Object[] {
      this.assertIsOpenFile();
      return [...this.data];
    }

    public write(data: Object[]): void {
      this.assertIsOpenFile();
      if (!Array.isArray(data)) {
      throw new Error("write(data): Argument sollte ein Array sein.");
    }
    this.data.push(...data);
    this.length = this.data.length;
    }
  
    public close(): void {
      this.assertIsOpenFile();
      this._isOpen = false;
    }

    public delete(): void {
      this.assertIsClosedFile();
      this.data = [];
      this.length = 0;
    }

    protected assertIsOpenFile(): void {
      if (!this._isOpen) {
      throw new Error("Operation nicht erlaubt: Die Datei ist geschlossen.");
      }
    }

    protected assertIsClosedFile(): void {
      if (this._isOpen) {
      throw new Error("Operation nicht erlaubt: Die Datei ist geöffnet.");
      }
    }

}