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
    <el-col :span="4">
      <el-button
        class="room-btn"
        round
        size="large"
        type="primary"
        @click="roomQuickJoin"
        v-show="false"
        >快速加入
      </el-button>
    </el-col>
    <el-col :span="4">
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
<script>
import RoomItem from './RoomItem'
import { RPC } from '../utils/request'
import { socket } from '../utils/ws'
import { io } from 'socket.io-client'
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
  setup() {},
  components: {
    RoomItem,
  },
  data() {
    return {
      ws: null,
      rooms: [
        {
          id: 1,
          name: '圆桌厅堂',
          host: '小白',
          status: 0,
        },
        {
          id: 2,
          name: '伟大房间',
          host: '小红',
          status: 0,
        },
        {
          id: 3,
          name: 'bilibili',
          host: '小黑',
          status: 1,
        },
        {
          id: 4,
          name: 'bilibili',
          host: '小黑',
          status: 1,
        },
        {
          id: 5,
          name: 'bilibili',
          host: '小黑',
          status: 1,
        },
        {
          id: 6,
          name: 'bilibili',
          host: '小黑',
          status: 1,
        },
        {
          id: 7,
          name: 'bilibili',
          host: '小黑',
          status: 1,
        },
        {
          id: 8,
          name: 'bilibili',
          host: '小黑',
          status: 1,
        },
        {
          id: 9,
          name: 'bilibili',
          host: '小黑',
          status: 1,
        },
        {
          id: 10,
          name: 'bilibili',
          host: '小黑',
          status: 1,
        },
      ],
    }
  },
  methods: {
    roomJoin(room) {
      RPC('room_join', { room: { id: room.id } })
        .then(() => {
          this.$router.push('/wuziqi')
          this.$store.commit('SET_IS_IN_ROOM', true)
          this.$store.commit('SET_ROOM', {
            id: room.id,
            name: room.name,
            host: room.host,
            gamer: this.$store.state.user.name,
            status: 1,
          })
          socket.emit('room_join', {
            room: room.id,
            user: this.$store.state.user.name,
          })
        })
        .catch((e) =>
          ElMessage({ message: '进入房间失败：' + e, type: 'error' })
        )
    },
    roomCreate() {
      ElMessageBox.prompt('请输入房间名', '选项', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        RPC('room_create', { room: { name: value } })
          .then((data) => {
            this.$router.push('/wuziqi')
            this.$store.commit('SET_IS_IN_ROOM', true)
            this.$store.commit('SET_ROOM', data.room)
            socket.emit('room_create', {
              room: data.room.id,
            })
          })
          .catch((e) =>
            ElMessage({ message: '创建房间失败：' + e, type: 'error' })
          )
      })
    },
    roomQuickJoin() {
      RPC('room_quick_join')
        .then((data) => {
          this.$router.push('/wuziqi')
          this.$store.commit('SET_IS_IN_ROOM', true)
          this.$store.commit('SET_ROOM', data.room)
        })
        .catch((e) =>
          ElMessage({ message: '进入房间失败：' + e, type: 'error' })
        )
    },
    roomListRefresh() {
      RPC('room_list')
        .then((data) => {
          this.rooms = data.rooms
        })
        .catch((e) =>
          ElMessage({ message: '获取房间列表失败：' + e, type: 'error' })
        )
    },
    hello() {
      this.hellows()
    },
    hellows() {
      const socket = io('http://localhost:3000')
      socket.on('connect', () => {
        socket.on('success', (data) => {
          console.log(data)
          socket.emit('mytask', { data: { a: 2 } })
        })

        socket.on('quit', (id) => {
          console.log(`${id}连接断开`)
        })
      })
    },
  },
  mounted() {
    this.roomListRefresh()
  },
}
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
