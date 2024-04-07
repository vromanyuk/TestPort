import { DynamicObject } from '../abstract/DynamicObject';
import { Graphics } from 'pixi.js';
import { Movement } from '../interface/Movement';

export class Pier extends DynamicObject {
  constructor(isLoaded: boolean, graphics: Graphics, color: number, movement: Movement) {
    super(isLoaded, graphics, color, movement);
    movement.horizontal = 0;
    movement.vertical = 0;
  }
}