import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [createPersistedState()],
  state: {
    isInRoom: false,
    user: {
      id: '',
      name: '',
      password: '',
    },
    room: {
      id: '041201',
      name: '我的伟大房间',
      status: -1,
      host: '玩家A',
      gamer: '玩家B',
    },
    qipan: {
      id: '',
      turn: '',
    },
  },
  getters: {
    isInRoomText(state) {
      return state.isInRoom ? '/wuziqi' : '/room'
    },
    isHost(state) {
      return state.room.host === state.user.name
    },
    isReady(state) {
      return state.room.status === 2 ? '已准备' : ''
    },
    beginText(state, getters) {
      const room_status = state.room.status
      if (room_status < 3) {
        if (getters.isHost) {
          return '开始游戏'
        } else {
          return room_status !== 2 ? '准备' : '取消准备'
        }
      } else {
        return '投降'
      }
    },
  },
  mutations: {
    SET_TODO_ARRAY: (state, todoArray) => {
      state.todoArray = todoArray
    },
    SET_FINISHED_ARRAY: (state, finishedArray) => {
      state.finishedArray = finishedArray
    },
    SET_KEEP_TIMES: (state, keepTimes) => {
      state.keepTimes = keepTimes
    },
    SET_IS_IN_ROOM: (state, isInRoom) => {
      state.isInRoom = isInRoom
    },
    SET_USER_ID: (state, userId) => {
      state.user.id = userId
    },
    SET_USER_NAME: (state, userName) => {
      state.user.name = userName
    },
    SET_USER_PASSWORD: (state, userPassword) => {
      state.user.password = userPassword
    },
    SET_USER: (state, user) => {
      Object.assign(state.user, user)
    },
    SET_ROOM_ID: (state, roomId) => {
      state.room.id = roomId
    },
    SET_ROOM_NAME: (state, roomName) => {
      state.room.name = roomName
    },
    SET_ROOM_STATUS: (state, roomStatus) => {
      state.room.status = roomStatus
    },
    SET_ROOM_HOST: (state, roomHost) => {
      state.room.host = roomHost
    },
    SET_ROOM_GAMER: (state, roomGamer) => {
      state.room.gamer = roomGamer
    },
    SET_ROOM: (state, room) => {
      Object.assign(state.room, room)
    },
    SET_QIPAN_ID: (state, qipanId) => {
      state.qipan.id = qipanId
    },
    SET_QIPAN_TURN: (state, qipanTurn) => {
      state.qipan.turn = qipanTurn
    },
  },
})
