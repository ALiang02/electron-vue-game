import { io } from 'socket.io-client'
import store from '../store'
import { message } from 'ant-design-vue'

let socket
const socketInit = function (url = 'http://localhost:3000') {
  socket = io(url)
  socket.on('connect', () => {
    store.commit('SET_SOCKET', socket.id)
    listenersInit()
    if (store.state.room.id > 0) {
      socket.emit('join_room', { room: store.state.room.id })
    }
  })
}
const listenersInit = function () {
  socket.on('quit', (id) => {
    console.log(`${id}连接断开`)
  })
  socket.on('room_join', (data) => {
    store.commit('SET_ROOM_DATA', data)
  })
  socket.on('room_quit', (data) => {
    store.commit('SET_ROOM_DATA', data)
  })
  socket.on('room_ready', (data) => {
    store.commit('SET_ROOM_DATA', data)
  })
  socket.on('room_ready_cancel', (data) => {
    store.commit('SET_ROOM_DATA', data)
  })
  socket.on('room_start', (data) => {
    store.commit('SET_ROOM_DATA', data.room)
    store.commit('SET_BOARD_DATA', data.board)
    message.success(`游戏开始,你是${data.board.turn ? '先' : '后'}手方`)
  })
  socket.on('chess_on', (data) => {
    store.commit('ADD_CHESS', data.chess)
    store.commit('SET_BOARD_DATA', { turn: data.turn })
  })
  socket.on('chess_victory', (data) => {
    store.commit('SET_BOARD_DATA', data.board)
    store.commit('SET_ROOM_DATA', data.room)
  })
}
export { socket, socketInit }
