import { DynamicObject } from '../abstract/DynamicObject';
import { Graphics } from 'pixi.js';
import { Position } from '../interface/Position';

export class Pier extends DynamicObject {
  private _busy: boolean;
  private _pointMooring: Position;

  constructor(
    isLoaded: boolean, 
    graphics: Graphics, 
    color: number, 
    movement: Position, 
    busy: boolean,
    pointMooring: Position
  ) {
    super(isLoaded, graphics, color, movement);
    this._busy = busy;
    this._pointMooring = pointMooring;
  }

  setStateBusy(value: boolean): void { this._busy = value; }
  getStateBusy(): boolean { return this._busy; }
  setPointMooring(value: Position): void { this._pointMooring = value; }
  getPointMooring(): Position { return this._pointMooring; }
}