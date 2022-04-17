<template>
  <el-row>
    <el-col :span="6">{{ room.name + ' ' + room.id }}</el-col>
    <el-col :span="6">{{ room.host }}</el-col>
    <el-col :span="6">{{ roomStatus[room.status] }}</el-col>
    <el-col :span="6">
      <el-button
        round
        :disabled="room.status !== 0"
        @click="this.$emit('onRoomJoin', room)"
        >加入房间
      </el-button>
    </el-col>
  </el-row>
</template>
<script setup>
import { defineProps } from 'vue'
defineProps({
  room: Object,
})
const roomStatus = ['等待中', '已满员', '已满员', '游戏中', '游戏中']
</script>

<style scoped>
.el-col {
  text-align: center;
}
</style>
