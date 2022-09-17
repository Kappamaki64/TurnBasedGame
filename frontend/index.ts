import { Position } from '../common/util/position'
import { Size } from '../common/util/size'
import './assets/style/style.css'
import { Character } from './gameObject/character'
import { Ellipse } from './gameObject/ellipse'
import { PixiApplication } from './pixiApplication'
import { SocketClient } from './socketIo'

const containerElement = document.getElementById('container')
if (!containerElement) throw new Error('cannot find the container element')

const app = new PixiApplication(containerElement)
window.addEventListener('resize', () => app.resize())

SocketClient.connect()

const ellipse = new Ellipse(
  'ellipse',
  new Position(100, 200),
  new Size(50, 100)
)
const character = new Character('character', new Position(400, 400))
app.rootGameObject.addChild(ellipse)
app.rootGameObject.addChild(character)
app.ticker.add((delta) => {
  ellipse.position = ellipse.position.updateX((x) => x + delta)
})
