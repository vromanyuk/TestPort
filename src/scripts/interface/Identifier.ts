import { Graphics } from 'pixi.js';

export interface Identifier {
  graphics: Graphics;
  draw(): void;
}