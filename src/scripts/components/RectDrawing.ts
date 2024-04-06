import { Graphics } from "pixi.js";
import{ ActiveObjectParameters } from '../interface/ActiveObjectParameters'

export class RectDrawing {
  static draw(parameters: ActiveObjectParameters): Graphics {
    let graphics: Graphics = parameters.graphics;
    graphics.rect(0, 0, parameters.width, parameters.height);
    graphics.stroke({ width: parameters.widthStroke, color: parameters.color })
    graphics.fill({ color: parameters.color, alpha: parameters.alpha })
    return graphics;
  }
}