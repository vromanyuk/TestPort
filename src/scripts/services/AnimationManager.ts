import { Container } from "pixi.js";
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
import { SceneManager } from "./SceneManager";

export class AnimationManager {
  private _collisionDetector: CollisionDetector;
  private _cargoLine: CargoLine;
  private _sceneManager: SceneManager;

  private _pointChoosePier: Position = { x: 260, y: 355 };
  private _pointToExit: Position = { x: 220, y: 415 };

  constructor(
    collisionDetector: CollisionDetector,
    cargoLine: CargoLine,
    sceneManager: SceneManager
  ) {
    this._collisionDetector = collisionDetector;
    this._cargoLine = cargoLine;
    this._sceneManager = sceneManager;
  }

  public async animationToExit(ship: Ship, pier: Pier): Promise<void> {
    const element: Container = ship.getContainer();
    let from: Position = { x: element.x, y: element.y };
    let to: Position = { x: this._pointToExit.x, y: element.y };
    let duration: number = this.getDuration(from, to);
    await this.aniamtion(element, to, Direction.Right, duration);

    from = { x: element.x, y: element.y };
    duration = this.getDuration(from, this._pointToExit);
    const index = this._sceneManager.getPiers().indexOf(pier);
    await this.aniamtion(
      element,
      this._pointToExit,
      index > 1 ? Direction.Up : Direction.Down,
      duration
    );

    from = { x: element.x, y: element.y };
    to = { x: startShipPoint.x, y: element.y };
    duration = this.getDuration(from, to);
    await this.aniamtion(element, to, Direction.Right, duration);

    from = { x: element.x, y: element.y };
    duration = this.getDuration(from, startShipPoint);
    await this.aniamtion(element, startShipPoint, Direction.Up, duration);
    this._sceneManager.removeShip(ship);
  }

  public async animationToFullShipWaiting(ship: Ship): Promise<void> {
    const element: Container = ship.getContainer();
    let from: Position = { x: element.x, y: element.y };
    let to: Position = { x: element.x, y: waitingPointFullShip.y };
    let duration: number = this.getDuration(from, to);
    await this.aniamtion(element, to, Direction.Up, duration);

    from = { x: element.x, y: element.y };
    duration = this.getDuration(from, waitingPointFullShip);
    await this.aniamtion(
      element,
      waitingPointFullShip,
      Direction.Left,
      duration
    );
  }

  public async animationToEmptyShipWaiting(ship: Ship): Promise<void> {
    const element: Container = ship.getContainer();
    let from: Position = { x: element.x, y: element.y };
    let to: Position = { x: element.x, y: waitingPointEmptyShip.y };
    let duration: number = this.getDuration(from, to);
    await this.aniamtion(element, to, Direction.Down, duration);

    from = { x: element.x, y: element.y };
    duration = this.getDuration(from, waitingPointEmptyShip);
    await this.aniamtion(
      element,
      waitingPointEmptyShip,
      Direction.Left,
      duration
    );
  }

  public async aniamtionToPierFromWaitingPosition(
    ship: Ship,
    pier: Pier
  ): Promise<void> {
    const element: Container = ship.getContainer();
    let from: Position = { x: element.x, y: element.y };
    let to: Position = { x: element.x, y: this._pointChoosePier.y };
    let duration: number = this.getDuration(from, to);
    await this.aniamtion(
      element,
      to,
      ship.getIsLoaded() ? Direction.Down : Direction.Up,
      duration
    );

    from = { x: element.x, y: element.y };
    duration = this.getDuration(from, this._pointChoosePier);
    await this.aniamtion(
      element,
      this._pointChoosePier,
      Direction.Left,
      duration
    );

    from = { x: element.x, y: element.y };
    to = { x: this._pointChoosePier.x, y: pier.getPointMooring().y };
    duration = this.getDuration(from, to);
    const index = this._sceneManager.getPiers().indexOf(pier);
    await this.aniamtion(
      element,
      to,
      index > 1 ? Direction.Up : Direction.Down,
      duration
    );

    from = { x: element.x, y: element.y };
    duration = this.getDuration(from, pier.getPointMooring());
    await this.aniamtion(
      element,
      pier.getPointMooring(),
      Direction.Left,
      duration
    );
  }

  public async aniamtionToPier(ship: Ship, pier: Pier): Promise<void> {
    const element: Container = ship.getContainer();
    let from: Position = { x: element.x, y: element.y };
    let to: Position;
    let duration: number = this.getDuration(from, this._pointChoosePier);
    await this.aniamtion(element, this._pointChoosePier, 0, duration);

    from = { x: element.x, y: element.y };
    to = { x: this._pointChoosePier.x, y: pier.getPointMooring().y };
    duration = this.getDuration(from, to);
    await this.aniamtion(element, to, Direction.Up, duration);

    from = { x: element.x, y: element.y };
    duration = this.getDuration(from, pier.getPointMooring());
    await this.aniamtion(
      element,
      pier.getPointMooring(),
      Direction.Left,
      duration
    );
    this._cargoLine.addCargoShip(ship);
  }

  private aniamtion(
    element: Container,
    position: Position,
    rotation: number,
    duration: number
  ): Promise<void> {
    return new Promise((resolve) => {
      new TWEEN.Tween(element)
        .to({ rotation: rotation }, 2000)
        .onComplete(() => {
          const tweenMove = new TWEEN.Tween(element)
            .to({ x: position.x, y: position.y }, duration)
            .onUpdate(() => {
              if (this._collisionDetector.isCollision(element)) {
                tweenMove.stop();
              }
            })
            .onComplete(() => resolve())
            .start();
        })
        .start();
    });
  }

  private getDuration(from: Position, to: Position): number {
    const distance = Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2);
    return (distance / shipConfig.speed) * 1000;
  }
}
