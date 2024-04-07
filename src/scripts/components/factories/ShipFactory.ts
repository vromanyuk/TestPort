import { Ship } from "../../entities/Ship";
import { RectDrawing } from "../RectDrawing";
import { Graphics } from "pixi.js";
import { DynamicObjectParameters } from "../../interface/DynamicObjectParameters";
import { shipConfig } from '../../utils/Configs';
import { Position } from "../../interface/Position";

export class ShipFactory {
  static createShip(x: number, y: number, speed: number): Ship {
    const isLoaded: boolean = Math.random() > 0.5;
    const color = isLoaded ? shipConfig.color.red : shipConfig.color.green;
    const alpha = isLoaded ? shipConfig.back.with : shipConfig.back.without;
    const movement: Position = { x: x, y: y };
    const shipValue: DynamicObjectParameters = {
      color: color,
      alpha: alpha,
      graphics: new Graphics(),
      width: shipConfig.width,
      height: shipConfig.height,
      widthStroke: shipConfig.widthStroke
    }
    shipValue.graphics = RectDrawing.draw(shipValue);
    return new Ship(
      isLoaded, 
      shipValue.graphics, 
      shipValue.color, 
      movement,
      speed
    );
  }
}