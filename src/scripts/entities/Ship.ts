import { Graphics, Container } from "pixi.js";
import { DynamicObject } from "../abstract/DynamicObject";
import { Position } from "../interface/Position";
import { Pier } from "./Pier";
import { shipConfig } from "../utils/Configs";
import { DynamicObjectParameters } from "../interface/DynamicObjectParameters";
import { RectDrawing } from "../components/RectDrawing";
import { Direction } from "./Direction";

export class Ship extends DynamicObject {
  private _speed: number;
  private _pier: Pier = null;
  private _direction: Direction;
  private _container: Container;

  constructor(
    isLoaded: boolean,
    graphics: Graphics,
    color: number,
    movement: Position,
    speed: number,
    direction: Direction,
    container: Container
  ) {
    super(isLoaded, graphics, color, movement);
    this._speed = speed;
    this._direction = direction;
    this._container = container;
  }

  public setSpeed(value: number): void {
    this._speed = value;
  }
  public getSpeed(): number {
    return this._speed;
  }
  public setPier(value: Pier): void {
    this._pier = value;
  }
  public getPier(): Pier {
    return this._pier;
  }
  public getDirection(): Direction {
    return this._direction;
  }
  public serDirection(value: Direction): void {
    this._direction = value;
  }
  public setContainer(value: Container): void {
    this._container = value;
  }
  public getContainer(): Container {
    return this._container;
  }

  public togglerShip(): void {
    this.setIsLoaded(!this.getIsLoaded());
    const alpha = this.getIsLoaded()
      ? shipConfig.back.with
      : shipConfig.back.without;

    const shipValue: DynamicObjectParameters = {
      x: -(shipConfig.width/2),
      y: -(shipConfig.height/2),
      color: this.getColor(),
      alpha: alpha,
      graphics: this.getGraphics(),
      width: shipConfig.width,
      height: shipConfig.height,
      widthStroke: shipConfig.widthStroke,
    };
    this.getGraphics().clear();
    this.setGraphics(RectDrawing.draw(shipValue));
  }
}
