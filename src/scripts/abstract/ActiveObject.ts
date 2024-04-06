import { Graphics } from "pixi.js";

export abstract class ActiveObject {
  private _isLoaded: boolean;
  private _graphics: Graphics;
  private _color: number;

  constructor(isLoaded: boolean, graphics: Graphics, color: number) {
    this._isLoaded = isLoaded;
    this._graphics = graphics;
    this._color = color;
  }

  getIsLoaded():boolean { return this._isLoaded; }
  setIsLoaded(value: boolean):void { this._isLoaded = value; }
  getGraphics(): Graphics { return this._graphics; }
  setGraphics(value: Graphics): void { this._graphics = value; }
  getColor(): number { return this._color; }
  setColor(value: number): void { this._color = value; }
}