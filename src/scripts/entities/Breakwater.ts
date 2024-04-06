import { Graphics } from "pixi.js";
import { StaticObject } from "../abstract/StaticObject";

export class Breakwater extends StaticObject {
  constructor(graphics: Graphics, color: number) {
    super(graphics, color);
  }
}