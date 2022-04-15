<template>
  <el-row>
    <el-col :span="6">{{ room.name + ' ' + room.id }}</el-col>
    <el-col :span="6">{{ room.host }}</el-col>
    <el-col :span="6">{{ this.roomStatus[room.status] }}</el-col>
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
<script>
export default {
  setup() {},
  name: 'room-item',
  props: {
    room: Object,
  },
  data() {
    return {
      roomStatus: ['等待中', '已满员', '已满员', '游戏中', '游戏中'],
    }
  },
}
</script>
<style scoped>
.el-col {
  text-align: center;
}
</style>
