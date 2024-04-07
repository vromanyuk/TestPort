import { Application, Graphics } from 'pixi.js';
import { ShipFactory } from '../scripts/components/factories/ShipFactory';
import { PierFactory } from '../scripts/components/factories/PierFactory';
import { Pier } from '../scripts/entities/Pier';
import { BreakwaterFactory } from '../scripts/components/factories/BreakwaterFactory';
import { Ship } from '../scripts/entities/Ship';

export class MainScene {
  private _app: Application;
  private _piers: Pier[] = [];
  private _space: number = 10;

  constructor(app: Application) {
    this._app = app;
    this.setup();
  }

  update() {
    // this.ship.x -= 1;
  }

  private setup(): void {
    for(let i = 0; i < 4; i++) {
      this._piers.push(PierFactory.createPier(0, 0));
      const pierOnStage: Graphics = this._piers[i].getGraphics();
      this.addStaticObjectOnScene(
        pierOnStage, 3, (i * (pierOnStage.height + this._space))
      );
    };
    const breakwaterOnStageTop = BreakwaterFactory.createBreakwater().getGraphics();
    this.addStaticObjectOnScene(breakwaterOnStageTop, 300);
    const breakwaterOnStageBottom = BreakwaterFactory.createBreakwater().getGraphics();
    this.addStaticObjectOnScene(
      breakwaterOnStageBottom, 300, (this._app.canvas.height - breakwaterOnStageBottom.height)
    );
    const ship: Ship = ShipFactory.createShip(0, 0, 1);
    const shipContainer: Graphics = ship.getGraphics();
    this._app.stage.addChild(shipContainer);
    shipContainer.x = this._app.canvas.width - shipContainer.width;
    shipContainer.y = this._app.canvas.height / 2 - shipContainer.width / 2;
  }

  private addStaticObjectOnScene(
    element: Graphics, 
    positionX: number = 0, 
    positionY: number = 0
  ) {
    this._app.stage.addChild(element);
    element.x = positionX;
    element.y = positionY;
  }
}