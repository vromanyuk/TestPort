import { Application, Graphics } from "pixi.js";
import { Ship } from "../entities/Ship";
import { Pier } from "../entities/Pier";
import { Position } from "../interface/Position";
import { StaticObject } from "../abstract/StaticObject";
import { startShipPoint } from "../utils/Configs";

export class SceneManager {
  private _app: Application;
  private _elements: Graphics[] = [];
  private _ships: Ship[] = [];
  private _piers: Pier[] = [];

  constructor(app: Application) {
    this._app = app;
  }

  getShips(): Ship[] {
    return this._ships;
  }
  getPiers(): Pier[] {
    return this._piers;
  }
  getElements(): Graphics[] {
    return this._elements;
  }

  addShip(ship: Ship): void {
    const shipOnScene = ship.getGraphics();
    this._ships.push(ship);
    this._elements.push(shipOnScene);
    this._app.stage.addChild(shipOnScene);
    shipOnScene.x = startShipPoint.x;
    shipOnScene.y = startShipPoint.y;
  }

  removeShip(ship: Ship): void {
    const indexGraphics = this._elements.indexOf(ship.getGraphics());
    const index = this._ships.indexOf(ship);
    if (index > -1) {
      this._elements.splice(indexGraphics, 1);
      this._ships.splice(index, 1);
      this._app.stage.removeChild(ship.getGraphics());
    } else {
      console.error("This ship is absent on scene");
    }
  }

  addPier(pier: Pier, position: Position): void {
    const pierOnScene = pier.getGraphics();
    this._piers.push(pier);
    this._app.stage.addChild(pierOnScene);
    pierOnScene.x = position.x;
    pierOnScene.y = position.y;
  }

  addStaticElement<T extends StaticObject>(
    element: T,
    position: Position
  ): void {
    const elementOnScene = element.getGraphics();
    this._app.stage.addChild(elementOnScene);
    elementOnScene.x = position.x;
    elementOnScene.y = position.y;
  }
}
