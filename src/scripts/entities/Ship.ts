import { Graphics } from "pixi.js";
import { ActiveObject } from '../abstract/ActiveObject';

export class Ship extends ActiveObject {
  constructor(isLoaded: boolean, graphics: Graphics, color: number) {
    super(isLoaded, graphics, color);
  }
}