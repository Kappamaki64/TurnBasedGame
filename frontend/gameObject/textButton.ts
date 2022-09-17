import { Graphics, ITextStyle } from 'pixi.js'
import { Position } from '../../common/util/position'
import {
  buttonMargin,
  buttonRoundRadius,
  textStyle
} from '../parameter/pixiApplication'
import { GameObject } from './gameObject'
import { Text } from './text'

export class TextButton extends GameObject {
  public constructor(
    id: string,
    position: Position,
    textContent: string,
    backGroundColor: number,
    onClick: (textButton: TextButton) => void,
    style: Partial<ITextStyle> = textStyle
  ) {
    super(id, position)
    const buttonText = new Text(
      `text of ${id}`,
      new Position(0, 0),
      textContent,
      style
    )

    const { width, height } = buttonText.size
    const buttonRect = new Graphics()
      .beginFill(backGroundColor)
      .drawRoundedRect(
        -buttonMargin,
        -buttonMargin,
        width + buttonMargin * 2,
        height + buttonMargin * 2,
        buttonRoundRadius
      )
    buttonRect.interactive = true
    buttonRect.on('pointerup', () => onClick(this))
    this.container.addChild(buttonRect)

    // 後からaddしないとボタンの背景の上に文字が表示されない
    this.addChild(buttonText)
  }
}
