import './assets/style/style.css'
import { PixiApplication } from './pixiApplication'
import { SocketClient } from './socketIo'

const containerElement = document.getElementById('container')
if (!containerElement) throw new Error('cannot find the container element')

const app = new PixiApplication(containerElement)
window.addEventListener('resize', () => app.resize())

SocketClient.connect()
