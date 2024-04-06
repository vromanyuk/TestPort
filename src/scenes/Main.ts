import { Application, Graphics } from 'pixi.js';
import { ShipFactory } from '../scripts/components/ShipFactory';
import { PierFactory } from '../scripts/components/PierFactory';

export class MainScene {
  private app: Application;
  private ship: Graphics = ShipFactory.createShip().getGraphics();

  constructor(app: Application) {
    this.app = app;
    this.setup();
  }

  private setup(): void {
    const pierOnStage: Graphics = PierFactory.createPier().getGraphics();
    this.app.stage.addChild(this.ship);
    this.app.stage.addChild(pierOnStage);
    this.ship.x = this.app.canvas.width - this.ship.width;
    this.ship.y = this.app.canvas.height / 2 - this.ship.width / 2;
  }

  update() {
    // this.ship.x -= 1;
  }
}