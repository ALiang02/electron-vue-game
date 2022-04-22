<template>
  <a-row justisy class="login-view" justify="center">
    <a-col :span="8">
      <a-row>
        <a-col :span="24">
          <a-card
            style="width: 100%"
            :tab-list="tabList"
            :active-tab-key="key"
            @tabChange="(key) => onTabChange(key, 'key')"
          >
            <template #title>
              <h2 style="text-align: center">GAME</h2>
            </template>
            <template #customTab="item">
              <div style="width: 10rem; text-align: center">
                <h3>{{ item.tab }}</h3>
              </div>
            </template>
            <template v-if="key === 'login'">
              <a-space
                direction="vertical"
                style="width: 100%; height: 10rem"
                size="large"
              >
                <a-input
                  v-model:value="userName"
                  placeholder="账户名"
                  size="large"
                >
                  <template #prefix>
                    <user-outlined />
                  </template>
                </a-input>
                <a-input-password
                  v-model:value="password"
                  placeholder="密码"
                  size="large"
                >
                  <template #prefix>
                    <lock-outlined />
                  </template>
                </a-input-password>
              </a-space>
            </template>
            <template v-else>
              <a-space
                direction="vertical"
                style="width: 100%; height: 10rem"
                size="large"
              >
                <a-input
                  v-model:value="userName"
                  placeholder="账户名"
                  size="large"
                >
                  <template #prefix>
                    <user-outlined />
                  </template>
                </a-input>
                <a-input-password
                  v-model:value="password"
                  placeholder="密码"
                  size="large"
                >
                  <template #prefix>
                    <lock-outlined />
                  </template>
                </a-input-password>
                <a-input-password
                  v-model:value="passwordConfirm"
                  placeholder="确认密码"
                  size="large"
                >
                  <template #prefix>
                    <lock-outlined />
                  </template>
                </a-input-password>
              </a-space>
            </template>
            <a-button
              type="primary"
              block
              size="large"
              style="margin-top: 2rem"
              >{{ key === 'login' ? '登录' : '注册' }}</a-button
            >
          </a-card>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>
<script setup>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
const tabList = [
  {
    key: 'login',
    tab: '登录',
  },
  {
    key: 'register',
    tab: '注册',
  },
]
const userName = ref('')
const password = ref('')
const passwordConfirm = ref('')
const key = ref('login')
const onTabChange = (value, type) => {
  console.log(value, type)

  if (type === 'key') {
    key.value = value
  }
}
</script>
<style scoped>
.login-view {
  padding-top: 8rem;
  height: 100%;
}
</style>
