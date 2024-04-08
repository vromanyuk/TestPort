import { Graphics } from "pixi.js";
import { DynamicObject } from '../abstract/DynamicObject';
import { Position } from "../interface/Position";
import { Pier } from "./Pier";

export class Ship extends DynamicObject {
  private _speed: number;
  private _pier: Pier = null;

  constructor(
    isLoaded: boolean, 
    graphics: Graphics, 
    color: number, 
    movement: Position, 
    speed: number
  ) {
    super(isLoaded, graphics, color, movement);
    this._speed = speed;
  }

  setSpeed(value: number):void { this._speed = value; }
  getSpeed(): number { return this._speed; }
  setPier(value: Pier): void { this._pier = value; }
  getPier(): Pier { return this._pier; }

  moveTop() {
    this.setVertical(this.getVertical() + this._speed);
    this.getGraphics().y = this.getVertical();
  }
  moveBottom() {
    this.setVertical(this.getVertical() - this._speed);
    this.getGraphics().y = this.getVertical();
  }
  moveLeft() {
    this.setHorizontal(this.getHorizontal() - this._speed);
    this.getGraphics().x = this.getHorizontal();
  }
  moveRight() {
    this.setHorizontal(this.getHorizontal() + this._speed);
    this.getGraphics().x = this.getHorizontal();
  }
  stop() {}
}