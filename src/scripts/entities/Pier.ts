import { DynamicObject } from '../abstract/DynamicObject';
import { Graphics } from 'pixi.js';

export class Pier extends DynamicObject {
  constructor(isLoaded: boolean, graphics: Graphics, color: number) {
    super(isLoaded, graphics, color);
  }
}