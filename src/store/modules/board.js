import { RPC } from '@/utils/request'
export default {
  state: {
    id: '',
    turn: false,
    chesses: [],
    chessPre: [-1, -1],
    status: -1, //-1未开始，0先手方，1后手方，2和局，3先手方胜，4后手方胜
  },
  mutations: {
    SET_BOARD_DATA: (state, data) => {
      Object.keys(data).forEach(function (key) {
        state[key] = data[key]
      })
    },
    ADD_CHESS: (state, chess) => {
      state.chesses = state.chesses.concat([chess])
    },
  },
  actions: {
    CHESS_ON: ({ commit, state }) => {
      return RPC('chess_on', { chess: state.chessPre }).then((data) => {
        commit('SET_BOARD_DATA', { chessPre: data.chessPre })
        commit('ADD_CHESS', data.chess)
      })
    },
  },
}
