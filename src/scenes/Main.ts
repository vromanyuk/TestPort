import { Application } from "pixi.js";
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
import { Constants } from "../scripts/utils/Constants";

export class MainScene {
  private static NUMBER_PIERS: number = 4;
  private _app: Application;
  private _sceneManager: SceneManager;
  private _collisionDetector: CollisionDetector;
  private _animationManager: AnimationManager;
  private _gameManager: GameManager;
  private _waitingLine: WaitingLine;
  private _cargoLine: CargoLine;
  private _space: number = Constants.PIER_BETWEEN_SPACE;

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
    this._gameManager.initializeGame();
  }
}
