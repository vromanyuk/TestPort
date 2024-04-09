import { DynamicObject } from '../abstract/DynamicObject';
import { Graphics } from 'pixi.js';
import { Position } from '../interface/Position';
import { DynamicObjectParameters } from '../interface/DynamicObjectParameters';
import { pierConfig } from '../utils/Configs';
import { RectDrawing } from '../components/RectDrawing';

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

  togglerPier(): void {
    this.setIsLoaded(!this.getIsLoaded());
    const alpha = this.getIsLoaded() ? 1 : 0;
    const pierValue: DynamicObjectParameters = {
      x: 0,
      y: 0,
      color: this.getColor(),
      alpha: alpha,
      graphics: this.getGraphics(),
      width: pierConfig.width,
      height: pierConfig.height,
      widthStroke: pierConfig.widthStroke
    }
    this.getGraphics().clear();
    this.setGraphics(RectDrawing.draw(pierValue));
  }
}