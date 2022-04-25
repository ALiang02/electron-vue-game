import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import modules from './modules'

export default createStore({
  plugins: [createPersistedState()],
  modules,
  state: {
    socket: '',
  },
  mutations: {
    SET_SOCKET: (state, value) => {
      state.socket = value
    },
  },
})
