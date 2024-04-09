import { Graphics } from "pixi.js";

export interface StaticObjectParameters {
  x: number,
  y: number,
  color: number,
  graphics: Graphics,
  width: number,
  height: number,
  widthStroke: number,
  alpha: number
}