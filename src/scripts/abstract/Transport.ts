export abstract class Transport {
  constructor(
    public speed: number,
    public name: string
  ) {}

  abstract move(): void;

  stop() {
    console.log(`${this.name} is stoped`);
  }
}