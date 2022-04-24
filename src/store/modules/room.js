import { RPC } from '@/utils/request'
export default {
  state: {
    id: -1,
    name: '', //房间名称
    host: '', //房主名称
    gamer: '', //玩家名称
    status: -1, //状态 -1未创建,0房间已创建，1玩家已加入，2玩家已准备，3游戏开始
    log: [], //房间记录 记录房间创建，玩家加入，玩家准备，游戏开始，落子，成龙等日志
    chat: [], //聊天记录 记录聊天日志
    rule: [], //房间规则 总操作时间限制，单次操作时间限制，随机先后手/固定先后手/顺序先后手
  },
  mutations: {
    SET_ROOM_DATA: (state, data) => {
      Object.keys(data).forEach(function (key) {
        state[key] = data[key]
      })
    },
  },
  actions: {
    CREATE_ROOM: ({ commit }, data) => {
      return RPC('room_create', data).then((repData) => {
        commit('SET_ROOM_DATA', repData)
      })
    },
    JOIN_ROOM: ({ commit }, data) => {
      return RPC('room_join', data).then((repData) => {
        commit('SET_ROOM_DATA', repData)
      })
    },
    QUIT_ROOM: ({ commit }) => {
      return RPC('room_quit').then((repData) => {
        commit('SET_ROOM_DATA', repData)
      })
    },
    READY_ROOM: ({ commit }) => {
      return RPC('room_ready').then((repData) => {
        commit('SET_ROOM_DATA', repData)
      })
    },
    CANCEL_READY_ROOM: ({ commit }) => {
      return RPC('room_ready_cancel').then((repData) => {
        commit('SET_ROOM_DATA', repData)
      })
    },
    START_ROOM: ({ commit }, data) => {
      return RPC('room_start', data).then((repData) => {
        commit('SET_ROOM_DATA', {
          status: repData.status,
        })
        commit('SET_BOARD_DATA', repData.board)
      })
    },
  },
}
