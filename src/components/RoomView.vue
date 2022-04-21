<template>
  <a-row class="room">
    <a-col :span="6">
      <a-row class="panel">
        <a-col :span="24">
          <a-card class="user-panel" title="对手">123 </a-card>
        </a-col>
        <a-col :span="24">
          <a-card class="user-panel" title="个人">
            <p>战绩</p>
            <p>战绩</p>
          </a-card>
        </a-col>
      </a-row>
    </a-col>
    <a-col :span="12">
      <a-row class="panel">
        <a-col>
          <a-card class="board-panel">
            <canvas ref="board_ref" width="601" height="601" @click="getXY" />
          </a-card>
        </a-col>
      </a-row>
    </a-col>
    <a-col :span="6">
      <a-row class="panel">
        <a-col :span="24">
          <a-card class="message-panel">
            <a-tabs v-model:activeKey="activeKey" @tabClick="handleClick">
              <a-tab-pane key="1" tab="Tab 1">Content of Tab Pane 1</a-tab-pane>
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
                    v-model:value="value19"
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
import { ref, onMounted } from 'vue'
import Board from '@/utils/board'
const board_ref = ref(null)
let board
const activeKey = ref('1')
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
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
]
onMounted(() => {
  board = new Board(board_ref.value)
  board.boardInit()
})

const getXY = (e) => {
  let [x, y] = board.getXY(e)
  if (x === -1 && y === -1) return
  let chesses = store.state.board.chesses
  let chessPre = store.state.board.chessPre
  if (chesses.find((chess) => chess[0] === x && chess[1] === y)) return
  if (chessPre[0] === x && chessPre[1] === y) {
    store
      .dispatch('CHESS_ON')
      .then(() => {
        board.chessInit([x, y], chesses.length)
      })
      .catch((e) => {
        console.log(e)
      })
  } else {
    board.chessPreReset()
    store.commit('SET_BOARD_DATA', { chessPre: [x, y] })
    board.chessPreInit()
  }
}
</script>

<style scoped>
.room {
  /* margin: 2rem 0; */
  height: 54rem;
  background-color: antiquewhite;
}
.panel {
  height: 100%;
  padding: 2rem;
}

.user-panel {
  height: 24rem;
}
.board-panel {
  height: 49rem;
}
.message-panel {
  height: 24rem;
}
.chat-content {
  font-size: 10px;
  height: 18rem;
  overflow: auto;
}
.chat-edit {
  margin-top: 0.5rem;
  height: 2.5rem;
}

canvas {
  display: block;
  margin: 0 auto;
}
</style>
