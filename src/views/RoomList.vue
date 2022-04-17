<template>
  <el-row class="room-header room-item">
    <el-col class="room-tag" :span="6">房间名</el-col>
    <el-col class="room-tag" :span="6">房主</el-col>
    <el-col class="room-tag" :span="6">房间状态</el-col>
    <el-col class="room-tag" :span="6">操作</el-col>
  </el-row>
  <el-row class="room-content">
    <el-col>
      <room-item
        class="room-item"
        v-for="room in rooms"
        :key="room.id"
        :room="room"
        @onRoomJoin="roomJoin"
      >
      </room-item>
    </el-col>
  </el-row>
  <el-row class="room-foot" :gutter="10">
    <el-col :span="12">
      <el-pagination
        :background="true"
        layout="prev, pager, next"
        :total="60"
      />
    </el-col>
    <el-col :offset="4" :span="4">
      <el-button
        class="room-btn"
        round
        size="large"
        type="primary"
        @click="roomListRefresh"
        >刷新
      </el-button>
    </el-col>
    <el-col :span="4">
      <el-button
        class="room-btn"
        round
        size="large"
        type="primary"
        @click="roomCreate"
      >
        创建房间
      </el-button>
    </el-col>
  </el-row>
</template>
<script setup>
import RoomItem from './RoomItem'
import { roomJoin, roomCreate, roomList } from '../api/room'
import { onBeforeMount, ref } from 'vue'
const rooms = ref([])
const roomListRefresh = function () {
  roomList(rooms)
}
onBeforeMount(() => {
  roomListRefresh(rooms)
})
</script>

<style scope>
.room-item {
  width: 100%;
  height: 3rem;
  line-height: 3rem;
}
.room-tag {
  text-align: center;
}
.room-content {
  height: 30rem;
  margin-bottom: 1rem;
}
.room-btn {
  width: 100%;
}
</style>
