import { Graphics } from "pixi.js";
import{ DynamicObjectParameters } from '../interface/DynamicObjectParameters'
import { StaticObjectParameters } from "../interface/StaticObjectParameters";

export class RectDrawing {
  static dynamicObjectDraw(parameters: DynamicObjectParameters): Graphics {
    return RectDrawing.setupValue(
      parameters.graphics, 
      parameters.width, 
      parameters.height, 
      parameters.color, 
      parameters.widthStroke, 
      parameters.alpha
    );
  }

  static staticObjectDraw(parameters: StaticObjectParameters): Graphics {
    return RectDrawing.setupValue(
      parameters.graphics, 
      parameters.width, 
      parameters.height, 
      parameters.color, 
      parameters.widthStroke, 
      parameters.alpha
    );
  }

  private static setupValue(
    graphics: Graphics, 
    width: number, 
    height:number, 
    color:number, 
    widthStroke: number, 
    alpha:number
  ): Graphics {
    graphics.rect(0, 0, width, height);
    graphics.stroke({ width: widthStroke, color: color });
    graphics.fill({ color: color, alpha: alpha });
    return graphics
  }
}