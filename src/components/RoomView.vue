<template>
  <a-row class="room">
    <a-col :span="5">
      <a-row class="panel">
        <a-col :span="24">
          <a-card class="user-panel" title="对手">123 </a-card>
        </a-col>
        <a-col :span="24">
          <a-card class="user-panel" title="个人">
            <p>战绩</p>
            <p>战绩</p>
            <a-button @click="room_btn_fn">{{ room_btn_tx }}</a-button>
            <a-button v-show="room_btn_show" @click="hand_change">
              交换先手方
            </a-button>
            <a-button @click="room_quit"> 退出房间 </a-button>
          </a-card>
        </a-col>
      </a-row>
    </a-col>
    <a-col :span="14">
      <a-row class="panel">
        <a-col :span="24">
          <a-card class="board-panel">
            <canvas ref="board_ref" width="601" height="601" @click="getXY" />
          </a-card>
        </a-col>
      </a-row>
    </a-col>
    <a-col :span="5">
      <a-row class="panel">
        <a-col :span="24">
          <a-card class="message-panel">
            <a-tabs v-model:activeKey="activeKey" @tabClick="handleClick">
              <a-tab-pane key="1" tab="Tab 1" class="tab-content">
                <a-list
                  item-layout="horizontal"
                  :data-source="data"
                  size="small"
                  :split="false"
                >
                  <template #renderItem="{ item }">
                    <a-list-item>
                      <a-list-item-meta :description="item.title">
                      </a-list-item-meta>
                    </a-list-item>
                  </template>
                </a-list>
              </a-tab-pane>
              <a-tab-pane key="2" tab="Tab 2" force-render
                >Content of Tab Pane 2</a-tab-pane
              >
              <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
            </a-tabs>
          </a-card>
        </a-col>
        <a-col :span="24">
          <a-card class="message-panel">
            <a-row>
              <a-col :span="24" class="chat-content">
                <a-list
                  item-layout="horizontal"
                  :data-source="data"
                  size="small"
                  :split="false"
                >
                  <template #renderItem="{ item }">
                    <a-list-item>
                      <a-list-item-meta :description="item.title">
                      </a-list-item-meta>
                    </a-list-item>
                  </template>
                </a-list>
              </a-col>
              <a-col :span="24" class="chat-edit">
                <a-input-group compact>
                  <a-input
                    v-model:value="chatMessage"
                    style="width: calc(100% - 80px)"
                    :maxlength="20"
                  />
                  <a-button type="primary" style="width: 5rem">发送</a-button>
                </a-input-group>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>
<script setup>
import store from '@/store'
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import Board from '@/utils/board'
const board_ref = ref(null)
let board
const activeKey = ref('1')
const chatMessage = ref('')

const handleClick = (tab, event) => {
  console.log(tab, event, activeKey)
}
const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title:
      'Ant Design Title 2Ant Design Title 2Ant Design Title 2Ant Design Title 2',
  },
  {
    title:
      'Ant Design Title 3Ant Design Title 3Ant Design Title 3Ant Design Title 3Ant Design Title 3Ant Design Title 3Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
]
onMounted(() => {
  board = new Board(board_ref.value)
  board.boardInit()
  for (let i = 0; i < chesses.value.length; i++) {
    board.chessInit(chesses.value[i], i)
  }
})

const chessPre = computed(() => store.state.board.chessPre)
const chesses = computed(() => store.state.board.chesses)
const line = computed(() => store.state.board.line)
watch(chessPre, (newValue, oldValue) => {
  if (newValue[0] === -1 && newValue[1] === -1) {
    board.chessPreClear(oldValue)
  } else if (newValue[0] !== oldValue[0] || newValue[1] !== oldValue[1]) {
    board.chessPreClear(oldValue)
    board.chessPreInit(newValue)
  }
})
watch(chesses, (newValue, oldValue) => {
  console.log(chesses, newValue, oldValue)
  if (newValue.length !== 0) {
    board.chessInit(newValue[oldValue.length], oldValue.length)
  }
})
watch(line, (newValue) => {
  if (newValue) {
    board.drawVctLine(newValue, chesses.value.length - 1)
    if (
      (chesses.value.length % 2 === 1 && hostFirst) ||
      (chesses.value.length % 2 === 0 && !hostFirst.value)
    ) {
      message.success(`${store.state.room.host}赢了`)
    } else {
      message.success(`${store.state.room.gamer}赢了`)
    }
  }
})

const getXY = (e) => {
  if (!store.state.board.turn) return
  let [x, y] = board.getXY(e)
  if (x === -1 && y === -1) return
  let chesses = store.state.board.chesses
  let chessPre = store.state.board.chessPre
  if (chesses.find((chess) => chess[0] === x && chess[1] === y)) return
  if (chessPre[0] === x && chessPre[1] === y) {
    store.dispatch('CHESS_ON').catch((e) => {
      message.error(e)
    })
  } else {
    store.commit('SET_BOARD_DATA', { chessPre: [x, y] })
  }
}

const isHost = computed(() => {
  return store.state.user.name === store.state.room.host
})

const room_btn_show = computed(() => {
  return store.state.room.status === 3
})

const room_btn_tx = computed(() => {
  if (isHost.value) {
    return '开始游戏'
  } else {
    if (store.state.room.status === 1) {
      return '准备'
    } else {
      return '取消准备'
    }
  }
})

const room_btn_fn = () => {
  if (isHost.value) {
    if (store.state.room.status === 0) {
      message.error('请等待玩家加入')
    } else if (store.state.room.status === 1) {
      message.error('请等待玩家准备')
    } else {
      store
        .dispatch('START_ROOM', { hostFirst: hostFirst.value })
        .catch((e) => {
          message.error(e)
        })
    }
  } else {
    let method
    if (store.state.room.status === 1) {
      method = 'READY_ROOM'
    } else {
      method = 'CANCEL_READY_ROOM'
    }
    store.dispatch(method).catch((e) => {
      message.error(e)
    })
  }
}

const hostFirst = ref(true)
const hand_change = () => {
  hostFirst.value = !hostFirst.value
}

const router = useRouter()

const room_quit = () => {
  store
    .dispatch('QUIT_ROOM')
    .then(() => {
      router.back()
    })
    .catch((e) => {
      message.error(e)
    })
}
</script>

<style scoped>
.room {
  height: 45rem;
}
.panel {
  height: 100%;
  padding: 0.5rem;
}

.user-panel {
  height: 21rem;
}
.board-panel {
  height: 43rem;
}
.message-panel {
  height: 21rem;
}
.tab-content {
  height: 15rem;
  overflow: auto;
}
.chat-content {
  height: 16rem;
  overflow: auto;
}
.chat-edit {
  margin-top: 0.5rem;
  height: 1.5rem;
}

canvas {
  display: block;
  margin: 0 auto;
}
</style>
