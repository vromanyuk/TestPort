import { Graphics } from "pixi.js";
import { Position } from "../interface/Position";

export abstract class DynamicObject {
  private _isLoaded: boolean;
  private _graphics: Graphics;
  private _color: number;
  private _movement: Position

  constructor(isLoaded: boolean, graphics: Graphics, color: number, movement: Position) {
    this._isLoaded = isLoaded;
    this._graphics = graphics;
    this._color = color;
    this._movement = movement;
  }

  public getIsLoaded():boolean { return this._isLoaded; }
  public setIsLoaded(value: boolean):void { this._isLoaded = value; }
  public getGraphics(): Graphics { return this._graphics; }
  public setGraphics(value: Graphics): void { this._graphics = value; }
  public getColor(): number { return this._color; }
  public setColor(value: number): void { this._color = value; }
  public setVertical(value: number): void { this._movement.y = value; }
  public setHorizontal(value: number): void { this._movement.x = value; }
  public getVertical(): number { return this._movement.y; }
  public getHorizontal(): number { return this._movement.x; }
}