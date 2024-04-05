import { Application } from 'pixi.js';
import { Ship } from '../scripts/entities/Ship';
import { Pier } from '../scripts/entities/Pier';

export class MainScene {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
    this.setup();
  }

  private setup(): void {
    const shipOnStage = new Ship(10, "Black Pearl", false).graphics;
    const pierOnStage = new Pier('Pier-0', '#FFD800', true).graphics;
    this.app.stage.addChild(shipOnStage);
    this.app.stage.addChild(pierOnStage);
    shipOnStage.x = this.app.canvas.width - shipOnStage.width;
    shipOnStage.y = this.app.canvas.height / 2 - shipOnStage.width / 2;
  }
}