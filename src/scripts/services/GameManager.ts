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

  constructor(sceneManager: SceneManager, animationManager: AnimationManager,
    waitingLine: WaitingLine, cargoLine: CargoLine, routeLine: RouteLine
  ) {
    this._sceneManager = sceneManager;
    this._animationManager = animationManager;
    this._waitingLine = waitingLine;
    this._cargoLine = cargoLine;
    this._routeLine = routeLine;
  }

  initializeGame(): void {
    setInterval(() => this.spawnShip(), 8000);
  }

  update(): void {
    const cargoShips: Ship[] = this._cargoLine.getCargoShips();
    if(cargoShips.length > 0) {
      for(let i = 0; i < cargoShips.length; i++) {
        const ship = this._cargoLine.removeCargoShip();
        this.cargoProcess(ship);
      }
    }

    if(this._waitingLine.getFullShipsLine().length > 0) {
      let ship: Ship = this._waitingLine.getFullShipsLine()[0];
      const pier: Pier = this.getFreePierForFullShip(ship);
      if(pier) {
        ship = this._waitingLine.removeFullShip();
        ship.setPier(pier);
        pier.setStateBusy(true);
        this._animationManager.aniamtionToPierFromWaitingPosition(ship, pier)
      }
    }
    if(this._waitingLine.getEmptyShipsLine().length > 0) {
      let ship: Ship = this._waitingLine.getEmptyShipsLine()[0];
      const pier: Pier = this.getFreePierForEmptyShip(ship);
      if(pier) {
        ship = this._waitingLine.removeEmptyShip();
        ship.setPier(pier);
        pier.setStateBusy(true);
        this._animationManager.aniamtionToPierFromWaitingPosition(ship, pier);
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
      this._animationManager.aniamtionToPier(newShip, pier);
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

  private cargoProcess(ship: Ship): void {
    setTimeout(() => {
      const pier = ship.getPier();
      ship.togglerShip();
      ship.setPier(null);
      pier.togglerPier();
      pier.setStateBusy(false)
      this._animationManager.animationToExit(ship.getGraphics(), pier)
    }, 5000)
  }
}