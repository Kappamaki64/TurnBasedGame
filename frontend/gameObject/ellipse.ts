import { Graphics } from 'pixi.js'
import { Position } from '../../common/util/position'
import { Size } from '../../common/util/size'
import { GameObject } from './gameObject'

export class Ellipse extends GameObject {
  public constructor(id: string, position: Position, size: Size) {
    super(id, position)
    const { width, height } = size
    const ellipse = new Graphics()
      .beginFill(0xff0000)
      .drawEllipse(0, 0, width, height)
    ellipse.pivot.x = width / 2
    ellipse.pivot.y = height / 2
    this.container.addChild(ellipse)
  }
}
