import { Graphics } from 'pixi.js';
import { Pier } from '../../entities/Pier';
import { DynamicObjectParameters } from '../../interface/DynamicObjectParameters';
import { RectDrawing } from '../RectDrawing';
import { pierConfig } from '../../utils/Configs';

export class PierFactory {
  static createPier(): Pier {
    const pierValue: DynamicObjectParameters = {
      isLoaded: pierConfig.back !== 0,
      color: pierConfig.color,
      alpha: pierConfig.back,
      graphics: new Graphics(),
      width: pierConfig.width,
      height: pierConfig.height,
      widthStroke: pierConfig.widthStroke
    };
    pierValue.graphics = RectDrawing.dynamicObjectDraw(pierValue);
    return new Pier(pierValue.isLoaded, pierValue.graphics, pierValue.color);
  }
}