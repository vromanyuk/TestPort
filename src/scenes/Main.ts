import { Application } from 'pixi.js';
import { Ship } from '../scripts/entities/Ship'

export class MainScene {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
    this.setup();
  }

  private setup(): void {
    this.app.stage.addChild(new Ship(10, "Black Pearl", true).graphics)
  }
}