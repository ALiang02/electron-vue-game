import { RPC } from '../utils/request'
import { ElMessage, ElMessageBox } from 'element-plus'
import { socket } from '../utils/ws'
import router from '@/router'
import store from '@/store'

export function roomJoin(room) {
  RPC('room_join', { room: { id: room.id } })
    .then(({ qipan_id }) => {
      router.push('/wuziqi')
      store.commit('SET_IS_IN_ROOM', true)
      store.commit('SET_QIPAN_ID', qipan_id)
      store.commit('SET_ROOM', {
        id: room.id,
        name: room.name,
        host: room.host,
        gamer: store.state.user.name,
        status: 1,
      })
      socket.emit('room_join', {
        room: room.id,
        user: store.state.user.name,
      })
    })
    .catch((e) =>
      ElMessage({ message: '进入房间失败：' + e.message, type: 'error' })
    )
}
export function roomCreate() {
  ElMessageBox.prompt('请输入房间名', '选项', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
  })
    .then(({ value }) => {
      RPC('room_create', { room: { name: value } })
        .then((data) => {
          router.push('/wuziqi')
          store.commit('SET_IS_IN_ROOM', true)
          store.commit('SET_ROOM', data.room)
          store.commit('SET_QIPAN_ID', data.qipan_id)
          socket.emit('room_create', {
            room: data.room.id,
          })
        })
        .catch((e) =>
          ElMessage({ message: '创建房间失败：' + e, type: 'error' })
        )
    })
    .catch(() => {})
}

export function roomList(rooms) {
  RPC('room_list')
    .then((data) => {
      rooms.value = data.rooms
    })
    .catch((e) =>
      ElMessage({ message: '获取房间列表失败：' + e, type: 'error' })
    )
}

export function roomQuit() {
  RPC('room_quit')
    .then(() => {
      socket.emit('room_quit', {
        room: store.state.room.id,
        isHost: store.getters.isHost,
      })
      router.push('/room')
      store.commit('SET_IS_IN_ROOM', false)
      store.commit('SET_QIPAN_TURN', false)
      store.commit('SET_ROOM', {
        id: '?',
        name: '?',
        status: -1,
        host: '?',
        gamer: '?',
      })
    })
    .catch((e) => ElMessage({ message: '退出房间失败：' + e, type: 'error' }))
}

export function roomStatusChange(qizis) {
  switch (store.getters.beginText) {
    case '准备':
      RPC('room_ready')
        .then(() => {
          store.commit('SET_ROOM_STATUS', 2)
          socket.emit('room_ready', {
            room: store.state.room.id,
            status: 2,
          })
        })
        .catch((e) => ElMessage({ message: '失败：' + e, type: 'error' }))

      break
    case '取消准备':
      RPC('room_ready_cancel')
        .then(() => {
          store.commit('SET_ROOM_STATUS', 1)
          socket.emit('room_ready_cancel', {
            room: store.state.room.id,
            status: 1,
          })
        })
        .catch((e) => ElMessage({ message: '失败：' + e, type: 'error' }))
      break
    case '开始游戏':
      if (store.getters.isReady) {
        RPC('room_start')
          .then(({ status }) => {
            const turn = !status
            store.commit('SET_QIPAN_TURN', turn)
            store.commit
            store.commit('SET_ROOM_STATUS', 3)
            qizis.length = 0
            socket.emit('room_start', {
              room: store.state.room.id,
              status: 3,
              turn: false,
            })
            ElMessage({
              message: `游戏开始,你是${turn ? '先' : '后'}手方`,
              type: 'success',
            })
          })
          .catch((e) => ElMessage({ message: '失败：' + e, type: 'error' }))
      } else {
        ElMessage({ message: '玩家未准备', type: 'error' })
      }
      break
    case '投降':
      ElMessage({ message: '还没做', type: 'warn' })
      break
  }
}
