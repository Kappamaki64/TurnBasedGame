import { Position } from './position'
import { Ratio } from './ratio'

export class Size {
  public readonly width: number
  public readonly height: number

  public constructor(width: number, height: number) {
    this.width = width
    this.height = height
  }

  public scale(ratio: Ratio): Size {
    return new Size(this.width * ratio.x, this.height * ratio.y)
  }

  public updateWidth(updater: (width: number) => number): Size {
    return new Size(updater(this.width), this.height)
  }

  public updateHeight(updater: (height: number) => number): Size {
    return new Size(this.width, updater(this.height))
  }

  public toPosition(): Position {
    return new Position(this.width, this.height)
  }
}
