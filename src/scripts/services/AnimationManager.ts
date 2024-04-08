import { Graphics } from "pixi.js";
import * as TWEEN from "@tweenjs/tween.js"
import { Position } from "../interface/Position";
import { CollisionDetector } from "./CollisionDetector";
import { Pier } from "../entities/Pier";
import { shipConfig, waitingPointFullShip, waitingPointEmptyShip } from "../utils/Configs"

export class AnimationManager {
  private _collisionDetector: CollisionDetector;
  private _second: Position = { x: 220, y: 340 };

  constructor(collisionDetector: CollisionDetector) {
    this._collisionDetector = collisionDetector;
  }

  animationToFullShipWaiting(element: Graphics): void {
    this.aniamtion(
      element, 
      { x: element.x, y: waitingPointFullShip.y },
      this.getDuration(
        { x: element.x, y: element.y },
        { x: element.x, y: waitingPointFullShip.y }
      ),
      () => {
        this.aniamtion(
          element,
          waitingPointFullShip,
          this.getDuration(
            { x: element.x, y: element.y },
            waitingPointFullShip
          )
        );
      }
    );
  }

  animationToEmptyShipWaiting(element: Graphics): void {
    this.aniamtion(
      element, 
      { x: element.x, y: waitingPointEmptyShip.y },
      this.getDuration(
        { x: element.x, y: element.y },
        { x: element.x, y: waitingPointEmptyShip.y }
      ),
      () => {
        this.aniamtion(
          element,
          waitingPointEmptyShip,
          this.getDuration(
            { x: element.x, y: element.y },
            waitingPointEmptyShip
          )
        );
      }
    );
  }

  aniamtionToPierFromWaitingPosition(element: Graphics, pier: Pier): void {
    this.aniamtion(
      element,
      { x: element.x, y: this._second.y },
      this.getDuration(
        { x: element.x, y: element.y },
        { x: element.x, y: this._second.y }
      ),
      () => {
        this.aniamtion(
          element,
          this._second,
          this.getDuration({ x: element.x, y: element.y }, this._second),
          () => {
            this.aniamtion(
              element, 
              { x: this._second.x, y: pier.getPointMooring().y },
              this.getDuration(
                { x: element.x, y: element.y }, 
                { x: this._second.x, y: pier.getPointMooring().y }
              ),
              () => {
                this.aniamtion(
                  element, 
                  pier.getPointMooring(),
                  this.getDuration(
                    { x: element.x, y: element.y }, 
                    pier.getPointMooring()
                  )
                );
              }
            );
          }
        );
      }
    );
  }

  aniamtionToPier(element: Graphics, pier: Pier): void {
    this.aniamtion(
      element, 
      this._second, 
      this.getDuration( { x: element.x, y: element.y }, this._second ),
      () => {
        this.aniamtion(
          element, 
          { x: this._second.x, y: pier.getPointMooring().y },
          this.getDuration(
            { x: element.x, y: element.y }, 
            { x: this._second.x, y: pier.getPointMooring().y }
          ),
          () => {
            this.aniamtion(
              element, 
              pier.getPointMooring(),
              this.getDuration(
                { x: element.x, y: element.y }, 
                pier.getPointMooring()
              )
            );
          }
        );
      }
    );
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