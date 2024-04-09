import { Ship } from "../entities/Ship";

export class CargoLine {
  private _ships: Ship[] = [];
  private _inProcess: Ship[] = [];

  getCargoShips(): Ship[] {
    return this._ships;
  }
  getInProcessShips(): Ship[] {
    return this._inProcess;
  }

  addCargoShip(ship: Ship): void {
    this._ships.push(ship);
  }
  addInProcessShip(ship: Ship): void {
    this._inProcess.push(ship);
  }

  removeCargoShip(): Ship {
    return this._ships.shift();
  }
  removeInProcessShip(): Ship {
    return this._inProcess.shift();
  }
}
