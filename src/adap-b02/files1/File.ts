export class File {
   private _isOpen = false;
   private _data: Object[] = [];

    public isOpen(): boolean {
      return this._isOpen;
    }
  
    public isClosed(): boolean {
        throw new Error("incomplete example code");
    }
  
    public open(): void {
      this.assertIsClosedFile();
      throw new Error("incomplete example code");
    }

    public read(): Object[] {
      this.assertIsOpenFile();
      throw new Error("incomplete example code");
    }

    public write(data: Object[]): void {
      this.assertIsOpenFile();
      throw new Error("incomplete example code");
    }
  
    public close(): void {
      this.assertIsOpenFile();
      throw new Error("incomplete example code");
    }

    public delete(): void {
      this.assertIsClosedFile();
      throw new Error("incomplete example code");
    }

    protected assertIsOpenFile(): void {
        throw new Error("incomplete example code");
    }

    protected assertIsClosedFile(): void {
        throw new Error("incomplete example code");
    }

}