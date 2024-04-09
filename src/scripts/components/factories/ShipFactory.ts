import { Ship } from "../../entities/Ship";
import { RectDrawing } from "../RectDrawing";
import { Graphics, Container } from "pixi.js";
import { DynamicObjectParameters } from "../../interface/DynamicObjectParameters";
import { shipConfig } from "../../utils/Configs";
import { Position } from "../../interface/Position";
import { Direction } from "../../entities/Direction"

export class ShipFactory {
  static createShip(x: number, y: number, speed: number): Ship {
    const isLoaded: boolean = Math.random() > 0.5;
    const color = isLoaded ? shipConfig.color.red : shipConfig.color.green;
    const alpha = isLoaded ? shipConfig.back.with : shipConfig.back.without;
    const movement: Position = { x: x, y: y };
    const shipValue: DynamicObjectParameters = {
      x: -(shipConfig.width/2),
      y: -(shipConfig.height/2),
      color: color,
      alpha: alpha,
      graphics: new Graphics(),
      width: shipConfig.width,
      height: shipConfig.height,
      widthStroke: shipConfig.widthStroke,
    };
    shipValue.graphics = RectDrawing.draw(shipValue);
    const container: Container = new Container();
    container.addChild(shipValue.graphics); 
    return new Ship(
      isLoaded,
      shipValue.graphics,
      shipValue.color,
      movement,
      speed,
      Direction.Left,
      container
    );
  }
}
