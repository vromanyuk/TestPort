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
  gateConfig,
} from "../utils/Configs";
import { Ship } from "../entities/Ship";
import { CargoLine } from "../components/CargoLine";
import { Direction } from "../entities/Direction";
import { SceneManager } from "./SceneManager";
import { Gate } from "../entities/Gate";

export class AnimationManager {
  private _collisionDetector: CollisionDetector;
  private _cargoLine: CargoLine;
  private _sceneManager: SceneManager;

  private _gate: Gate;
  private _pointChoosePier: Position = { x: 240, y: 355 };
  private _pointToExit: Position = { x: 200, y: 415 };

  constructor(
    collisionDetector: CollisionDetector,
    cargoLine: CargoLine,
    sceneManager: SceneManager
  ) {
    this._collisionDetector = collisionDetector;
    this._cargoLine = cargoLine;
    this._sceneManager = sceneManager;
    this._gate = new Gate(
      gateConfig.x,
      gateConfig.width,
      gateConfig.height,
      false
    );
  }

  public async animationToExit(ship: Ship, pier: Pier): Promise<void> {
    const element: Container = ship.getContainer();
    let from: Position = { x: element.x, y: element.y };
    let to: Position = { x: this._pointToExit.x, y: element.y };
    let duration: number = this.getDuration(from, to);
    await this.aniamtion(element, Direction.Right, to, duration);

    from = { x: element.x, y: element.y };
    duration = this.getDuration(from, this._pointToExit);
    const index = this._sceneManager.getPiers().indexOf(pier);
    await this.aniamtion(
      element,
      index > 1 ? Direction.Up : Direction.Down,
      this._pointToExit,
      duration
    );

    from = { x: element.x, y: element.y };
    to = { x: startShipPoint.x, y: element.y };
    duration = this.getDuration(from, to);
    await this.aniamtion(element, Direction.Right, to, duration);

    from = { x: element.x, y: element.y };
    duration = this.getDuration(from, startShipPoint);
    await this.aniamtion(element, Direction.Up, startShipPoint, duration);
    this._sceneManager.removeShip(ship);
  }

  public async animationToFullShipWaiting(ship: Ship): Promise<void> {
    const element: Container = ship.getContainer();
    let from: Position = { x: element.x, y: element.y };
    let to: Position = { x: element.x, y: waitingPointFullShip.y };
    let duration: number = this.getDuration(from, to);
    await this.aniamtion(element, Direction.Up, to, duration);

    from = { x: element.x, y: element.y };
    duration = this.getDuration(from, waitingPointFullShip);
    await this.aniamtion(
      element,
      Direction.Left,
      waitingPointFullShip,
      duration
    );
  }

  public async animationToEmptyShipWaiting(ship: Ship): Promise<void> {
    const element: Container = ship.getContainer();
    let from: Position = { x: element.x, y: element.y };
    let to: Position = { x: element.x, y: waitingPointEmptyShip.y };
    let duration: number = this.getDuration(from, to);
    await this.aniamtion(element, Direction.Down, to, duration);

    from = { x: element.x, y: element.y };
    duration = this.getDuration(from, waitingPointEmptyShip);
    await this.aniamtion(
      element,
      Direction.Left,
      waitingPointEmptyShip,
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
      ship.getIsLoaded() ? Direction.Down : Direction.Up,
      to,
      duration
    );

    from = { x: element.x, y: element.y };
    duration = this.getDuration(from, this._pointChoosePier);
    await this.aniamtion(
      element,
      Direction.Left,
      this._pointChoosePier,
      duration
    );

    from = { x: element.x, y: element.y };
    to = { x: this._pointChoosePier.x, y: pier.getPointMooring().y };
    duration = this.getDuration(from, to);
    const index = this._sceneManager.getPiers().indexOf(pier);
    await this.aniamtion(
      element,
      index > 1 ? Direction.Up : Direction.Down,
      to,
      duration
    );

    from = { x: element.x, y: element.y };
    duration = this.getDuration(from, pier.getPointMooring());
    await this.aniamtion(
      element,
      Direction.Left,
      pier.getPointMooring(),
      duration
    );
  }

  public async aniamtionToPier(ship: Ship, pier: Pier): Promise<void> {
    const element: Container = ship.getContainer();
    let from: Position = { x: element.x, y: element.y };
    let to: Position;
    let duration: number = this.getDuration(from, this._pointChoosePier);
    await this.aniamtion(
      element,
      Direction.Left,
      this._pointChoosePier,
      duration
    );

    from = { x: element.x, y: element.y };
    to = { x: this._pointChoosePier.x, y: pier.getPointMooring().y };
    duration = this.getDuration(from, to);
    await this.aniamtion(element, Direction.Up, to, duration);

    from = { x: element.x, y: element.y };
    duration = this.getDuration(from, pier.getPointMooring());
    await this.aniamtion(
      element,
      Direction.Left,
      pier.getPointMooring(),
      duration
    );
    this._cargoLine.addCargoShip(ship);
  }

  private aniamtion(
    element: Container,
    direction: Direction,
    to: Position,
    duration: number
  ): Promise<void> {
    return new Promise((resolve) => {
      new TWEEN.Tween(element)
        .to({ rotation: direction }, 1000)
        .onComplete(() => {
          const tweenMove = new TWEEN.Tween(element)
            .to({ x: to.x, y: to.y }, duration)
            .onUpdate(() => {

              if (this._collisionDetector.isCollision(element, direction)) {
                tweenMove.stop();
                this.waitForCollisionToEnd(element, direction, to, resolve);
              }
            })
            .onComplete(() => resolve())
            .start();
        })
        .start();
    });
  }

  private waitForCollisionToEnd(
    element: Container,
    direction: Direction,
    to: Position,
    resolve: () => void
  ): void {
    setTimeout(() => {
      if (!this._collisionDetector.isCollision(element, direction)) {
        const from: Position = { x: element.x, y: element.y };
        const newDuration: number = this.getDuration(from, to);
        this.aniamtion(element, direction, to, newDuration).then(resolve);
      } else {
        this.waitForCollisionToEnd(element, direction, to, resolve);
      }
    }, 500);
  }

  private getDuration(from: Position, to: Position): number {
    const distance = Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2);
    return (distance / shipConfig.speed) * 1000;
  }
}
