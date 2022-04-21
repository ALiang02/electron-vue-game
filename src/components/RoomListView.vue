<template>
  <el-row class="room-list-view">
    <el-col :span="24">
      <a-card class="room-list">
        <a-table :columns="columns" :data-source="data">
          <template #bodyCell="{ text, record, index, column }">
            <template v-if="column.key === 'operation'">
              <a @click="joinRoom(text, record, index, column)">加入</a>
            </template>
          </template>
        </a-table>
      </a-card>
    </el-col>
  </el-row>
</template>
<script setup>
const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '房间名称',
    dataIndex: 'name',
    key: 'name',
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

for (let i = 0; i < 3; ++i) {
  data.push({
    key: i,
    id: i,
    name: '伟大房间',
    status: '等待中',
  })
}

const joinRoom = (...args) => {
  console.log(args)
}
</script>

<style scoped>
.room-list-view {
  padding: 1rem;
  height: 100%;
}
.room-list {
  height: 43rem;
}
</style>
