import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: () => {
      // 方法接收目标路由作为参数
      // return 重定向的字符串路径/路径对象
      return { path: '/loginview' }
    },
  },
  {
    path: '/roomview',
    name: 'RoomView',
    component: () =>
      import(/* webpackChunkName: "add" */ '../components/RoomView.vue'),
  },
  {
    path: '/roomlistview',
    name: 'RoomListView',
    component: () =>
      import(/* webpackChunkName: "add" */ '../components/RoomListView.vue'),
  },
  {
    path: '/loginview',
    name: 'LoginView',
    component: () =>
      import(/* webpackChunkName: "add" */ '../components/LoginView.vue'),
  },
  {
    path: '/homeview',
    name: 'HomeView',
    component: () =>
      import(/* webpackChunkName: "add" */ '../components/HomeView.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
