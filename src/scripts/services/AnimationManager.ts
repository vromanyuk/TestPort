import { Graphics } from "pixi.js";
import * as TWEEN from "@tweenjs/tween.js"
import { Position } from "../interface/Position";
import { CollisionDetector } from "./CollisionDetector";
import { Pier } from "../entities/Pier";
import { shipConfig, startShipPoint, waitingPointFullShip, waitingPointEmptyShip } from "../utils/Configs"
import { Ship } from "../entities/Ship";
import { CargoLine } from "../components/CargoLine";

export class AnimationManager {
  private _collisionDetector: CollisionDetector;
  private _cargoLine: CargoLine;
  private _pointChoosePier: Position = { x: 220, y: 340 };
  private _pointToExit: Position = { x: 180, y: 380 };

  constructor(collisionDetector: CollisionDetector, cargoLine: CargoLine) {
    this._collisionDetector = collisionDetector;
    this._cargoLine = cargoLine;
  }

  animationToExit(element: Graphics, pier: Pier): void {
    let from: Position = { x: element.x, y: element.y };
    let to: Position = { x: this._pointToExit.x, y: element.y };
    let duration: number = this.getDuration(from,to);

    this.aniamtion(element, to, duration, () => {
      from = { x: element.x, y: element.y };
      duration = this.getDuration(from, this._pointToExit);

      this.aniamtion(element, this._pointToExit, duration, () => {
        from = { x: element.x, y: element.y };
        to = { x: startShipPoint.x, y: element.y };
        duration = this.getDuration(from, to);

        this.aniamtion(element, to, duration, () => {
          from = { x: element.x, y: element.y };
          duration = this.getDuration(from, startShipPoint);

          this.aniamtion(element, startShipPoint, duration);
        });
      });
    });
  }

  animationToFullShipWaiting(element: Graphics): void {
    let from: Position = { x: element.x, y: element.y };
    let to: Position = { x: element.x, y: waitingPointFullShip.y };
    let duration: number = this.getDuration(from, to);

    this.aniamtion(element, to, duration, () => {
      from = { x: element.x, y: element.y };
      duration = this.getDuration(from, waitingPointFullShip);

      this.aniamtion(element, waitingPointFullShip, duration);
    });
  }

  animationToEmptyShipWaiting(element: Graphics): void {
    let from: Position = { x: element.x, y: element.y };
    let to: Position = { x: element.x, y: waitingPointEmptyShip.y };
    let duration: number = this.getDuration(from,to);

    this.aniamtion(element, to, duration, () => {
      from = { x: element.x, y: element.y };
      duration = this.getDuration(from, waitingPointEmptyShip);

      this.aniamtion(element, waitingPointEmptyShip, duration);
    });
  }

  aniamtionToPierFromWaitingPosition(ship: Ship, pier: Pier): void {
    const element: Graphics = ship.getGraphics();
    let from: Position = { x: element.x, y: element.y };
    let to: Position = { x: element.x, y: this._pointChoosePier.y };
    let duration: number = this.getDuration(from, to);

    this.aniamtion(element, to,duration, () => {
      from = { x: element.x, y: element.y };
      duration = this.getDuration(from, this._pointChoosePier);

      this.aniamtion(element, this._pointChoosePier, duration, () => {
        from = { x: element.x, y: element.y };
        to = { x: this._pointChoosePier.x, y: pier.getPointMooring().y };
        duration = this.getDuration(from, to);

        this.aniamtion(element, to, duration, () => {
          from = { x: element.x, y: element.y };
          duration = this.getDuration(from, pier.getPointMooring());

          this.aniamtion(element, pier.getPointMooring(), duration);
        });
      });
    });
  }

  aniamtionToPier(ship: Ship, pier: Pier): void {
    const element: Graphics = ship.getGraphics();
    let from: Position = { x: element.x, y: element.y };
    let to: Position;
    let duration: number = this.getDuration(from, this._pointChoosePier);

    this.aniamtion(element, this._pointChoosePier, duration, () => {
      from = { x: element.x, y: element.y };
      to = { x: this._pointChoosePier.x, y: pier.getPointMooring().y };
      duration = this.getDuration(from, to);

      this.aniamtion(element, to, duration, () => {
        from = { x: element.x, y: element.y };
        duration = this.getDuration(from, pier.getPointMooring());

        this.aniamtion(element, pier.getPointMooring(), duration, () => {
          this._cargoLine.addCargoShip(ship);
        });
      });
    });
  }

  private aniamtion(
    element: Graphics, 
    position: Position, 
    duration: number, 
    onComplete = () => {}
  ): void {
    const tween = new TWEEN.Tween(element)
      .to({ x: position.x, y: position.y }, duration)
      .onUpdate(() => {
        if(this._collisionDetector.isCollision(element)) {
          tween.stop();
        }
      })
      .onComplete(onComplete)
      .start();
  }

  private getDuration(from: Position, to: Position): number {
    const distance = Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2);
    return distance / shipConfig.speed * 1000;
  }
}