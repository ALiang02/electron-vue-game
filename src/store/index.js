import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [createPersistedState()],
  state: {
    todoArray: [],
    finishedArray: [],
    keepTimes: 0,
    isInRoom: false,
    userId: '',
    user: {
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
      state.userId = userId
    },
    SET_USER_NAME: (state, userName) => {
      state.user.name = userName
    },
    SET_USER_PASSWORD: (state, userPassword) => {
      state.user.password = userPassword
    },
    SET_USER: (state, user) => {
      state.user = user
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
  },
})
