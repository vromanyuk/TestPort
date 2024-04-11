import { Application, Container } from "pixi.js";
import { PierFactory } from "../scripts/components/factories/PierFactory";
import { BreakwaterFactory } from "../scripts/components/factories/BreakwaterFactory";
import {
  pierConfig,
  shipConfig,
  positionBreakwaterTop,
  positionBreakwaterBottom,
} from "../scripts/utils/Configs";
import { SceneManager } from "../scripts/services/SceneManager";
import { Position } from "../scripts/interface/Position";
import { CollisionDetector } from "../scripts/services/CollisionDetector";
import { AnimationManager } from "../scripts/services/AnimationManager";
import { GameManager } from "../scripts/services/GameManager";
import * as TWEEN from "@tweenjs/tween.js";
import { WaitingLine } from "../scripts/components/WaitingLine";
import { CargoLine } from "../scripts/components/CargoLine";
import { Ship } from "../scripts/entities/Ship";
import { ShipFactory } from "../scripts/components/factories/ShipFactory";
import { Direction } from "../scripts/entities/Direction";

export class MainScene {
  private static NUMBER_PIERS: number = 4;
  private _app: Application;
  private _sceneManager: SceneManager;
  private _collisionDetector: CollisionDetector;
  private _animationManager: AnimationManager;
  private _gameManager: GameManager;
  private _waitingLine: WaitingLine;
  private _cargoLine: CargoLine;
  private _space: number = 10;

  constructor(app: Application) {
    this._app = app;
    this.setup();
    requestAnimationFrame((time) => this.animate(time));
  }

  animate(time: number) {
    requestAnimationFrame((time) => this.animate(time));
    TWEEN.update(time);
  }

  update() {
    this._gameManager.update();
  }

  private setup(): void {
    this._sceneManager = new SceneManager(this._app);
    for (let i = 0; i < MainScene.NUMBER_PIERS; i++) {
      const pierPosition: Position = {
        x: 3,
        y: i * (pierConfig.height + this._space),
      };
      const pointMooring: Position = {
        x:
          pierPosition.x +
          pierConfig.width +
          pierConfig.widthStroke +
          shipConfig.width / 2,
        y:
          pierPosition.y -
          this._space +
          pierConfig.height / 2 +
          shipConfig.height / 2,
      };
      this._sceneManager.addPier(
        PierFactory.createPier(false, pointMooring),
        pierPosition
      );
    }
    this._sceneManager.addStaticElement(
      BreakwaterFactory.createBreakwater(),
      positionBreakwaterTop
    );
    this._sceneManager.addStaticElement(
      BreakwaterFactory.createBreakwater(),
      positionBreakwaterBottom
    );

    this._waitingLine = new WaitingLine();
    this._cargoLine = new CargoLine();
    this._collisionDetector = new CollisionDetector(
      this._sceneManager.getShips()
    );
    this._animationManager = new AnimationManager(
      this._collisionDetector,
      this._cargoLine,
      this._sceneManager
    );
    this._gameManager = new GameManager(
      this._sceneManager,
      this._animationManager,
      this._waitingLine,
      this._cargoLine
    );
    // const newShip: Ship = ShipFactory.createShip(shipConfig.speed);
    // this._sceneManager.addShip(newShip);
    // const ship = newShip.getContainer();
    // ship.x = 200;
    // ship.y = 340;

    // const newShip3: Ship = ShipFactory.createShip(shipConfig.speed);
    // this._sceneManager.addShip(newShip3);
    // const ship3: Container = newShip3.getContainer();
    // ship3.x = 200;
    // ship3.y = 420;

    // const newShip2: Ship = ShipFactory.createShip(shipConfig.speed);
    // this._sceneManager.addShip(newShip2);
    // const ship2: Container = newShip2.getContainer();
    // ship2.x = 90,
    // ship2.y = 96

    // const newShip4: Ship = ShipFactory.createShip(shipConfig.speed);
    // this._sceneManager.addShip(newShip4);
    // const ship4: Container = newShip4.getContainer();
    // ship4.x = 90,
    // ship4.y = 286

    // const newShip5: Ship = ShipFactory.createShip(shipConfig.speed);
    // this._sceneManager.addShip(newShip5);
    // const ship5: Container = newShip5.getContainer();
    // ship5.x = 440,
    // ship5.y = 272

    // const newShip6: Ship = ShipFactory.createShip(shipConfig.speed);
    // this._sceneManager.addShip(newShip6);
    // const ship6: Container = newShip6.getContainer();
    // ship6.rotation = Direction.Up
    // ship6.x = 350,
    // ship6.y = 272
    this._gameManager.initializeGame();
  }
}
