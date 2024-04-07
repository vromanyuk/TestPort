import { CargoLine } from "../components/CargoLine";
import { RouteLine } from "../components/RouteLine";
import { WaitingLine } from "../components/WaitingLine";
import { ShipFactory } from "../components/factories/ShipFactory";
import { Pier } from "../entities/Pier";
import { Ship } from "../entities/Ship";
import { SceneManager } from "./SceneManager";

export class GameManager {
  private _sceneManager: SceneManager;
  private _waitingLine: WaitingLine;
  private _routeLine: RouteLine;
  private _cargoLine: CargoLine;

  constructor(sceneManager: SceneManager) {
    this._sceneManager = sceneManager;
    this._waitingLine = new WaitingLine();
    this._routeLine = new RouteLine();
    this._cargoLine = new CargoLine();
  }

  initializeGame(): void {
    setInterval(() => this.spawnShip(), 8000);
  }

  update(): void {

  }

  private spawnShip(): void {
    const newShip: Ship = ShipFactory.createShip(0, 0, 1);
    this._sceneManager.addShip(newShip);
    const queue: Ship[] = newShip.getIsLoaded() ?
      this._waitingLine.getFullShipsLine() :
      this._waitingLine.getEmptyShipsLine();
    queue.length > 0 ? queue.push(newShip) : this.getFreePier(newShip);
  }

  

  private getFreePier(ship: Ship): void {
    const piers: Pier[] = this._sceneManager.getPiers();
    const pier: Pier = piers.find(e => e.getIsLoaded() !== ship.getIsLoaded());
    if (pier) {
      pier.setStateBusy(true);
      ship.setPier(pier);
    } else {
      ship.getIsLoaded() ? 
        this._waitingLine.addFullShip(ship) :
        this._waitingLine.addEmptyShip(ship);
    }
  } 
}