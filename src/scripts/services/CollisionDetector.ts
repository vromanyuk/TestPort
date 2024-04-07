import { Graphics } from "pixi.js";

export class CollisionDetector {
  static checkCollision(object: Graphics, environment: Graphics) {
    return (object.x < (environment.x + environment.width) &&
      (object.x + object.width) > environment.x &&
      object.y < (environment.y + environment.height) &&
      (object.y + object.height) > environment.y
    );
  }
}