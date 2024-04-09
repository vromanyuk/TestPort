import { Graphics } from "pixi.js";
import * as TWEEN from "@tweenjs/tween.js";
import { Position } from "../interface/Position";
import { CollisionDetector } from "./CollisionDetector";
import { Pier } from "../entities/Pier";
import {
  shipConfig,
  startShipPoint,
  waitingPointFullShip,
  waitingPointEmptyShip,
} from "../utils/Configs";
import { Ship } from "../entities/Ship";
import { CargoLine } from "../components/CargoLine";
import { Direction } from "../entities/Direction";

export class AnimationManager {
  private _collisionDetector: CollisionDetector;
  private _cargoLine: CargoLine;
  private _pointChoosePier: Position = { x: 220, y: 340 };
  private _pointToExit: Position = { x: 180, y: 380 };

  constructor(collisionDetector: CollisionDetector, cargoLine: CargoLine) {
    this._collisionDetector = collisionDetector;
    this._cargoLine = cargoLine;
  }

  public async animationToExit(element: Graphics, pier: Pier): Promise<void> {
    let from: Position = { x: element.x, y: element.y };
    let to: Position = { x: this._pointToExit.x, y: element.y };
    let duration: number = this.getDuration(from, to);
    await this.rotate(Direction.Right, element);
    await this.aniamtion(element, to, duration);

    from = { x: element.x, y: element.y };
    duration = this.getDuration(from, this._pointToExit);
    await this.rotate(Direction.Down, element);
    await this.aniamtion(element, this._pointToExit, duration);

    from = { x: element.x, y: element.y };
    to = { x: startShipPoint.x, y: element.y };
    duration = this.getDuration(from, to);
    await this.rotate(Direction.Right, element);
    await this.aniamtion(element, to, duration);

    from = { x: element.x, y: element.y };
    duration = this.getDuration(from, startShipPoint);
    await this.rotate(Direction.Up, element);
    await this.aniamtion(element, startShipPoint, duration);
  }

  public async animationToFullShipWaiting(element: Graphics): Promise<void> {
    let from: Position = { x: element.x, y: element.y };
    let to: Position = { x: element.x, y: waitingPointFullShip.y };
    let duration: number = this.getDuration(from, to);
    await this.rotate(Direction.Up, element);
    await this.aniamtion(element, to, duration);

    from = { x: element.x, y: element.y };
    duration = this.getDuration(from, waitingPointFullShip);
    await this.rotate(Direction.Left, element);
    await this.aniamtion(element, waitingPointFullShip, duration);
  }

  public async animationToEmptyShipWaiting(element: Graphics): Promise<void> {
    let from: Position = { x: element.x, y: element.y };
    let to: Position = { x: element.x, y: waitingPointEmptyShip.y };
    let duration: number = this.getDuration(from, to);
    await this.rotate(Direction.Down, element);
    await this.aniamtion(element, to, duration);

    from = { x: element.x, y: element.y };
    duration = this.getDuration(from, waitingPointEmptyShip);
    await this.rotate(Direction.Left, element);
    await this.aniamtion(element, waitingPointEmptyShip, duration);
  }

  public async aniamtionToPierFromWaitingPosition(
    ship: Ship,
    pier: Pier
  ): Promise<void> {
    const element: Graphics = ship.getGraphics();
    let from: Position = { x: element.x, y: element.y };
    let to: Position = { x: element.x, y: this._pointChoosePier.y };
    let duration: number = this.getDuration(from, to);
    ship.getIsLoaded()
      ? await this.rotate(Direction.Down, element)
      : await this.rotate(Direction.Up, element);
    await this.aniamtion(element, to, duration);

    from = { x: element.x, y: element.y };
    duration = this.getDuration(from, this._pointChoosePier);
    await this.rotate(Direction.Left, element);
    await this.aniamtion(element, this._pointChoosePier, duration);

    from = { x: element.x, y: element.y };
    to = { x: this._pointChoosePier.x, y: pier.getPointMooring().y };
    duration = this.getDuration(from, to);
    await this.aniamtion(element, to, duration);

    from = { x: element.x, y: element.y };
    duration = this.getDuration(from, pier.getPointMooring());
    await this.aniamtion(element, pier.getPointMooring(), duration);
  }

  public async aniamtionToPier(ship: Ship, pier: Pier): Promise<void> {
    const element: Graphics = ship.getGraphics();
    let from: Position = { x: element.x, y: element.y };
    let to: Position;
    let duration: number = this.getDuration(from, this._pointChoosePier);
    await this.aniamtion(element, this._pointChoosePier, duration);
    await this.rotate(Direction.Up, element);

    from = { x: element.x, y: element.y };
    to = { x: this._pointChoosePier.x, y: pier.getPointMooring().y };
    duration = this.getDuration(from, to);
    await this.aniamtion(element, to, duration);
    await this.rotate(Direction.Left, element);

    from = { x: element.x, y: element.y };
    duration = this.getDuration(from, pier.getPointMooring());
    await this.aniamtion(element, pier.getPointMooring(), duration);
    this._cargoLine.addCargoShip(ship);
  }

  private aniamtion(
    element: Graphics,
    position: Position,
    duration: number
  ): Promise<void> {
    return new Promise((resolve) => {
      const tween = new TWEEN.Tween(element)
        .to({ x: position.x, y: position.y }, duration)
        .onUpdate(() => {
          if (this._collisionDetector.isCollision(element)) {
            tween.stop();
          }
        })
        .onComplete(() => {
          resolve();
        })
        .start();
    });
  }

  private rotate(to: Direction, ship: Graphics): Promise<void> {
    return new Promise((resolve) => {
      const radians: number = (to * Math.PI) / 180;
      ship.rotation = radians;
      resolve();
    });
  }

  private getDuration(from: Position, to: Position): number {
    const distance = Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2);
    return (distance / shipConfig.speed) * 1000;
  }
}
