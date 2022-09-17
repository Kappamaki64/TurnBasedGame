import { Ticker } from 'pixi.js'
import { Position } from '../../../common/util/position'
import { Ratio } from '../../../common/util/ratio'
import { Size } from '../../../common/util/size'
import { Character } from '../character'
import { Ellipse } from '../ellipse'
import { GameObject } from '../gameObject'
import { Text } from '../text'
import { TextButton } from '../textButton'

export class ExampleScene extends GameObject {
  public constructor(ticker: Ticker, ellipseTextContent: string) {
    super('exampleScene', new Position(0, 0))

    const ellipse = new Ellipse(
      'ellipse',
      new Position(100, 200),
      new Size(50, 100)
    )
    this.addChild(ellipse)
    const ellipseText = new Text(
      'text of ellipse',
      new Position(100, 0),
      ellipseTextContent
    )
    ellipse.addChild(ellipseText)

    const character = new Character(
      'character',
      new Position(400, 400),
      new Ratio(0.5, 0.5)
    )
    this.addChild(character)

    const text = new Text('hello', new Position(100, 0), 'Hello-')
    const textButton = new TextButton(
      'backButton',
      new Position(100, 50),
      'Hey!!! Click Me!',
      0xcc00cc,
      () => {
        ellipse.position = ellipse.position.updateX((x) => x - 200)
      }
    )
    character.addChild(text)
    character.addChild(textButton)

    ticker.add((delta) => {
      ellipse.position = ellipse.position.updateX((x) => x + delta)
    })
  }
}
