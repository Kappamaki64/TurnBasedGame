import { io, Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

export class SocketClient {
  private static socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined

  public static connect() {
    this.disconnect()
    const socket = io()
    socket.on('connect', () => {
      this.socket = socket
      console.log(`socket ${this.socket.id} connected`)
    })
  }

  public static disconnect() {
    if (!this.socket) return
    this.socket.offAny()
    this.socket.disconnect()
    console.log(`socket ${this.socket.id} disconnected`)
    this.socket = undefined
  }
}
