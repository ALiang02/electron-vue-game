<template>
  <a-row justisy class="login-view" justify="center">
    <a-col :span="8">
      <a-row>
        <a-col :span="24">
          <a-card
            style="width: 100%"
            :tab-list="tabList"
            :active-tab-key="key"
            @tabChange="(key) => onTabChange(key)"
          >
            <template #title>
              <h2 style="text-align: center">GAME</h2>
            </template>
            <template #customTab="item">
              <div style="width: 10rem; text-align: center">
                <h3>{{ item.tab }}</h3>
              </div>
            </template>
            <a-form
              :model="formState"
              ref="formRef"
              autocomplete="off"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
            >
              <a-form-item
                name="account"
                :rules="[{ required: true, message: '请输入账户' }]"
              >
                <a-input
                  v-model:value="formState.account"
                  placeholder="账户"
                  size="large"
                >
                  <template #prefix>
                    <user-outlined />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item
                v-if="key === 'register'"
                name="name"
                :rules="[{ required: true, message: '请输入名称' }]"
              >
                <a-input
                  v-model:value="formState.name"
                  placeholder="名称"
                  size="large"
                >
                  <template #prefix>
                    <my-icon type="icon-namecard" />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item
                name="password"
                :rules="[{ required: true, message: '请输入密码' }]"
              >
                <a-input-password
                  v-model:value="formState.password"
                  placeholder="密码"
                  size="large"
                >
                  <template #prefix>
                    <lock-outlined />
                  </template>
                </a-input-password>
              </a-form-item>
              <a-form-item
                v-if="key === 'register'"
                name="passwordConfirm"
                :rules="[
                  { validator: checkPasswordConfirm, trigger: 'submit' },
                ]"
              >
                <a-input-password
                  v-model:value="formState.passwordConfirm"
                  placeholder="确认密码"
                  size="large"
                >
                  <template #prefix>
                    <lock-outlined />
                  </template>
                </a-input-password>
              </a-form-item>

              <a-button type="primary" block size="large" html-type="submit">
                {{ key === 'login' ? '登录' : '注册' }}
              </a-button>
            </a-form>
          </a-card>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>
<script setup>
import store from '@/store'
import { message } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
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
const formRef = ref(null)
const formState = reactive({
  account: '',
  name: '',
  password: '',
  passwordConfirm: '',
})
const router = useRouter()

const onFinish = (values) => {
  console.log(values)
  store
    .dispatch(key.value.toUpperCase(), values)
    .then(() => {
      router.push('/homeview')
    })
    .catch((e) => {
      message.error(e)
    })
}

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
const key = ref('login')
const onTabChange = (value) => {
  formRef.value.clearValidate()
  key.value = value
}

let checkPasswordConfirm = async (_rule, value) => {
  if (!value) {
    return Promise.reject('请确认密码')
  } else if (value !== formState.password) {
    return Promise.reject('密码不一致')
  } else {
    return Promise.resolve()
  }
}
</script>
<style scoped>
.login-view {
  padding-top: 8rem;
  height: 100%;
}
</style>
