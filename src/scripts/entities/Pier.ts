import { DynamicObject } from '../abstract/DynamicObject';
import { Graphics } from 'pixi.js';
import { Position } from '../interface/Position';

export class Pier extends DynamicObject {
  constructor(isLoaded: boolean, graphics: Graphics, color: number, movement: Position) {
    super(isLoaded, graphics, color, movement);
  }
}