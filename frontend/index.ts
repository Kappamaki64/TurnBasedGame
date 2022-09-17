import './assets/style/style.css'
import { ExampleScene } from './gameObject/example/exampleScene'
import { PixiApplication } from './pixiApplication'
import { SocketClient } from './socketIo'

const containerElement = document.getElementById('container')
if (!containerElement) throw new Error('cannot find the container element')

const app = new PixiApplication(containerElement)
window.addEventListener('resize', () => app.resize())

SocketClient.connect()

let count = 1
let scene = new ExampleScene(app.ticker, `シーン${count}だよ！`)
app.rootGameObject.addChild(scene)

// シーンの切り替えの例 10秒おきに切り替わる
setInterval(() => {
  scene.destroy()
  count++
  scene = new ExampleScene(app.ticker, `シーン${count}になったよ！`)
  app.rootGameObject.addChild(scene)
}, 10000)
