import { Sprite } from 'pixi.js'
import { Position } from '../../common/util/position'
import { getImageTexture } from '../assets/image/images'
import { GameObject } from './gameObject'

export class Character extends GameObject {
  public constructor(id: string, position: Position) {
    super(id, position)
    const texture = getImageTexture('character')
    const sprite = new Sprite(texture)
    sprite.anchor.x = 0.5
    sprite.anchor.y = 0.5
    sprite.x = 0
    sprite.y = 0
    this.container.addChild(sprite)
  }
}
