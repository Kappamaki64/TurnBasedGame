import { Container } from 'pixi.js'
import { Position } from '../../common/util/position'

export class GameObject {
  public readonly id: string

  protected readonly container: Container

  /** Map<id, GameObject> */
  private readonly _children: Map<string, GameObject> = new Map()
  private _parent: GameObject | undefined

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

  public get parent(): GameObject | undefined {
    return this._parent
  }

  public addChild(gameObject: GameObject) {
    this.container.addChild(gameObject.container)
    gameObject._parent = this
    this._children.set(gameObject.id, gameObject)
  }

  /**
   * 指定されたGameObjectを子から外します
   * ただし、子の子孫は子が持ったままです
   */
  public removeChild(id: string): boolean
  public removeChild(gameObject: GameObject): boolean
  public removeChild(arg: string | GameObject) {
    const id = typeof arg === 'string' ? arg : arg.id
    const gameObject = this._children.get(id)
    if (!gameObject) return false
    this.container.removeChild(gameObject.container)
    this._children.delete(id)
    gameObject._parent = undefined
    return true
  }

  public removeAllChildren() {
    for (const [, gameObject] of this._children) {
      gameObject.removeAllChildren()
      gameObject._parent = undefined
    }
    this.container.removeChildren()
    this._children.clear()
  }

  /** 子孫を含め自分を親から削除します */
  public destroy() {
    this.removeAllChildren()
    if (!this.parent) return
    this.parent.removeChild(this.id)
  }
}
