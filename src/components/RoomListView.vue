<template>
  <a-row class="room-list-view">
    <a-col :span="24">
      <a-card class="room-list">
        <a-table
          :columns="columns"
          :data-source="rooms"
          :loading="loading"
          :pagination="{ pageSize: 8, position: ['bottomCenter'] }"
        >
          <template #bodyCell="{ text, record, index, column }">
            <template v-if="column.key === 'operation'">
              <a @click="joinRoom(text, record, index, column)">加入</a>
            </template>
            <template v-if="column.key === 'status'">
              <div
                :style="{
                  color:
                    record.status === 0
                      ? colorState.successColor
                      : colorState.errorColor,
                }"
              >
                {{ statusTxt[record.status] }}
              </div>
            </template>
          </template>
        </a-table>
        <a-row style="margin-top: 1rem">
          <a-col :span="3">
            <a-button size="large" block @click="roomListBack">
              <template #icon><menu-fold-outlined /></template>
              返回
            </a-button>
          </a-col>
          <a-col :span="3" :offset="10">
            <a-button size="large" type="primary" block @click="getRoomList">
              <template #icon><my-icon type="icon-refresh" /></template>
              刷新
            </a-button>
          </a-col>
          <a-col :span="3" :offset="1">
            <a-button size="large" type="primary" block>
              <template #icon><menu-unfold-outlined /></template>
              快速加入
            </a-button>
          </a-col>
          <a-col :span="3" :offset="1">
            <a-button size="large" type="primary" block @click="createRoom">
              <template #icon><plus-square-outlined /></template>
              创建房间
            </a-button>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
</template>
<script setup>
import { RPC } from '@/utils/request'
import store from '@/store'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  PlusSquareOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { ElMessageBox } from 'element-plus'

const statusTxt = ['等待中', '已满员', '已满员', '游戏中']
const colorState = {
  primaryColor: '#1890ff',
  errorColor: '#ff4d4f',
  warningColor: '#faad14',
  successColor: '#52c41a',
  infoColor: '#1890ff',
}
const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: '房间名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '房主',
    dataIndex: 'host',
    key: 'host',
  },
  {
    title: '房间状态',
    dataIndex: 'status',
    key: 'status',
    sorter: (a, b) => a.status - b.status,
  },
  {
    title: 'Action',
    key: 'operation',
  },
]
let rooms = reactive([])
let loading = ref(false)
const router = useRouter()

const roomListBack = () => {
  router.back()
}

const getRoomList = () => {
  loading.value = true
  RPC('room_list')
    .then((data) => {
      rooms.length = 0
      data.forEach((item) => {
        rooms.push({
          key: item.id,
          id: item.id,
          name: item.name,
          host: item.host_name,
          status: item.status,
        })
      })
      loading.value = false
    })
    .catch((e) => {
      loading.value = false
      message.error(e)
    })
}

const createRoom = () => {
  ElMessageBox.prompt('请输入房间名', '选项', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
  })
    .then(({ value }) => {
      store
        .dispatch('CREATE_ROOM', { name: value })
        .then(() => {
          router.push('/roomview')
        })
        .catch((e) => {
          message.error(e)
        })
    })
    .catch(() => {})
}

onMounted(() => {
  getRoomList()
})

const joinRoom = (...args) => {
  console.log(args)
}
</script>

<style scoped>
.room-list-view {
  padding: 1rem;
  height: 100%;
  /* padding-bottom: 3rem; */
}
.room-list {
  height: 43rem;
}
</style>
