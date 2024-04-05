import { Identifier } from '../interface/Identifier';
import { Loader } from '../interface/Loader';
import { Build } from '../abstract/Build';
import { Graphics } from 'pixi.js';

export class Pier extends Build implements Identifier, Loader {
  isLoaded: boolean;
  graphics: Graphics;

  constructor(name: string, color: string, isLoaded: boolean) {
    super(name, color);
    this.isLoaded = isLoaded;
    this.graphics = new Graphics();
    this.graphics.rect(0, 10, 40, 120);
    this.graphics.stroke({ width: 4, color: this.color });
    this.draw();
  }

  draw() {
    this.graphics.fill({ color: this.color, alpha: this.isLoaded ? 1 : 0 });
  }

  toggleLoaded(): void {
    this.isLoaded = !this.isLoaded;
    this.draw();
  }
}