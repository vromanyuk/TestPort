import { Application, Graphics } from 'pixi.js';
import { ShipFactory } from '../scripts/components/factories/ShipFactory';
import { PierFactory } from '../scripts/components/factories/PierFactory';
import { Pier } from '../scripts/entities/Pier';
import { BreakwaterFactory } from '../scripts/components/factories/BreakwaterFactory';
import { Ship } from '../scripts/entities/Ship';
import { shipConfig, pierConfig, breakwaterConfig } from '../scripts/utils/Configs';
import { SceneManager } from '../scripts/services/SceneManager';
import { Position } from '../scripts/interface/Position';

export class MainScene {
  private static NUMBER_PIERS: number = 4; 
  private _app: Application;
  private _sceneManager: SceneManager;
  private _space: number = 10;

  constructor(app: Application) {
    this._app = app;
    this.setup();
  }

  update() {
    // this.ship.x -= 1;
  }

  private setup(): void {
    const startShipPosition: Position = {
      x: this._app.canvas.width - shipConfig.width,
      y: this._app.canvas.height / 2 - shipConfig.width / 2
    };
    this._sceneManager = new SceneManager(this._app, startShipPosition);
    for(let i = 0; i < MainScene.NUMBER_PIERS; i++) {
      const pierPosition: Position = {
        x: 3,
        y: i * (pierConfig.height + this._space)
      };
      this._sceneManager.addPier(PierFactory.createPier(0, 0, false), pierPosition);
    };
    this._sceneManager.addStaticElement(BreakwaterFactory.createBreakwater(), { x: 300, y: 0});
    const positionBreakwaterBottom: Position = {
      x: 300,
      y: this._app.canvas.height - breakwaterConfig.height
    };
    this._sceneManager.addStaticElement(BreakwaterFactory.createBreakwater(), positionBreakwaterBottom);

    const ship: Ship = ShipFactory.createShip(0, 0, 1);
    const shipContainer: Graphics = ship.getGraphics();
    this._app.stage.addChild(shipContainer);
    shipContainer.x = this._app.canvas.width - shipContainer.width;
    shipContainer.y = this._app.canvas.height / 2 - shipContainer.width / 2;
  }
}