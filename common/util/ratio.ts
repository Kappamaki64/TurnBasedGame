export class Ratio {
  public readonly x: number
  public readonly y: number

  /** xとyの比率が同じものを生成 */
  public constructor(v: number)
  public constructor(x: number, y: number)
  public constructor(x: number, y?: number) {
    if (y === undefined) {
      this.x = this.y = x
      return
    }
    this.x = x
    this.y = y
  }

  public multiply(other: Ratio): Ratio {
    return new Ratio(this.x * other.x, this.y * other.y)
  }
}
