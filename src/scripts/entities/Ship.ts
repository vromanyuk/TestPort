import { Graphics, Color } from "pixi.js";
import { Identifier } from '../interface/Identifier'
import { Transport } from '../abstract/Transport'

export class Ship extends Transport implements Identifier {
  isLoaded: boolean;
  graphics: Graphics;
  color: number;

  constructor(speed: number, name: string, isLoaded: boolean) {
    super(speed, name);
    this.isLoaded = isLoaded;
    this.color = isLoaded ? 0xde3249 : 0x35cc5a;
    this.graphics = new Graphics();
    this.graphics.stroke({ width: 2, color: this.color });
    this.graphics.rect(0, 0, 80, 30)
    this.draw();
  }

  draw(): void {
    const fillShip = this.isLoaded ? this.color : 0x00000000;
    this.graphics.fill(fillShip)
  }

  toggleLoaded(): void {
    this.isLoaded = !this.isLoaded;
    this.draw();
  }

  move() {
    console.log(`${this.name} is moving`);
  }
}