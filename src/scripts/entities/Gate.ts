export class Gate {
  private _point: number;
  private _width: number;
  private _height: number;
  private _gateOccupied: boolean;

  constructor(
    point: number,
    width: number,
    height: number,
    gateOccupied: boolean
  ) {
    this._point = point;
    this._width = width;
    this._height = height;
    this._gateOccupied = gateOccupied;
  }

  public getPoint(): number {
    return this._point;
  }
  public getWidth(): number {
    return this._width;
  }
  public getHeight(): number {
    return this._height;
  }
  public setGateValue(value: boolean): void {
    this._gateOccupied = value;
  }
  public getGateValue(): boolean {
    return this._gateOccupied;
  }
}
