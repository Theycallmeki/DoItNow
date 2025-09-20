import { createRouter, createWebHistory } from 'vue-router'
import TaskList from '../pages/TaskList.vue'
import CreateTask from '../pages/CreateTask.vue'
import TaskDone from '../pages/TaskDone.vue'

const routes = [
  { path: '/', redirect: '/tasks' },          // default → TaskList
  { path: '/tasks', component: TaskList },    // shows TaskList.vue
  { path: '/create', component: CreateTask }, // shows CreateTask.vue
  { path: '/done', component: TaskDone }      // shows TaskDone.vue
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
