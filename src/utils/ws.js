import { io } from 'socket.io-client'
import store from '../store'
import { ElMessage } from 'element-plus'

let socket
const socketInit = function (url = 'http://localhost:3000') {
  socket = io(url)
  socket.on('connect', () => {
    listenersInit()
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
    ElMessage({
      message: `游戏开始,你是${data.board.turn ? '先' : '后'}手方`,
      type: 'success',
    })
  })
  socket.on('chess_on', (data) => {
    store.commit('ADD_CHESS', data.chess)
  })
  socket.on('chess_victory', (data) => {
    store.commit('SET_BOARD_DATA', data.board)
    store.commit('SET_ROOM_DATA', data.room)
  })
}
export { socket, socketInit }
