import { Container } from "pixi.js";
import { Position } from "../interface/Position";
import { Direction } from "../entities/Direction";

export class CollisionDetector {
  private static SPACE: number = 10;
  private _elements: Container[] = [];

  constructor(elements: Container[]) {
    this._elements = elements;
  }

  isCollision(element: Container, direction: Direction): boolean {
    const index = this._elements.indexOf(element);
    return this._elements.some(
      (obj, i) => i !== index && this.checkCollision(element, direction, obj)
    );
  }

  private checkCollision(
    object: Container,
    direction: Direction,
    environment: Container
  ): boolean {
    const predictionPoint: Position = this.getPrediction(object, direction);
    switch (direction) {
      case Direction.Up:
      case Direction.Down:
        return (
          predictionPoint.x < environment.x + environment.width &&
          predictionPoint.x + object.width > environment.x &&
          predictionPoint.y < environment.y + environment.height &&
          predictionPoint.y + object.height + CollisionDetector.SPACE >
            environment.y &&
          this.isPointInsideRectangle(predictionPoint, environment)
        );
      case Direction.Left:
      case Direction.Right:
        return (
          predictionPoint.x < environment.x + environment.width &&
          predictionPoint.x + object.width + CollisionDetector.SPACE >
            environment.x &&
          predictionPoint.y < environment.y + environment.height &&
          predictionPoint.y + object.height > environment.y &&
          this.isPointInsideRectangle(predictionPoint, environment)
        );
      // return (
      //   predictionPoint.x < environment.x + environment.width &&
      //   predictionPoint.x + object.width > environment.x &&
      //   predictionPoint.y < environment.y + environment.height &&
      //   predictionPoint.y + object.height > environment.y
      // ) && this.isPointInsideRectangle(predictionPoint, environment);
    }
  }

  private getPrediction(element: Container, direction: Direction): Position {
    switch (direction) {
      case Direction.Up:
        return { x: element.x, y: element.y + CollisionDetector.SPACE };
      case Direction.Down:
        return { x: element.x, y: element.y - CollisionDetector.SPACE };
      case Direction.Left:
        return { x: element.x - CollisionDetector.SPACE, y: element.y };
      case Direction.Right:
        return { x: element.x + CollisionDetector.SPACE, y: element.y };
      default:
        return { x: element.x, y: element.y };
    }
  }

  private isPointInsideRectangle(
    point: Position,
    environment: Container
  ): boolean {
    return (
      point.x >= environment.x &&
      point.x <= environment.x + environment.width &&
      point.y >= environment.y &&
      point.y <= environment.y + environment.height
    );
  }
}
