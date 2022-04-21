export default {
  state: {
    id: '',
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
}