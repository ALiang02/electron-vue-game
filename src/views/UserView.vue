<template>
  <el-row class="user-view">
    <el-col style="text-algin: center">
      <el-form class="user-form" label-width="5rem" style="max-width: 20rem">
        <el-form-item label="name">
          <el-input v-model="user.name" placeholder="名称" />
        </el-form-item>
        <el-form-item label="password">
          <el-input v-model="user.password" placeholder="密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round @click="save">保存</el-button>
          <el-button type="default" round @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { ElMessage } from 'element-plus'
import { RPC } from '../utils/request'
export default {
  data() {
    return {
      user: {
        name: this.$store.state.user.name,
        password: this.$store.state.user.password,
      },
    }
  },

  methods: {
    save() {
      RPC('/save', { user: this.user })
        .then((data) => {
          ElMessage({ message: '保存成功!', type: 'success' })
          this.$store.commit('SET_USER', data.user)
        })
        .catch((e) => ElMessage({ message: '保存失败：' + e, type: 'error' }))
    },
    reset() {
      this.user.name = this.$store.state.user.name
      this.user.password = this.$store.state.user.password
    },
  },
}
</script>

<style scoped>
.user-view {
  width: 100%;
  margin-top: 2rem;
}
.user-form {
  margin: 0 auto;
}
</style>
