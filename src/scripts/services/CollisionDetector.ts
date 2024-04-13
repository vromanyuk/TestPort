import { Container } from "pixi.js";
import { Position } from "../interface/Position";
import { Direction } from "../entities/Direction";
import { shipConfig, gateConfig } from "../utils/Configs";
import { Ship } from "../entities/Ship";
import { Gate } from "../entities/Gate";
import { Constants } from "../utils/Constants";

export class CollisionDetector {
  private _gate: Gate;
  private _ships: Ship[];

  constructor(ships: Ship[]) {
    this._ships = ships;
    this._gate = new Gate(
      gateConfig.x,
      gateConfig.width,
      gateConfig.height,
      false
    );
  }

  isCollision(ship: Ship): boolean {
    const index = this._ships.indexOf(ship);
    const frontPoint: Position = this.getFrontPoint(ship);
    if (
      this.isGate(frontPoint, ship.getContainer()) &&
      this._gate.getGateValue()
    ) {
      return !ship.getPriority();
    }

    if (
      this.isGate(frontPoint, ship.getContainer()) &&
      !this._gate.getGateValue()
    ) {
      this._gate.setGateValue(true);
      ship.setPriority(true);
      return false;
    }
    if (!this.isGate(frontPoint, ship.getContainer()) && ship.getPriority()) {
      ship.setPriority(false);
      this._gate.setGateValue(false);
    }

    return this._ships.some(
      (obj, i) => i !== index && this.checkCollision(ship, obj)
    );
  }

  private checkCollision(ship: Ship, environment: Ship): boolean {
    const ownShip: Container = ship.getContainer();
    const otherShip: Container = environment.getContainer();
    const direction: Direction = ship.getDirection();
    const otherDirection: Direction = environment.getDirection();
    const dx: number = ownShip.x - otherShip.x;
    const dy: number = ownShip.y - otherShip.y;
    const distance: number = Math.sqrt(dx * dx + dy * dy);
    if (
      ownShip.x === Constants.POINT_TO_EXIT_X &&
      otherShip.x === Constants.POINT_TO_EXIT_X
    ) {
      if (
        Math.abs(ownShip.y - Constants.POINT_TO_EXIT_Y) >
        Math.abs(otherShip.y - Constants.POINT_TO_EXIT_Y)
      ) {
        return true;
      }
    }
    if (distance <= 2 * Constants.COLLISION_SPACE_RADIUS) {
      return this.instructions(direction, otherDirection, ownShip, otherShip);
    }
    return false;
  }

  private instructions(
    direction: Direction,
    otherDirection: Direction,
    ownShip: Container,
    otherShip: Container
  ): boolean {
    if (
      (direction === Direction.Up && otherDirection === Direction.Down) ||
      (otherDirection === Direction.Up && direction === Direction.Down)
    ) {
      if (ownShip.x !== otherShip.x) return false;
    }
    if (
      (direction === Direction.Left && otherDirection === Direction.Right) ||
      (direction === Direction.Right && otherDirection === Direction.Left)
    ) {
      if (ownShip.y !== otherShip.y) return false;
      if (
        ownShip.y === otherShip.y &&
        Math.abs(ownShip.x - otherShip.x) <
          Constants.DISTANCE_BETWEEN_PARALLEL_HORIZONTAL_WAYS
      )
        return true;
    }
    if (
      (direction === Direction.Up || direction === Direction.Down) &&
      (otherDirection === Direction.Right || otherDirection === Direction.Left)
    ) {
      if (ownShip.y === otherShip.y) return false;
      if (
        Math.abs(ownShip.x - otherShip.x) >
        Constants.DISTANCE_CROSSING_WAYS_UP_DOWN_CHECK_SHIP
      )
        return false;
    }
    if (
      (direction === Direction.Right || direction === Direction.Left) &&
      (otherDirection === Direction.Up || otherDirection === Direction.Down)
    ) {
      if (
        Math.abs(ownShip.y - otherShip.y) >
        Constants.DISTANCE_CROSSING_WAYS_LEFT_RIGHT_CHECK_SHIP
      )
        return false;
    }
    if (direction === otherDirection && direction === Direction.Up) {
      if (otherShip.y > ownShip.y) return false;
    }
    if (direction === otherDirection && direction === Direction.Down) {
      if (otherShip.y < ownShip.y) return false;
    }
    if (direction === otherDirection && direction === Direction.Left) {
      if (otherShip.x > ownShip.x) return false;
    }
    if (direction === otherDirection && direction === Direction.Right) {
      if (otherShip.x < ownShip.x) return false;
    }
    return true;
  }

  private isGate(pointShip: Position, ship: Container): boolean {
    return (
      pointShip.x < gateConfig.x + gateConfig.width &&
      pointShip.x + ship.width > gateConfig.x &&
      pointShip.y < gateConfig.y + gateConfig.height &&
      pointShip.y + ship.height > gateConfig.y
    );
  }

  private getFrontPoint(ownShip: Ship): Position {
    const container: Container = ownShip.getContainer();

    switch (ownShip.getDirection()) {
      case Direction.Up:
        return {
          x: container.x - shipConfig.width / 2,
          y: container.y - shipConfig.height / 2,
        };
      case Direction.Down:
        return {
          x: container.x - shipConfig.width / 2,
          y: container.y + shipConfig.height / 2,
        };
      case Direction.Right:
        return {
          x: container.x + shipConfig.width / 2,
          y: container.y - shipConfig.height / 2,
        };
      case Direction.Left:
        return {
          x: container.x - shipConfig.width / 2,
          y: container.y - shipConfig.height / 2,
        };
    }
  }
}
