import { Graphics } from "pixi.js";
import { DynamicObject } from '../abstract/DynamicObject';
import { Movement } from "../interface/Movement";

export class Ship extends DynamicObject {
  constructor(isLoaded: boolean, graphics: Graphics, color: number, movement: Movement) {
    super(isLoaded, graphics, color, movement);
    movement.horizontal = 0;
    movement.vertical = 0;
  }

  moveTop(distance: number) {
    this.setVertical(this.getVertical() + distance);
    this.getGraphics().y = this.getVertical();
  }
  moveBottom(distance: number) {
    this.setVertical(this.getVertical() - distance);
    this.getGraphics().y = this.getVertical();
  }
  moveLeft(distance: number) {
    this.setHorizontal(this.getHorizontal() - distance);
    this.getGraphics().x = this.getHorizontal();
  }
  moveRight(distance: number) {
    this.setHorizontal(this.getHorizontal() + distance);
    this.getGraphics().x = this.getHorizontal();
  }
}