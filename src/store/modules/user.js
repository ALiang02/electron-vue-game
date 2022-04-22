import { RPC } from '@/utils/request'
export default {
  state: {
    account: '',
    name: '', //用户名称
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
        commit('SET_USER_DATA', repData)
      })
    },
    REGISTER: ({ commit }, reqData) => {
      return RPC('register', {
        account: reqData.account,
        password: reqData.password,
      }).then((repData) => {
        commit('SET_USER_DATA', repData)
      })
    },
  },
}
