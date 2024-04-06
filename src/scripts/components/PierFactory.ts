import { Graphics } from "pixi.js";
import { Pier } from "../entities/Pier";
import { ActiveObjectParameters } from "../interface/ActiveObjectParameters";
import { RectDrawing } from "./RectDrawing";

export class PierFactory {
  private static WIDTH: number = 40;
  private static HEIGHT: number = 120;
  private static WIDTH_STROKE: number = 4;
  private static YELLOW_COLOR: number = 0xffd800;
  private static PIER_START_STATE: boolean = false;
  private static PIER_START_ALPHA: number = 0;

  static createPier(): Pier {
    const pierValue: ActiveObjectParameters = {
      isLoaded: PierFactory.PIER_START_STATE,
      color: PierFactory.YELLOW_COLOR,
      alpha: PierFactory.PIER_START_ALPHA,
      graphics: new Graphics(),
      width: PierFactory.WIDTH,
      height: PierFactory.HEIGHT,
      widthStroke: PierFactory.WIDTH_STROKE
    };
    pierValue.graphics = RectDrawing.draw(pierValue);
    return new Pier(pierValue.isLoaded, pierValue.graphics, pierValue.color);
  }
}