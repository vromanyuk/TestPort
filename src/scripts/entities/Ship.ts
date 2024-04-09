import { Graphics } from "pixi.js";
import { DynamicObject } from '../abstract/DynamicObject';
import { Position } from "../interface/Position";
import { Pier } from "./Pier";
import { shipConfig } from "../utils/Configs";
import { DynamicObjectParameters } from "../interface/DynamicObjectParameters";
import { RectDrawing } from "../components/RectDrawing";

export class Ship extends DynamicObject {
  private _speed: number;
  private _pier: Pier = null;

  constructor(
    isLoaded: boolean, 
    graphics: Graphics, 
    color: number, 
    movement: Position, 
    speed: number
  ) {
    super(isLoaded, graphics, color, movement);
    this._speed = speed;
  }

  public setSpeed(value: number):void { this._speed = value; }
  public getSpeed(): number { return this._speed; }
  public setPier(value: Pier): void { this._pier = value; }
  public getPier(): Pier { return this._pier; }

  public togglerShip(): void {
    this.setIsLoaded(!this.getIsLoaded());
    const alpha = this.getIsLoaded() ? shipConfig.back.with : shipConfig.back.without;

    const shipValue: DynamicObjectParameters = {
      x: 0,
      y: 0,
      color: this.getColor(),
      alpha: alpha,
      graphics: this.getGraphics(),
      width: this.getGraphics().width,
      height: this.getGraphics().height,
      widthStroke: shipConfig.widthStroke
    }
    this.getGraphics().clear();
    this.setGraphics(RectDrawing.draw(shipValue));
  }
}