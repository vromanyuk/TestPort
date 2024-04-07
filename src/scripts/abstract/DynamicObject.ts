import { Graphics } from "pixi.js";
import { Movement } from "../interface/Movement";

export abstract class DynamicObject {
  private _isLoaded: boolean;
  private _graphics: Graphics;
  private _color: number;
  private _movement: Movement

  constructor(isLoaded: boolean, graphics: Graphics, color: number, movement: Movement) {
    this._isLoaded = isLoaded;
    this._graphics = graphics;
    this._color = color;
    this._movement = movement;
  }

  getIsLoaded():boolean { return this._isLoaded; }
  setIsLoaded(value: boolean):void { this._isLoaded = value; }
  getGraphics(): Graphics { return this._graphics; }
  setGraphics(value: Graphics): void { this._graphics = value; }
  getColor(): number { return this._color; }
  setColor(value: number): void { this._color = value; }
  setVertical(value: number): void { this._movement.vertical = value; }
  setHorizontal(value: number): void { this._movement.horizontal = value; }
  getVertical(): number { return this._movement.vertical; }
  getHorizontal(): number { return this._movement.horizontal; }
}