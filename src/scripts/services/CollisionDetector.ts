import { Container, ContextDestroyOptions } from "pixi.js";
import { Position } from "../interface/Position";
import { Direction } from "../entities/Direction";
import { shipConfig, gateConfig } from "../utils/Configs";
import { Ship } from "../entities/Ship";
import { Gate } from "../entities/Gate";

export class CollisionDetector {
  private static SPACE: number = 10;
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
    if(this.isGate(frontPoint, ship.getContainer()) && this._gate.getGateValue()) {
      return !ship.getPriority();
    }

    if(this.isGate(frontPoint, ship.getContainer()) && !this._gate.getGateValue()) {
      this._gate.setGateValue(true);
      ship.setPriority(true);
      return false;
    }
    if(!this.isGate(frontPoint, ship.getContainer()) && ship.getPriority()) {
      ship.setPriority(false);
      this._gate.setGateValue(false);
    }

    return this._ships.some(
      (obj, i) => i !== index && this.checkCollision(ship, obj, frontPoint)
    );
  }

  private checkCollision(ship: Ship, environment: Ship, frontPoint: Position): boolean {
    const ownShip: Container = ship.getContainer();
    const otherShip: Container = environment.getContainer();
    const direction : Direction = ship.getDirection();
    const otherDirection: Direction = environment.getDirection();
    const frontPointOther: Position = this.getFrontPoint(environment);

    // if(this.isIntersecting(frontPoint, ownShip, frontPointOther, otherShip)){
    //   // return this.checkDirections(direction, environment.getDirection());
    //   this.doStepBack(ownShip, direction);
    //   return true;
    // }

    // const newPosition: Position = this.chooseFromDirection(direction, frontPoint)
    // return !this.isIntersecting(newPosition, ownShip, frontPointOther, otherShip)

    const dx: number = ownShip.x - otherShip.x;
    const dy: number = ownShip.y - otherShip.y;
    const distance: number = Math.sqrt(dx * dx + dy * dy);

    if(distance <= 46 + 46) {
      if (
        (direction === Direction.Up && otherDirection === Direction.Down) ||
        (otherDirection === Direction.Up && direction === Direction.Down)
      ){
        if(ownShip.x !== otherShip.x) return false;
        if(ownShip.x === otherShip.x && Math.abs(ownShip.y - otherShip.y) < 90) {
          this.doStepBack(ownShip, direction);
          return true;
        }
      }
      if (
        (direction === Direction.Left && otherDirection === Direction.Right) ||
        (otherDirection === Direction.Right && direction === Direction.Left)
      ){
        if(ownShip.y !== otherShip.y) return false;
        if(ownShip.y === otherShip.y && Math.abs(ownShip.x - otherShip.x) < 90) {
          this.doStepBack(ownShip, direction);
          return true;
        }
      }
      if(
        (direction === Direction.Up || direction === Direction.Down) && 
        (otherDirection === Direction.Right || otherDirection === Direction.Left)
      ){
        if(ownShip.y === otherShip.y) return false;
        if(Math.abs(ownShip.x - otherShip.x) > 80) return false;
      }
      if(
        (direction === Direction.Right || direction === Direction.Left) && 
        (otherDirection === Direction.Up || otherDirection === Direction.Down)
      ){
        if(Math.abs(ownShip.y - otherShip.y) > 60) return false;
      }
      if(
        (direction === Direction.Right || direction === Direction.Left) && 
        (otherDirection === Direction.Up || otherDirection === Direction.Down)
      ){
        if(Math.abs(ownShip.y - otherShip.y) > 60) return false;
      }
      if(
        (direction === otherDirection && direction === Direction.Up)
      ){
        if(otherShip.y > ownShip.y) return false;
      }
      if(
        (direction === otherDirection && direction === Direction.Down)
      ){
        if(otherShip.y < ownShip.y) return false;
      }
      if(
        (direction === otherDirection && direction === Direction.Left)
      ){
        if(otherShip.x > ownShip.x) return false;
      }
      if(
        (direction === otherDirection && direction === Direction.Right)
      ){
        if(otherShip.x < ownShip.x) return false;
      }
      this.doStepBack(ownShip, direction);
      return true;
    }
    return false;

    // if(this.isIntersectingDirecation(frontPoint, frontPointOther, direction, environment.getDirection())) {
    //   this.doStepBack(ownShip, direction);
    //   return true;
    // }

    // return false;
  }

  private doStepBack(ship: Container, direction: Direction): void {
    switch(direction) {
      case Direction.Up:
        ship.y += 0;
      case Direction.Down:
        ship.y -= 0;
      case Direction.Left:
        ship.x += 0;
      case Direction.Right:
        ship.x -= 0;
    }
  } 

  private chooseFromDirection(direction: Direction, point: Position): Position {
    switch(direction) {
      case Direction.Up:
        return { x: point.x, y: point.y + shipConfig.speed };
      case Direction.Down:
        return { x: point.x, y: point.y - shipConfig.speed };
      case Direction.Left:
        return { x: point.x + shipConfig.speed, y: point.y };
      case Direction.Right:
        return { x: point.x - shipConfig.speed, y: point.y };
  }
}

  private isGate(pointShip: Position, ship: Container): boolean {
    return (
      pointShip.x < gateConfig.x + gateConfig.width &&
      pointShip.x + ship.width > gateConfig.x &&
      pointShip.y < gateConfig.y + gateConfig.height &&
      pointShip.y + ship.height > gateConfig.y
    )
  }
  private isIntersectingDirecation(point: Position, pointOther: Position, ownDirection: Direction, other: Direction): boolean {
    let ownWidth: number;
    let ownHeight: number;
    let otherWidth: number;
    let otherHeight: number;
    if((ownDirection === Direction.Up || ownDirection === Direction.Down)) {
      ownWidth = shipConfig.height;
      ownHeight = shipConfig.width;
    }
    if((ownDirection === Direction.Left || ownDirection === Direction.Right)) {
      otherWidth = shipConfig.width;
      otherHeight = shipConfig.height;
    }
    if((other === Direction.Up || other === Direction.Down)) {
      ownWidth = shipConfig.height;
      ownHeight = shipConfig.width;
    }
    if((other === Direction.Left || other === Direction.Right)) {
      otherHeight = shipConfig.width;
      otherHeight = shipConfig.height;
    }

    return(
      point.x < pointOther.x + otherWidth + CollisionDetector.SPACE &&
      point.x + ownWidth > pointOther.x &&
      point.y < pointOther.y + otherHeight + CollisionDetector.SPACE &&
      point.y + ownHeight > pointOther.y
    )
  }

  private isIntersecting(poit: Position, ship: Container, pointOther: Position, shipOther: Container): boolean {
    return (
      poit.x < pointOther.x + shipOther.width + CollisionDetector.SPACE &&
      poit.x + ship.width > pointOther.x &&
      poit.y < pointOther.y + shipOther.height + CollisionDetector.SPACE &&
      poit.y + ship.height > pointOther.y
    )
  }

  private isObstacleForDirection(point: Position, ownShip: Ship, pointOther: Position, otherShip: Ship, direction: Direction): boolean {
    const ownContainer: Container = ownShip.getContainer();
    const otherContainer: Container = otherShip.getContainer();
    if(!this.isIntersecting(point, ownContainer, pointOther, otherContainer)) return false;
    if(ownShip.getPriority() > otherShip.getPriority()) return false;

    switch(direction) {
      case Direction.Up:
        return point.y > pointOther.y;
      case Direction.Down:
        return point.y < pointOther.y;
      case Direction.Left:
        return point.x > pointOther.x;
      case Direction.Right:
        return point.x < pointOther.x;
      default:
        return false;
    }
  }

  // private isIntersecting(point: Position, ownContainer: Container, pointOther: Position, otherContainer: Container): boolean {
  //   const intersectingHorizontally = point.x < pointOther.x + otherContainer.width && point.x + ownContainer.width > pointOther.x;
  //   const intersectingVertically = point.y < pointOther.y + otherContainer.height && point.y + ownContainer.height > pointOther.y;

  //   return intersectingHorizontally && intersectingVertically;
  // }

  private getFrontPoint(ownShip: Ship): Position {
    const container: Container = ownShip.getContainer();

    switch(ownShip.getDirection()) {
      case Direction.Up:
        return {x: container.x - shipConfig.width/2, y: container.y - shipConfig.height/2};
      case Direction.Down:
        return {x: container.x - shipConfig.width/2, y: container.y + shipConfig.height/2};
      case Direction.Right:
        return {x: container.x + shipConfig.width/2, y: container.y - shipConfig.height/2};
      case Direction.Left:
        return {x: container.x - shipConfig.width/2, y: container.y - shipConfig.height/2};
    }
  }
}
