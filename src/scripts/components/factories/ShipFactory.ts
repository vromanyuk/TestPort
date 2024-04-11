import { Ship } from "../../entities/Ship";
import { RectDrawing } from "../RectDrawing";
import { Graphics, Container } from "pixi.js";
import { DynamicObjectParameters } from "../../interface/DynamicObjectParameters";
import { shipConfig } from "../../utils/Configs";
import { Direction } from "../../entities/Direction"

export class ShipFactory {
  static createShip(speed: number): Ship {
    const isLoaded: boolean = Math.random() > 0.5;
    const color = isLoaded ? shipConfig.color.red : shipConfig.color.green;
    const alpha = isLoaded ? shipConfig.back.with : shipConfig.back.without;
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
    const shipCenter: Graphics = new Graphics();
    const shipLine: Graphics = new Graphics();
    shipCenter.circle(0, 0, 3);
    shipCenter.fill({ color: 0xFFFFFF, alpha: 1 });
    shipLine.rect(5, 0, 20, 2);
    shipLine.fill({ color: 0xFFFFFF, alpha: 1 });
    const container: Container = new Container();
    container.addChild(shipValue.graphics);
    container.addChild(shipCenter);
    container.addChild(shipLine);

    return new Ship(
      isLoaded,
      shipValue.graphics,
      shipValue.color,
      speed,
      Direction.Left,
      container
    );
  }
}
