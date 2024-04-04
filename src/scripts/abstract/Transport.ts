abstract class Transport {
  constructor(
    public speed: number,
    public name: string,
    public color: string
  ) {}

  abstract move(): void;

  stop() {
    console.log(`${this.name} is stoped`);
  }

}