import { Ship } from "../entities/Ship";

export class RouteLine {
  private _ships: Ship[] = [];

  getShips(): Ship[] { return this._ships; }

  addShip(ship: Ship): void { this._ships.push(ship); }

  removeShip(): Ship { return this._ships.shift(); }
}