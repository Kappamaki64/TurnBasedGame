import { Ratio } from './ratio'
import { Size } from './size'

export class Position {
  public readonly x: number
  public readonly y: number

  public constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  /**
   * このベクトルのxとyの絶対値をとってwidthとheightとして返します
   */
  public get size(): Size {
    return new Size(Math.abs(this.x), Math.abs(this.y))
  }

  /**
   * このベクトルに一番近い45度刻みの角度を表す符号ベクトルを返します
   */
  public get nearest45DegreeDirection(): Ratio {
    if (this.equals(new Position(0, 0))) return new Ratio(0, 0)
    // atan2 is in [-Math.PI, Math.PI]
    const atan2 = Math.atan2(this.y, this.x)
    // idx = 0 は 線分(-1, 0) に対応，idx = 1 は線分(-1, -1)に対応，...
    // idx が増加するに連れ，反時計回りに対応する線分が変わる
    const idx = Math.floor(
      ((Math.floor((atan2 + Math.PI) / (Math.PI / 8)) + 1) % 16) / 2
    )

    const xList = [-1, -1, 0, 1, 1, 1, 0, -1]
    const yList = [0, -1, -1, -1, 0, 1, 1, 1]

    const x = xList[idx]
    const y = yList[idx]
    if (x === undefined || y === undefined)
      throw new Error(`unexpected idx: ${idx}`)

    return new Ratio(x, y)
  }

  public sign(): Ratio {
    return new Ratio(Math.sign(this.x), Math.sign(this.y))
  }

  public abs(): Position {
    return new Position(Math.abs(this.x), Math.abs(this.y))
  }

  public equals(other: Position): boolean {
    return this.x === other.x && this.y === other.y
  }

  public add(other: Position): Position
  public add(size: Size): Position
  public add(positionOrSize: Position | Size): Position {
    if (positionOrSize instanceof Position) {
      const other = positionOrSize
      return new Position(this.x + other.x, this.y + other.y)
    }
    const size = positionOrSize
    return new Position(this.x + size.width, this.y + size.height)
  }

  public subtract(other: Position): Position {
    return new Position(this.x - other.x, this.y - other.y)
  }

  public scale(ratio: Ratio): Position {
    return new Position(this.x * ratio.x, this.y * ratio.y)
  }

  public updateX(updater: (x: number) => number): Position {
    return new Position(updater(this.x), this.y)
  }

  public updateY(updater: (y: number) => number): Position {
    return new Position(this.x, updater(this.y))
  }

  public static createMax(...positions: Position[]): Position {
    const firstArgument = positions[0]
    if (!firstArgument) throw new Error('argument required')
    const max = { ...firstArgument }
    for (const { x, y } of positions) {
      if (max.x < x) max.x = x
      if (max.y < y) max.y = y
    }
    return new Position(max.x, max.y)
  }

  public static createMin(...positions: Position[]): Position {
    const firstArgument = positions[0]
    if (!firstArgument) throw new Error('argument required')
    const min = { ...firstArgument }
    for (const { x, y } of positions) {
      if (min.x > x) min.x = x
      if (min.y > y) min.y = y
    }
    return new Position(min.x, min.y)
  }
}
