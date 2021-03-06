import { RPC } from '@/utils/request'
export default {
  state: {
    account: '', //用户名称
    name: '',
  },
  mutations: {
    SET_USER_DATA: (state, data) => {
      Object.keys(data).forEach(function (key) {
        state[key] = data[key]
      })
    },
  },
  actions: {
    LOGIN: ({ commit }, reqData) => {
      return RPC('login', reqData).then((repData) => {
        commit('SET_USER_DATA', repData.user)
        commit('SET_ROOM_DATA', repData.room)
        commit('SET_BOARD_DATA', repData.board)
      })
    },
    REGISTER: ({ commit }, reqData) => {
      return RPC('register', {
        account: reqData.account,
        name: reqData.name,
        password: reqData.password,
      }).then((repData) => {
        commit('SET_USER_DATA', repData.user)
        commit('SET_ROOM_DATA', repData.room)
        commit('SET_BOARD_DATA', repData.board)
      })
    },
  },
}
