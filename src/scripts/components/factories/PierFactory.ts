import { Graphics } from "pixi.js";
import { Pier } from "../../entities/Pier";
import { DynamicObjectParameters } from "../../interface/DynamicObjectParameters";
import { RectDrawing } from "../RectDrawing";
import { pierConfig } from "../../utils/Configs";
import { Position } from "../../interface/Position";

export class PierFactory {
  static createPier(busy: boolean, pointMooring: Position): Pier {
    const isLoaded = pierConfig.back !== 0;
    const pierValue: DynamicObjectParameters = {
      x: 0,
      y: 0,
      color: pierConfig.color,
      alpha: pierConfig.back,
      graphics: new Graphics(),
      width: pierConfig.width,
      height: pierConfig.height,
      widthStroke: pierConfig.widthStroke,
    };
    pierValue.graphics = RectDrawing.draw(pierValue);
    return new Pier(
      isLoaded,
      pierValue.graphics,
      pierValue.color,
      busy,
      pointMooring
    );
  }
}
