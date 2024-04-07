import { Application } from "pixi.js";
import { Ship } from "../entities/Ship";
import { Pier } from "../entities/Pier";
import { Position } from "../interface/Position";
import { StaticObject } from "../abstract/StaticObject";

export class SceneManager {
  private _app: Application;
  private _ships: Ship[] = [];
  private _piers: Pier[] = [];
  private _startShipPosition: Position;

  constructor(app: Application, startShipPosition: Position) {
    this._app = app;
    this._startShipPosition = startShipPosition;
  }

  addShip(ship: Ship): void {
    const shipOnScene = ship.getGraphics();
    this._ships.push(ship);
    this._app.stage.addChild(shipOnScene);
    shipOnScene.x = this._startShipPosition.x;
    shipOnScene.y = this._startShipPosition.y;
  }

  removeShip(ship: Ship): void {
    const index = this._ships.indexOf(ship);
    if (index > -1) {
      this._ships.splice(index, 1);
      this._app.stage.removeChild(ship.getGraphics());
    } else {
      console.log('This ship is absent on scene');
    }
  }

  addPier(pier: Pier, position: Position): void {
    const pierOnScene = pier.getGraphics();
    this._piers.push(pier);
    this._app.stage.addChild(pierOnScene);
    pierOnScene.x = position.x;
    pierOnScene.y = position.y;
  }

  addElement<T extends StaticObject>(element: T, position: Position): void {
    const elementOnScene = element.getGraphics();
    this._app.stage.addChild(elementOnScene);
    elementOnScene.x = position.x;
    elementOnScene.y = position.y;

  }
}