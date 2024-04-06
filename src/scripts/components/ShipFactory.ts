import { Ship } from "../entities/Ship";
import { RectDrawing } from "./RectDrawing";
import { Graphics } from "pixi.js";
import { ActiveObjectParameters } from "../interface/ActiveObjectParameters";

export class ShipFactory {
  private static RED_COLOR: number = 0xde3249;
  private static GREEN_COLOR: number = 0x35cc5a;
  private static USE_ALPHA: number = 1;
  private static WITHOUT_ALPHA: number = 0;
  private static WIDTH_SHIP: number = 80;
  private static HEIGHT: number = 30;
  private static WIDTH_STROKE: number = 4;

  static createShip(): Ship {
    const isLoaded: boolean = Math.random() > 0.5;
    const color = isLoaded ? ShipFactory.RED_COLOR : ShipFactory.GREEN_COLOR;
    const alpha = isLoaded ? ShipFactory.USE_ALPHA : ShipFactory.WITHOUT_ALPHA;
    const shipValue: ActiveObjectParameters = {
      isLoaded: isLoaded,
      color: color,
      alpha: alpha,
      graphics: new Graphics(),
      width: ShipFactory.WIDTH_SHIP,
      height: ShipFactory.HEIGHT,
      widthStroke: ShipFactory.WIDTH_STROKE
    }
    shipValue.graphics = RectDrawing.draw(shipValue);
    return new Ship(shipValue.isLoaded, shipValue.graphics, shipValue.color);
  }
}