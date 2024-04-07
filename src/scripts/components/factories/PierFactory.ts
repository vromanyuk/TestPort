import { Graphics } from 'pixi.js';
import { Pier } from '../../entities/Pier';
import { DynamicObjectParameters } from '../../interface/DynamicObjectParameters';
import { RectDrawing } from '../RectDrawing';
import { pierConfig } from '../../utils/Configs';
import { Position } from '../../interface/Position';

export class PierFactory {
  static createPier(x: number, y: number): Pier {
    const movement: Position = { x: x, y: y };
    const isLoaded = pierConfig.back !== 0;
    const pierValue: DynamicObjectParameters = {
      color: pierConfig.color,
      alpha: pierConfig.back,
      graphics: new Graphics(),
      width: pierConfig.width,
      height: pierConfig.height,
      widthStroke: pierConfig.widthStroke
    };
    pierValue.graphics = RectDrawing.draw(pierValue);
    return new Pier(
      isLoaded, 
      pierValue.graphics, 
      pierValue.color, 
      movement
    );
  }
}