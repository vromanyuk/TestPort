import { DynamicObject } from '../abstract/DynamicObject';
import { Graphics } from 'pixi.js';
import { Position } from '../interface/Position';

export class Pier extends DynamicObject {
  private _busy: boolean;

  constructor(
    isLoaded: boolean, 
    graphics: Graphics, 
    color: number, 
    movement: Position, 
    busy: boolean
  ) {
    super(isLoaded, graphics, color, movement);
    this._busy = busy;
  }

  setStateBusy(value: boolean): void { this._busy = value; }
  getStateBusy(): boolean { return this._busy; }
}