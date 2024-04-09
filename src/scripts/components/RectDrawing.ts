import { Graphics } from "pixi.js";
import{ DynamicObjectParameters } from '../interface/DynamicObjectParameters'
import { StaticObjectParameters } from "../interface/StaticObjectParameters";

export class RectDrawing {
  static draw(parameters: DynamicObjectParameters): Graphics;
  static draw(parameters: StaticObjectParameters): Graphics {
    let graphics = parameters.graphics;
    graphics.rect(parameters.x, parameters.y, parameters.width, parameters.height);
    graphics.stroke({ width: parameters.widthStroke, color: parameters.color });
    graphics.fill({ color: parameters.color, alpha: parameters.alpha });
    return graphics;
  }
}