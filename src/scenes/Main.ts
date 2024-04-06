import { Application, Graphics } from 'pixi.js';
import { ShipFactory } from '../scripts/components/factories/ShipFactory';
import { PierFactory } from '../scripts/components/factories/PierFactory';
import { Pier } from '../scripts/entities/Pier';
import { BreakwaterFactory } from '../scripts/components/factories/BreakwaterFactory';

export class MainScene {
  private _app: Application;
  private _piers: Pier[] = [];
  private _space: number = 10;

  constructor(app: Application) {
    this._app = app;
    this.setup();
  }

  private setup(): void {
    for(let i = 0; i < 4; i++) {
      this._piers.push(PierFactory.createPier());
      const pierOnStage: Graphics = this._piers[i].getGraphics();
      this._app.stage.addChild(pierOnStage);
      pierOnStage.x = 3;
      pierOnStage.y = i * (pierOnStage.height + this._space);
    };
    const breakwaterOnStageTop = BreakwaterFactory.createBreakwater().getGraphics();
    this._app.stage.addChild(breakwaterOnStageTop);
    breakwaterOnStageTop.x = 300;
    const breakwaterOnStageBottom = BreakwaterFactory.createBreakwater().getGraphics();
    this._app.stage.addChild(breakwaterOnStageBottom);
    breakwaterOnStageBottom.x = 300;
    breakwaterOnStageBottom.y = this._app.canvas.height - breakwaterOnStageBottom.height;
    const ship: Graphics = ShipFactory.createShip().getGraphics();
    this._app.stage.addChild(ship);
    ship.x = this._app.canvas.width - ship.width;
    ship.y = this._app.canvas.height / 2 - ship.width / 2;
  }

  update() {
    // this.ship.x -= 1;
  }
}