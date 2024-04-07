import { Graphics } from "pixi.js";
import { Breakwater } from "../../entities/Breakwater";
import { StaticObjectParameters } from "../../interface/StaticObjectParameters";
import { breakwaterConfig } from '../../utils/Configs';
import { RectDrawing } from "../RectDrawing";

export class BreakwaterFactory {
  static createBreakwater(): Breakwater {
    const breakwaterValue: StaticObjectParameters = {
      color: breakwaterConfig.color,
      graphics: new Graphics,
      width: breakwaterConfig.width,
      height: breakwaterConfig.height,
      widthStroke: breakwaterConfig.widthStroke,
      alpha: breakwaterConfig.back
    };
    breakwaterValue.graphics = RectDrawing.draw(breakwaterValue);
    return new Breakwater(breakwaterValue.graphics, breakwaterValue.color);
  }
}