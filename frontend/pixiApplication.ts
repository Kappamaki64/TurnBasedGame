import { Application } from 'pixi.js'
import { pixiApplicationOptions } from './parameter/pixiApplication'

export class PixiApplication {
  private readonly app: Application
  private readonly containerElement: HTMLElement

  public constructor(containerElement: HTMLElement) {
    this.app = new Application(pixiApplicationOptions)

    this.containerElement = containerElement
    this.resize()
    containerElement.appendChild(this.app.view)
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
