export class File {
   private _isOpen = false;
   private _data: Object[] = [];

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
      return [...this._data];
    }

    public write(data: Object[]): void {
      this.assertIsOpenFile();
      if (!Array.isArray(data)) {
      throw new Error("write(data): 'data' sollte ein Array sein.");
    }
    this._data.push(...data);
    }
  
    public close(): void {
      this.assertIsOpenFile();
      this._isOpen = false;
    }

    public delete(): void {
      this.assertIsClosedFile();
      this._data = [];
    }

    protected assertIsOpenFile(): void {
        if (!this._isOpen) {
      throw new Error("Operation nicht erlaubt: Die Datei ist nicht geöffnet.");
      }
    }

    protected assertIsClosedFile(): void {
        if (this._isOpen) {
      throw new Error("Operation nicht erlaubt: Die Datei ist nicht geschlossen.");
      }
    }

}