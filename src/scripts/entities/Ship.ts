import { Graphics, Container } from "pixi.js";
import { DynamicObject } from "../abstract/DynamicObject";
import { Pier } from "./Pier";
import { shipConfig } from "../utils/Configs";
import { DynamicObjectParameters } from "../interface/DynamicObjectParameters";
import { RectDrawing } from "../components/RectDrawing";
import { Direction } from "./Direction";
import * as TWEEN from "@tweenjs/tween.js";

export class Ship extends DynamicObject {
  private _pier: Pier = null;
  private _direction: Direction;
  private _container: Container;
  private _tweenAnimation: TWEEN.Tween<Container>;
  private _priotiy: boolean;

  constructor(
    isLoaded: boolean,
    graphics: Graphics,
    color: number,
    direction: Direction,
    container: Container
  ) {
    super(isLoaded, graphics, color);
    this._direction = direction;
    this._container = container;
    this._tweenAnimation = null;
    this._priotiy = false;
  }
  public setPriority(value: boolean): void {
    this._priotiy = value;
  }
  public getPriority(): boolean {
    return this._priotiy;
  }
  public seTweenAnimation(value: TWEEN.Tween<Container>): void {
    this._tweenAnimation = value;
  }
  public getTweenAnimation(): TWEEN.Tween<Container> {
    return this._tweenAnimation;
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
  public setDirection(value: Direction): void {
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
      x: -(shipConfig.width / 2),
      y: -(shipConfig.height / 2),
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
