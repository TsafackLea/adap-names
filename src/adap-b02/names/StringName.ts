import { DEFAULT_DELIMITER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {
  protected delimiter: string = DEFAULT_DELIMITER;
  protected name: string = "";

  constructor(source: string, delimiter?: string) {
    if (delimiter) this.delimiter = delimiter;
    this.name = source || "";
  }

  asString(delimiter: string = this.delimiter): string {
    return this.name.replaceAll(this.delimiter, delimiter);
  }

  asDataString(): string {
    return this.name;
  }

  getDelimiterCharacter(): string {
    return this.delimiter;
  }

  isEmpty(): boolean {
    return this.name === "";
  }

  getNoComponents(): number {
    return this.name === "" ? 0 : this.name.split(this.delimiter).length;
  }

  getComponent(i: number): string {
    return this.name.split(this.delimiter)[i];
  }

  setComponent(i: number, c: string): void {
    const parts = this.name.split(this.delimiter);
    parts[i] = c;
    this.name = parts.join(this.delimiter);
  }

  insert(i: number, c: string): void {
    const parts = this.name === "" ? [] : this.name.split(this.delimiter);
    parts.splice(i, 0, c);
    this.name = parts.join(this.delimiter);
  }

  append(c: string): void {
    this.name = this.name === "" ? c : this.name + this.delimiter + c;
  }

  remove(i: number): void {
    const parts = this.name.split(this.delimiter);
    parts.splice(i, 1);
    this.name = parts.join(this.delimiter);
  }

  concat(other: Name): void {
    const parts = this.name === "" ? [] : this.name.split(this.delimiter);
    for (let j = 0; j < other.getNoComponents(); j++) {
      parts.push(other.getComponent(j));
    }
    this.name = parts.join(this.delimiter);
  }
}
