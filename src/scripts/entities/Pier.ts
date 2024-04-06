import { ActiveObject } from '../abstract/ActiveObject';
import { Graphics } from 'pixi.js';

export class Pier extends ActiveObject {
  constructor(isLoaded: boolean, graphics: Graphics, color: number) {
    super(isLoaded, graphics, color);
  }
}