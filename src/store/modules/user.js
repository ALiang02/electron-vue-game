export default {
  state: {
    id: '',
    name: '', //用户名称
  },
  mutations: {
    SET_USER_DATA: (state, data) => {
      Object.keys(data).forEach(function (key) {
        state[key] = data[key]
      })
    },
  },
}
