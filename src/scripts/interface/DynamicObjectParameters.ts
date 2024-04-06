import { Graphics } from "pixi.js";

export interface DynamicObjectParameters {
  isLoaded: boolean,
  color: number,
  alpha: number,
  graphics: Graphics,
  width: number,
  height: number,
  widthStroke: number
}