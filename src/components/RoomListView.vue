<template>
  <a-row class="room-list-view">
    <a-col :span="24">
      <a-card class="room-list">
        <a-table
          :columns="columns"
          :data-source="data"
          :pagination="{ pageSize: 8, position: ['bottomCenter'] }"
        >
          <template #bodyCell="{ text, record, index, column }">
            <template v-if="column.key === 'operation'">
              <a @click="joinRoom(text, record, index, column)">加入</a>
            </template>
          </template>
        </a-table>
        <a-row style="margin-top: 1rem">
          <a-col :span="4">
            <a-button size="large" block @click="roomListBack">
              <template #icon><menu-fold-outlined /></template>
              返回
            </a-button>
          </a-col>
          <a-col :span="4" :offset="10">
            <a-button size="large" type="primary" block>
              <template #icon><menu-unfold-outlined /></template>
              快速加入
            </a-button>
          </a-col>
          <a-col :span="4" :offset="1">
            <a-button size="large" type="primary" block>
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
import {
  PlusSquareOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
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
  },
  {
    title: 'Action',
    key: 'operation',
  },
]
const data = []

for (let i = 0; i < 20; ++i) {
  data.push({
    key: i,
    id: i,
    host: '1' + i,
    name: '伟大房间',
    status: '等待中',
  })
}

const router = useRouter()
const roomListBack = () => {
  router.back()
}

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
