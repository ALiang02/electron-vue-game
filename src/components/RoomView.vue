<template>
  <el-row class="room">
    <el-col :span="6">
      <el-row class="panel">
        <el-col>
          <el-card class="user-panel">
            <template #header>
              <div class="card-header">{{ store.state.room.gamer }}</div>
            </template>
            123123
          </el-card>
        </el-col>
        <el-col>
          <el-card class="user-panel">
            <template #header>
              <div class="card-header">{{ store.state.room.host }}</div>
            </template>
            123123
          </el-card>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="12">
      <el-row class="panel">
        <el-col>
          <el-card class="board-panel">
            <canvas ref="board_ref" width="601" height="601" @click="getXY" />
          </el-card>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="6">
      <el-row class="panel">
        <el-col>
          <el-card class="message-panel">
            <el-tabs
              v-model="activeName"
              class="demo-tabs"
              @tab-click="handleClick"
            >
              <el-tab-pane label="房间设置" name="first">User</el-tab-pane>
              <el-tab-pane label="房间记录" name="second">Config</el-tab-pane>
              <el-tab-pane label="落子记录" name="third">Role</el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
        <el-col>
          <el-card class="message-panel">
            <el-tabs
              v-model="activeName"
              class="demo-tabs"
              @tab-click="handleClick"
            >
              <el-tab-pane label="系统" name="first">User</el-tab-pane>
              <el-tab-pane label="房间" name="second">Config</el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script setup>
import store from '@/store'
import { ref, onMounted } from 'vue'
import Board from '@/utils/board'
const board_ref = ref(null)
let board
const activeName = ref('first')
const handleClick = (tab, event) => {
  console.log(tab, event, activeName)
}
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
canvas {
  display: block;
  margin: 0 auto;
}
</style>
