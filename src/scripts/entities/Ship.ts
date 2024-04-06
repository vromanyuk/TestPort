import { Graphics } from "pixi.js";
import { DynamicObject } from '../abstract/DynamicObject';

export class Ship extends DynamicObject {
  constructor(isLoaded: boolean, graphics: Graphics, color: number) {
    super(isLoaded, graphics, color);
  }
}