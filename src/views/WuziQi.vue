<template>
  <el-row style="text-align: center">
    <el-col class="room-name">{{room.name+room.id}}</el-col>
    <el-col class="room-player" :span="4">{{room.host}}</el-col>
    <el-col class="room-player" :span="16">VS</el-col>
    <el-col class="room-player" :span="4">{{room.gamer}}</el-col>
    <el-col class="qipan-header">
      <canvas id="qipan" width="601" height="601" @click="getXY">
        <!-- 切勿通过style或script标签修改canvas的width和height属性 -->
      </canvas>
    </el-col>

    <el-col>
      <el-row class="qipan-footer" justify="center">
        <el-col :span="6">
          <el-button class="qipan-btn" size="large" type="primary" round>{{beginText}}</el-button>
        </el-col>
        <el-col :span="6">
          <el-button class="qipan-btn" size="large" type="primary" round @click="roomChange">更换房间
          </el-button>
        </el-col>
        <el-col :span="6">
          <el-button class="qipan-btn" size="large" type="primary" round @click="roomQuit">退出房间
          </el-button>
        </el-col>

      </el-row>
    </el-col>

  </el-row>
</template>
<script>
import { RPC } from '../utils/request'
export default {
  data () {
    return {
      qizipre: {
        x: -1,
        y: -1
      },
      qizis: []
    }
  },
  computed: {
    room () {
      console.log(this.$store.state.room)
      return this.$store.state.room
    },
    isHost () {
      return this.$store.state.room.host === this.$store.state.userName
    },
    beginText () {
      if (this.isHost) {
        return '开始游戏'
      } else {
        return this.$store.state.room.status !== 2 ? '准备' : '取消准备'
      }
    }
  },
  methods: {
    roomChange () {
      RPC('room_change').then((data) => {
        this.$store.commit('SET_ROOM', data.room)
      })
    },
    roomQuit () {
      this.$router.push('/room')
      this.$store.commit('SET_IS_IN_ROOM', false)
      // RPC('room_quit').then((data) => {
      //   this.$router.push('/room')
      //   this.$store.commit('SET_IS_IN_ROOM', false)
      //   this.$store.commit('SET_ROOM', data.room)
      // })
    },
    qipanInit () {
      const qipan = document.getElementById('qipan')
      const cxt = qipan.getContext('2d')
      cxt.lineWidth = 1
      cxt.strokeStyle = 'black'
      cxt.fillStyle = '#E6A23C'
      cxt.fillRect(0, 0, 601, 601)
      for (let i = 0; i < 15; i++) {
        cxt.moveTo(i * 40 + 0.5 + 20, 0 + 20)
        cxt.lineTo(i * 40 + 0.5 + 20, 561 + 20)
        cxt.moveTo(0 + 20, i * 40 + 0.5 + 20)
        cxt.lineTo(561 + 20, i * 40 + 0.5 + 20)
        // 1px问题，canvas的线条画法不一样，canvas的每条线都有一条无限细的“中线”，线条的宽度是从中线向两侧延伸的。
      }
      cxt.stroke()
      cxt.fillStyle = '#000000'
      cxt.beginPath()
      cxt.arc(120 + 0.5 + 20, 120 + 0.5 + 20, 4, 0, Math.PI * 2)
      cxt.closePath()
      cxt.fill()
      cxt.beginPath()
      cxt.arc(440 + 0.5 + 20, 120 + 0.5 + 20, 4, 0, Math.PI * 2)
      cxt.closePath()
      cxt.fill()
      cxt.beginPath()
      cxt.arc(120 + 0.5 + 20, 440 + 0.5 + 20, 4, 0, Math.PI * 2)
      cxt.closePath()
      cxt.fill()
      cxt.beginPath()
      cxt.arc(440 + 0.5 + 20, 440 + 0.5 + 20, 4, 0, Math.PI * 2)
      cxt.closePath()
      cxt.fill()

      this.qiziPreInit(this.qizipre.x, this.qizipre.y)

      for (let i = 0; i < this.qizis.length; i++) {
        this.qiziInit(this.qizis[i].x, this.qizis[i].y, i)
      }
    },
    qiziPreInit (x, y) {
      // x,y是坐标,画上预选位置
      if (x === -1 || y === -1) {
        return
      }
      x *= 40
      y *= 40
      const qipan = document.getElementById('qipan')
      const cxt = qipan.getContext('2d')
      cxt.moveTo(x + 16 + 0.5 + 20, y + 2 + 0.5 + 20)
      cxt.lineTo(x + 2 + 0.5 + 20, y + 2 + 0.5 + 20)
      cxt.lineTo(x + 2 + 0.5 + 20, y + 16 + 0.5 + 20)

      cxt.moveTo(x - 16 + 0.5 + 20, y + 2 + 0.5 + 20)
      cxt.lineTo(x - 2 + 0.5 + 20, y + 2 + 0.5 + 20)
      cxt.lineTo(x - 2 + 0.5 + 20, y + 16 + 0.5 + 20)

      cxt.moveTo(x + 16 + 0.5 + 20, y - 2 + 0.5 + 20)
      cxt.lineTo(x + 2 + 0.5 + 20, y - 2 + 0.5 + 20)
      cxt.lineTo(x + 2 + 0.5 + 20, y - 16 + 0.5 + 20)

      cxt.moveTo(x - 16 + 0.5 + 20, y - 2 + 0.5 + 20)
      cxt.lineTo(x - 2 + 0.5 + 20, y - 2 + 0.5 + 20)
      cxt.lineTo(x - 2 + 0.5 + 20, y - 16 + 0.5 + 20)
      cxt.stroke()
    },
    qiziInit (x, y, n) {
      // x,y是棋子坐标,n是棋子次序,画上棋子
      x *= 40
      y *= 40
      const qipan = document.getElementById('qipan')
      const cxt = qipan.getContext('2d')

      if (n % 2 === 0) {
        cxt.fillStyle = '#000000'
      } else {
        cxt.fillStyle = '#ffffff'
      }

      cxt.beginPath()
      cxt.arc(x + 0.5 + 20, y + 0.5 + 20, 18, 0, Math.PI * 2)
      cxt.closePath()
      cxt.fill()
    },
    getXY (e) {
      // 获取x,y坐标
      let x = e.offsetX - 20
      let y = e.offsetY - 20

      if (
        ((x % 40 >= 0 && x % 40 <= 10) || (x % 40 >= 30 && x % 40 < 40)) &&
        ((y % 40 >= 0 && y % 40 <= 10) || (y % 40 >= 30 && y % 40 < 40))
      ) {
        x = parseInt((x + 20) / 40)
        y = parseInt((y + 20) / 40)
        if (x === this.qizipre.x && y === this.qizipre.y) {
          this.qizis.push({
            x,
            y
          })
          this.qizipre.x = -1
          this.qizipre.y = -1
        } else {
          this.qizipre = { x, y }
        }
        this.qipanInit()
      }
    }
  },
  mounted () {
    this.qipanInit()
  }
}
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
