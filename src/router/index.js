import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/wuziqi',
    name: 'WuziQi',
    component: () =>
      import(/* webpackChunkName: "add" */ '../views/WuziQi.vue'),
  },
  {
    path: '/room',
    name: 'RoomList',
    component: () =>
      import(/* webpackChunkName: "add" */ '../views/RoomList.vue'),
  },
  {
    path: '/login',
    name: 'LoginView',
    component: () =>
      import(/* webpackChunkName: "add" */ '../views/LoginView.vue'),
  },
  {
    path: '/user',
    name: 'UserView',
    component: () =>
      import(/* webpackChunkName: "add" */ '../views/UserView.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
