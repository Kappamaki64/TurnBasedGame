import { Container } from 'pixi.js'
import { Position } from '../../common/util/position'

export class GameObject {
  public readonly id: string

  protected readonly container: Container

  /** Map<id, GameObject> */
  private readonly _children: Map<string, GameObject> = new Map()

  public constructor(
    id: string,
    position: Position,
    container = new Container()
  ) {
    this.id = id
    this.container = container
    this.position = position
  }

  public get position(): Position {
    return new Position(this.container.x, this.container.y)
  }

  public set position(position: Position) {
    this.container.x = position.x
    this.container.y = position.y
  }

  public get children(): Readonly<Map<string, GameObject>> {
    return this._children
  }

  public addChild(gameObject: GameObject) {
    this.container.addChild(gameObject.container)
    this._children.set(gameObject.id, gameObject)
  }

  public removeChild(id: string): boolean
  public removeChild(gameObject: GameObject): boolean
  public removeChild(arg: string | GameObject) {
    const id = typeof arg === 'string' ? arg : arg.id
    const gameObject = this._children.get(id)
    if (!gameObject) return false
    this.container.removeChild(gameObject.container)
    this._children.delete(id)
    return true
  }
}
