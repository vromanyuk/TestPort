import { Graphics } from "pixi.js";
import { Identifier } from '../interface/Identifier';
import { Loader } from '../interface/Loader';
import { Transport } from '../abstract/Transport';

export class Ship extends Transport implements Identifier, Loader {
  isLoaded: boolean;
  graphics: Graphics;
  color: number;

  constructor(speed: number, name: string, isLoaded: boolean) {
    super(speed, name);
    this.isLoaded = isLoaded;
    this.color = isLoaded ? 0xde3249 : 0x35cc5a;
    this.graphics = new Graphics();
    this.graphics.rect(0, 0, 80, 30)
    this.graphics.stroke({ width: 4, color: this.color });
    this.draw();
  }

  draw(): void {
    this.graphics.fill({ color: this.color, alpha: this.isLoaded ? 1 : 0 });
  }

  toggleLoaded(): void {
    this.isLoaded = !this.isLoaded;
    this.draw();
  }
  
  move() {
    console.log(`${this.name} is moving`);
  }
}