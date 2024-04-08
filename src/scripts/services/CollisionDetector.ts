import { Graphics } from "pixi.js";

export class CollisionDetector {
  private _elements: Graphics[] = [];
  constructor(elements: Graphics[]) {
    this._elements = elements;
  }

  addElement(element: Graphics): void {
    this._elements.push(element);
  }

  removeElement(element: Graphics): void {
    const index = this._elements.indexOf(element);
    this._elements.splice(index, 1);
  }

  isCollision(element: Graphics): boolean {
    const index = this._elements.indexOf(element);
    return this._elements.some((obj, i) =>
       i !== index && this.checkCollision(element, obj));
  }

  private checkCollision(object: Graphics, environment: Graphics): boolean {
    return (object.x - 20 < (environment.x + environment.width) &&
      (object.x + object.width) > environment.x &&
      object.y < (environment.y + environment.height) &&
      (object.y + object.height) > environment.y
    );
  }
}