import { ITextStyle, Text as PixiText } from 'pixi.js'
import { Position } from '../../common/util/position'
import { Size } from '../../common/util/size'
import { textStyle } from '../parameter/pixiApplication'
import { GameObject } from './gameObject'

export class Text extends GameObject {
  public constructor(
    id: string,
    position: Position,
    textContent: string,
    style: Partial<ITextStyle> = textStyle
  ) {
    super(id, position)
    const text = new PixiText(textContent, style)
    this.container.addChild(text)
  }

  public get size(): Size {
    return new Size(this.container.width, this.container.height)
  }
}
