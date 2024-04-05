import { Application, Graphics } from 'pixi.js';
import { Ship } from '../scripts/entities/Ship';
import { Pier } from '../scripts/entities/Pier';

export class MainScene {
  private app: Application;
  private ship: Graphics = new Ship(10, "Black Pearl", false).graphics;

  constructor(app: Application) {
    this.app = app;
    this.setup();
  }

  private setup(): void {
    const pierOnStage = new Pier('Pier-0', '#FFD800', true).graphics;
    this.app.stage.addChild(this.ship);
    this.app.stage.addChild(pierOnStage);
    this.ship.x = this.app.canvas.width - this.ship.width;
    this.ship.y = this.app.canvas.height / 2 - this.ship.width / 2;
  }

  update() {
    // this.ship.x -= 1;
  }
}