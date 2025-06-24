import { createRouter, createWebHashHistory } from 'vue-router'
import { setupRouterGuard } from './guard'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/EnglishExamView.vue')
    },
    {
      path: '/exam',
      name: 'exam',
      component: () => import('../views/ExamView.vue')
    }
  ]
})

setupRouterGuard(router)

export default router
