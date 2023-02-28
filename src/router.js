import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('@/views/AddView.vue')
  },
  {
    path: '/management',
    name: 'management',
    component: () => import('@/views/ManagementView.vue')
  },
  {
    path: '/citation/:id',
    name: 'citation',
    component: () => import('@/views/EditCitationsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
