import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import path from 'path'

const app = express()
const port = 3000

const server = http.createServer(app)
const io = new Server(server)

io.on('connection', (socket: Socket) => {
  console.log(`${socket.id} connected`)
  socket.on('disconnect', (reason) => {
    console.log(`${socket.id} disconnected: ${reason}`)
  })
})

app.use(express.static(path.join(__dirname, '../dist')))

server.listen(port, () => {
  console.info(`opened server on http://0.0.0.0:${port}`)
})
