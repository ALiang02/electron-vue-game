import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/wuziqi',
    name: 'WuziQi',
    component: () => import(/* webpackChunkName: "add" */ '../views/WuziQi.vue')
  },
  {
    path: '/room',
    name: 'RoomList',
    component: () => import(/* webpackChunkName: "add" */ '../views/RoomList.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
