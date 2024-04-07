import { Ship } from "../entities/Ship";

export class RouteLine {
  private _fullShipsLine: Ship[] = [];
  private _emptyShipsLine: Ship[] = [];

  getFullShipsLine(): Ship[] { return this._fullShipsLine; }
  getEmptyShipsLine(): Ship[] { return this._emptyShipsLine; }

  addFullShip(ship: Ship): void { this._fullShipsLine.push(ship); }
  addEmptyShip(ship: Ship): void { this._emptyShipsLine.push(ship); }

  removeFullShip(): Ship { return this._fullShipsLine.shift(); }
  removeEmptyShip(): Ship { return this._emptyShipsLine.shift(); }
}