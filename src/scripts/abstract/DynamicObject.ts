import { Graphics } from "pixi.js";

export abstract class DynamicObject {
  private _isLoaded: boolean;
  private _graphics: Graphics;
  private _color: number;

  constructor(isLoaded: boolean, graphics: Graphics, color: number) {
    this._isLoaded = isLoaded;
    this._graphics = graphics;
    this._color = color;
  }

  public getIsLoaded():boolean { return this._isLoaded; }
  public setIsLoaded(value: boolean):void { this._isLoaded = value; }
  public getGraphics(): Graphics { return this._graphics; }
  public setGraphics(value: Graphics): void { this._graphics = value; }
  public getColor(): number { return this._color; }
  public setColor(value: number): void { this._color = value; }
}