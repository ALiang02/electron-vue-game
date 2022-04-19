import { io } from 'socket.io-client'
import store from '../store'
import { ElMessage } from 'element-plus'

const socket = io('http://localhost:3000')
socket.on('connect', () => {
  socket.on('success', (data) => {
    console.log(data)
    socket.emit('mytask', { data: { a: 2 } })
  })

  socket.on('quit', (id) => {
    console.log(`${id}连接断开`)
  })
  socket.on('room_join', (data) => {
    store.commit('SET_ROOM_GAMER', data.user)
    store.commit('SET_ROOM_STATUS', 1)
  })
  socket.on('room_quit', (data) => {
    if (data.isHost) {
      store.commit('SET_ROOM_HOST', store.state.room.gamer)
      store.commit('SET_ROOM_GAMER', '')
    } else {
      store.commit('SET_ROOM_GAMER', '')
    }
  })
  socket.on('room_ready', (data) => {
    store.commit('SET_ROOM_STATUS', data.status)
    ElMessage({
      message: `玩家已准备`,
      type: 'success',
    })
  })
  socket.on('room_ready_cancel', (data) => {
    store.commit('SET_ROOM_STATUS', data.status)
    ElMessage({
      message: `玩家取消准备`,
      type: 'success',
    })
  })
  socket.on('room_start', (data) => {
    store.commit('SET_ROOM_STATUS', data.status)
    store.commit('SET_QIPAN_TURN', data.turn)
    ElMessage({
      message: `游戏开始,你是${data.turn ? '先' : '后'}手方`,
      type: 'success',
    })
  })
})
export { socket }
