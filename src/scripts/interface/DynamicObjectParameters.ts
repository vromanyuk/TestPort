import { Graphics } from "pixi.js";

export interface DynamicObjectParameters {
  x: number;
  y: number;
  color: number;
  alpha: number;
  graphics: Graphics;
  width: number;
  height: number;
  widthStroke: number;
}
