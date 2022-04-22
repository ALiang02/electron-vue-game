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
    path: '/registerview',
    name: 'RegisterView',
    component: () =>
      import(/* webpackChunkName: "add" */ '../components/RegisterView.vue'),
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
