<template>
  <el-row style="text-align: center">
    <el-col class="room-name">{{
      store.state.room.name + store.state.room.id
    }}</el-col>
    <el-col class="room-player" :span="4">{{ store.state.room.host }}</el-col>
    <el-col class="room-player" :span="16">VS</el-col>
    <el-col class="room-player" :span="4"
      >{{ store.state.room.gamer }}{{ store.getters.isReady }}</el-col
    >
    <el-col class="qipan-header">
      <canvas
        id="qipan"
        ref="ref_qipan"
        width="601"
        height="601"
        @click="getXY"
      >
        <!-- 切勿通过style或script标签修改canvas的width和height属性 -->
      </canvas>
    </el-col>

    <el-col>
      <el-row class="qipan-footer" justify="center">
        <el-col :span="6">
          <el-button
            class="qipan-btn"
            size="large"
            type="primary"
            @click="roomStatusChange"
            round
            >{{ store.getters.beginText }}</el-button
          >
        </el-col>
        <el-col :span="6">
          <el-button
            class="qipan-btn"
            size="large"
            type="primary"
            round
            v-show="false"
            >更换房间
          </el-button>
        </el-col>
        <el-col :span="6">
          <el-button
            class="qipan-btn"
            size="large"
            type="primary"
            round
            @click="roomQuit"
            >退出房间
          </el-button>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script setup>
import { roomQuit, roomStatusChange } from '../api/room'
import { qipanInit, getQiziXY } from '../api/qipan'
import store from '@/store'
import { ref, onMounted } from 'vue'
const ref_qipan = ref(null)
const qizipre = ref({
  x: -1,
  y: -1,
})
const qizis = ref([])
const getXY = function (e) {
  getQiziXY(e, ref_qipan.value, qizipre.value, qizis.value)
}

onMounted(() => {
  qipanInit(ref_qipan.value, qizipre.value, qizis.value)
})
</script>

<style scoped>
.qipan-btn {
  margin-top: 0.5rem;
  width: 80%;
}
.room-name {
  font-size: 2rem;
  color: black;
  height: 2rem;
  line-height: 2rem;
}
.room-player {
  height: 2rem;
  line-height: 2rem;
  font-size: 1.5rem;
  color: #409eff;
  margin: 0.5rem 0;
}
</style>
