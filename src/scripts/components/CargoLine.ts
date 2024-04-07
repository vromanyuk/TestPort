import { Ship } from "../entities/Ship";

export class CargoLine {
  private _ships: Ship[] = [];

  getCargoShips(): Ship[] { return this._ships; }

  addCargoShip(ship: Ship): void { this._ships.push(ship); }

  removeCargoShip(): Ship { return this._ships.shift(); }
}