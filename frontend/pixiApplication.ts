import { Application, Ticker } from 'pixi.js'
import { Position } from '../common/util/position'
import { GameObject } from './gameObject/gameObject'
import { pixiApplicationOptions } from './parameter/pixiApplication'

export class PixiApplication {
  public readonly rootGameObject: GameObject
  public readonly ticker: Ticker

  private readonly app: Application
  private readonly containerElement: HTMLElement

  public constructor(containerElement: HTMLElement) {
    this.app = new Application(pixiApplicationOptions)

    this.containerElement = containerElement
    this.resize()
    containerElement.appendChild(this.app.view)

    this.rootGameObject = new GameObject(
      'root',
      new Position(0, 0),
      this.app.stage
    )
    this.ticker = this.app.ticker
  }

  public resize(): void {
    const containerRect = this.containerElement.getBoundingClientRect()
    const scale = Math.min(
      containerRect.width / pixiApplicationOptions.width,
      containerRect.height / pixiApplicationOptions.height
    )
    this.app.stage.scale.x = scale
    this.app.stage.scale.y = scale
    this.app.renderer.resize(
      pixiApplicationOptions.width * scale,
      pixiApplicationOptions.height * scale
    )
  }
}
