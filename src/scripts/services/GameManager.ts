import { CargoLine } from "../components/CargoLine";
import { RouteLine } from "../components/RouteLine";
import { WaitingLine } from "../components/WaitingLine";
import { ShipFactory } from "../components/factories/ShipFactory";
import { shipConfig } from "../utils/Configs"
import { Pier } from "../entities/Pier";
import { Ship } from "../entities/Ship";
import { SceneManager } from "./SceneManager";
import { AnimationManager } from "./AnimationManager";

export class GameManager {
  private _sceneManager: SceneManager;
  private _waitingLine: WaitingLine;
  private _routeLine: RouteLine;
  private _cargoLine: CargoLine;
  private _animationManager: AnimationManager;

  constructor(sceneManager: SceneManager, animationManager: AnimationManager) {
    this._sceneManager = sceneManager;
    this._animationManager = animationManager;
    this._waitingLine = new WaitingLine();
    this._routeLine = new RouteLine();
    this._cargoLine = new CargoLine();
  }

  initializeGame(): void {
    setInterval(() => this.spawnShip(), 8000);
  }

  update(): void {
    if(this._waitingLine.getFullShipsLine().length > 0) {
      let ship: Ship = this._waitingLine.getFullShipsLine()[0];
      const pier: Pier = this.getFreePierForFullShip(ship);
      if(pier) {
        ship = this._waitingLine.removeFullShip();
        ship.setPier(pier);
        pier.setStateBusy(true);
        this._animationManager.aniamtionToPierFromWaitingPosition(ship.getGraphics(), pier)
      }
    }
    if(this._waitingLine.getEmptyShipsLine().length > 0) {
      let ship: Ship = this._waitingLine.getEmptyShipsLine()[0];
      const pier: Pier = this.getFreePierForEmptyShip(ship);
      if(pier) {
        ship = this._waitingLine.removeEmptyShip();
        ship.setPier(pier);
        pier.setStateBusy(true);
        this._animationManager.aniamtionToPierFromWaitingPosition(ship.getGraphics(), pier);
      }
    }
  }

  private spawnShip(): void {
    const newShip: Ship = ShipFactory.createShip(0, 0, shipConfig.speed);
    this._sceneManager.addShip(newShip);
    if(newShip.getIsLoaded() && this._waitingLine.getFullShipsLine().length > 0) {
      this.startAnimationToFullShipWaiting(newShip);
      return;
    }
    if(!newShip.getIsLoaded() && this._waitingLine.getEmptyShipsLine().length > 0) {
      this.startAnimationToEmptyShipWaiting(newShip);
      return;
    }

    const pier: Pier = newShip.getIsLoaded() ?
      this.getFreePierForFullShip(newShip) :
      this.getFreePierForEmptyShip(newShip);
    if(pier) {
      pier.setStateBusy(true);
      newShip.setPier(pier);
      this._animationManager.aniamtionToPier(newShip.getGraphics(), pier);
      return;
    }

    newShip.getIsLoaded() ?
      this.startAnimationToFullShipWaiting(newShip) :
      this.startAnimationToEmptyShipWaiting(newShip);
  }
  private getFreePierForFullShip(ship: Ship): Pier {
    return this._sceneManager.getPiers()
      .find(e => !e.getIsLoaded() && !e.getStateBusy());
  }

  private getFreePierForEmptyShip(ship: Ship): Pier {
    return this._sceneManager.getPiers()
      .find(e => e.getIsLoaded() && !e.getStateBusy());
  }

  private startAnimationToFullShipWaiting(ship: Ship): void {
    this._waitingLine.addFullShip(ship);
    this._animationManager.animationToFullShipWaiting(ship.getGraphics());
  }

  private startAnimationToEmptyShipWaiting(ship: Ship): void {
    this._waitingLine.addEmptyShip(ship);
    this._animationManager.animationToEmptyShipWaiting(ship.getGraphics());
  }
}