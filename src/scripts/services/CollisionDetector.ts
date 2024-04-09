import { Container } from "pixi.js";

export class CollisionDetector {
  private _elements: Container[] = [];
  constructor(elements: Container[]) {
    this._elements = elements;
  }

  addElement(element: Container): void {
    this._elements.push(element);
  }

  removeElement(element: Container): void {
    const index = this._elements.indexOf(element);
    this._elements.splice(index, 1);
  }

  isCollision(element: Container): boolean {
    const index = this._elements.indexOf(element);
    return this._elements.some(
      (obj, i) => i !== index && this.checkCollision(element, obj)
    );
  }

  private checkCollision(object: Container, environment: Container): boolean {
    return (
      object.x < environment.x + environment.width &&
      object.x + object.width > environment.x &&
      object.y < environment.y + environment.height &&
      object.y + object.height > environment.y
    );
  }
}
