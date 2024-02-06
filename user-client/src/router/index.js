import { createRouter, createWebHistory } from 'vue-router'
import UserListView from '../views/UserListView.vue'
import UserInfoView from '../views/UserInfoView.vue'
import UserInsertView from '../views/UserInsertView.vue'
import UserUpdateView from '../views/UserUpdateView.vue'

const routes = [
  {
    path: '/',
    name: 'userList',
    component: UserListView
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: UserInfoView
  },
  {
    path: '/userInsert',
    name: 'userInsert',
    component: UserInsertView
  },
  {
    path: '/userUpdate',
    name: 'userUpdate',
    component: UserUpdateView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
