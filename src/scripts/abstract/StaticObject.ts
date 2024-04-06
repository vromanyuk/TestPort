import { Graphics } from "pixi.js";

export abstract class StaticObject {
  private _graphics: Graphics;
  private _color: number;

  constructor(graphics: Graphics, color: number) {
    this._graphics = graphics;
    this._color = color;
  }

  getGraphics(): Graphics { return this._graphics; }
  setGraphics(value: Graphics): void { this._graphics = value; }
  getColor(): number { return this._color; }
  setColor(value: number): void { this._color = value; }
} 