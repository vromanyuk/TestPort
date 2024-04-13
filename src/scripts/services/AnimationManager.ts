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
import { Constants } from "../utils/Constants";

export class AnimationManager {
  private _collisionDetector: CollisionDetector;
  private _cargoLine: CargoLine;
  private _sceneManager: SceneManager;

  private _pointChoosePier: Position = {
    x: Constants.POINT_CHOOSE_TO_PIER_X,
    y: Constants.POINT_CHOOSE_TO_PIER_Y,
  };
  private _pointToExit: Position = {
    x: Constants.POINT_TO_EXIT_X,
    y: Constants.POINT_TO_EXIT_Y,
  };
  private _pointToPort: Position = {
    x: Constants.POINT_TO_PORT_X,
    y: Constants.POINT_TO_PORT_Y,
  };

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

    // --- Start ship animation from pier
    let from: Position = { x: element.x, y: element.y };
    let to: Position = { x: this._pointToExit.x, y: element.y };
    let duration: number = this.getDuration(from, to);
    ship.setDirection(Direction.Right);
    await this.animation(ship, to, duration);

    // --- Start ship animation from pier to gate
    from = { x: element.x, y: element.y };
    duration = this.getDuration(from, this._pointToExit);
    const index = this._sceneManager.getPiers().indexOf(pier);
    ship.setDirection(index > 1 ? Direction.Up : Direction.Down);
    await this.animation(ship, this._pointToExit, duration);

    // --- Start ship animation from gate to exit
    from = { x: element.x, y: element.y };
    to = { x: startShipPoint.x, y: element.y };
    duration = this.getDuration(from, to);
    ship.setDirection(Direction.Right);
    await this.animation(ship, to, duration);
    this._sceneManager.removeShip(ship);
  }

  public async animationToFullShipWaiting(ship: Ship): Promise<void> {
    const element: Container = ship.getContainer();

    // --- Way to the point of choosing directions
    let from: Position = { x: element.x, y: element.y };
    let to: Position = { x: this._pointToPort.x, y: this._pointToPort.y };
    let duration: number = this.getDuration(from, to);
    ship.setDirection(Direction.Left);
    await this.animation(ship, to, duration);

    // --- Change ship animation from main pass to waiting line for the full ships
    from = { x: element.x, y: element.y };
    to = { x: element.x, y: waitingPointFullShip.y };
    duration = this.getDuration(from, to);
    ship.setDirection(Direction.Up);
    await this.animation(ship, to, duration);

    // --- Way to the waiting place
    from = { x: element.x, y: element.y };
    duration = this.getDuration(from, waitingPointFullShip);
    ship.setDirection(Direction.Left);
    await this.animation(ship, waitingPointFullShip, duration);
  }

  public async animationToEmptyShipWaiting(ship: Ship): Promise<void> {
    const element: Container = ship.getContainer();

    // --- Way to the point of choosing directions
    let from: Position = { x: element.x, y: element.y };
    let to: Position = { x: this._pointToPort.x, y: this._pointToPort.y };
    let duration: number = this.getDuration(from, to);
    ship.setDirection(Direction.Left);
    await this.animation(ship, to, duration);

    // --- Change ship animation from main pass to waiting line for the empty ships
    from = { x: element.x, y: element.y };
    to = { x: element.x, y: waitingPointEmptyShip.y };
    duration = this.getDuration(from, to);
    ship.setDirection(Direction.Down);
    await this.animation(ship, to, duration);

    // --- start animayion to the waiting place
    from = { x: element.x, y: element.y };
    duration = this.getDuration(from, waitingPointEmptyShip);
    ship.setDirection(Direction.Left);
    await this.animation(ship, waitingPointEmptyShip, duration);
  }

  public async animationToPierFromWaitingPosition(
    ship: Ship,
    pier: Pier
  ): Promise<void> {
    const element: Container = ship.getContainer();

    // --- Start animation to the main way
    let from: Position = { x: element.x, y: element.y };
    let to: Position = { x: element.x, y: this._pointChoosePier.y };
    let duration: number = this.getDuration(from, to);
    ship.setDirection(ship.getIsLoaded() ? Direction.Down : Direction.Up);
    if (ship.getTweenAnimation()) ship.getTweenAnimation().stop();
    await this.animation(ship, to, duration);

    // --- Start animation to the gate
    from = { x: element.x, y: element.y };
    duration = this.getDuration(from, this._pointChoosePier);
    ship.setDirection(Direction.Left);
    await this.animation(ship, this._pointChoosePier, duration);

    // --- Choose direction and start animation to the point near the pier
    from = { x: element.x, y: element.y };
    to = { x: this._pointChoosePier.x, y: pier.getPointMooring().y };
    duration = this.getDuration(from, to);
    const index = this._sceneManager.getPiers().indexOf(pier);
    ship.setDirection(index > 1 ? Direction.Up : Direction.Down);
    await this.animation(ship, to, duration);

    // --- Start animation to the pier
    from = { x: element.x, y: element.y };
    duration = this.getDuration(from, pier.getPointMooring());
    ship.setDirection(Direction.Left);
    await this.animation(ship, pier.getPointMooring(), duration);
    this._cargoLine.addCargoShip(ship);
  }

  public async animationToPier(ship: Ship, pier: Pier): Promise<void> {
    const element: Container = ship.getContainer();

    // --- Start animation to the gate
    let from: Position = { x: element.x, y: element.y };
    let to: Position;
    let duration: number = this.getDuration(from, this._pointChoosePier);
    ship.setDirection(Direction.Left);
    await this.animation(ship, this._pointChoosePier, duration);

    // --- Choose direction and start animation to the point near the pier
    from = { x: element.x, y: element.y };
    to = { x: this._pointChoosePier.x, y: pier.getPointMooring().y };
    duration = this.getDuration(from, to);
    ship.setDirection(Direction.Up);
    await this.animation(ship, to, duration);

    // --- Start animation to the pier
    from = { x: element.x, y: element.y };
    duration = this.getDuration(from, pier.getPointMooring());
    ship.setDirection(Direction.Left);
    await this.animation(ship, pier.getPointMooring(), duration);
    this._cargoLine.addCargoShip(ship);
  }

  private animation(ship: Ship, to: Position, duration: number): Promise<void> {
    const element: Container = ship.getContainer();
    return new Promise((resolve) => {
      ship.seTweenAnimation(
        new TWEEN.Tween(element)
          .to({ rotation: ship.getDirection() }, 1)
          .onComplete(() => {
            ship.seTweenAnimation(
              new TWEEN.Tween(element)
                .to({ x: to.x, y: to.y }, duration)
                .onUpdate(() => {
                  if (this._collisionDetector.isCollision(ship)) {
                    ship.getTweenAnimation().stop();
                    this.waitForCollisionToEnd(ship, to, resolve);
                  }
                })
                .onComplete(() => {
                  resolve();
                })
                .start()
            );
          })
          .start()
      );
    });
  }

  private waitForCollisionToEnd(
    ship: Ship,
    to: Position,
    resolve: () => void
  ): void {
    const checkCollision = () => {
      if (!this._collisionDetector.isCollision(ship)) {
        const from: Position = {
          x: ship.getContainer().x,
          y: ship.getContainer().y,
        };
        const newDuration: number = this.getDuration(from, to);
        this.animation(ship, to, newDuration).then(resolve);
      } else {
        setTimeout(checkCollision, Constants.TIME_WAIT_CHECK_COLLISION);
      }
    };

    checkCollision();
  }

  private getDuration(from: Position, to: Position): number {
    const distance = Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2);
    return (distance / shipConfig.speed) * Constants.ONE_SECOND_INTERVAL;
  }
}
