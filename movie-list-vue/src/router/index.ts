import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import DetailPage from '@/views/DetailPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/movie/:id',
      name: 'movie-detail',
      component: DetailPage,
    },
  ],
})

export default router
