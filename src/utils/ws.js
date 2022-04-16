import { io } from 'socket.io-client'
import store from '../store'

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
  })
  socket.on('room_ready_cancel', (data) => {
    store.commit('SET_ROOM_STATUS', data.status)
  })
  socket.on('room_start', (data) => {
    store.commit('SET_ROOM_STATUS', data.status)
  })
})
export { socket }
