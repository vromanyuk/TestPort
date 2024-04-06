import { Ship } from "../../entities/Ship";
import { RectDrawing } from "../RectDrawing";
import { Graphics } from "pixi.js";
import { DynamicObjectParameters } from "../../interface/DynamicObjectParameters";
import { shipConfig } from '../../utils/Configs';

export class ShipFactory {
  static createShip(): Ship {
    const isLoaded: boolean = Math.random() > 0.5;
    const color = isLoaded ? shipConfig.color.red : shipConfig.color.green;
    const alpha = isLoaded ? shipConfig.back.with : shipConfig.back.without;
    const shipValue: DynamicObjectParameters = {
      isLoaded: isLoaded,
      color: color,
      alpha: alpha,
      graphics: new Graphics(),
      width: shipConfig.width,
      height: shipConfig.height,
      widthStroke: shipConfig.widthStroke
    }
    shipValue.graphics = RectDrawing.dynamicObjectDraw(shipValue);
    return new Ship(shipValue.isLoaded, shipValue.graphics, shipValue.color);
  }
}