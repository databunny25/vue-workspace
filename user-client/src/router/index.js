import { createRouter, createWebHistory } from 'vue-router'
import UserListView from '../views/UserListView.vue'

const routes = [
  {
    path: '/',
    name: 'userList',
    component: UserListView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
