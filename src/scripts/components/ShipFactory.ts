import { Ship } from "../entities/Ship";

export class ShipFactory {
  private static shipCount = 0;

  static createShip(): Ship {
    const isLoaded = Math.random() > 0.5;
    this.shipCount++;
    return new Ship(10, 'Black Pearl', isLoaded);
  }
}