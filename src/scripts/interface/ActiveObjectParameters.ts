import { Graphics } from "pixi.js";

export interface ActiveObjectParameters {
  isLoaded: boolean,
  color: number,
  alpha: number,
  graphics: Graphics,
  width: number,
  height: number,
  widthStroke: number
}