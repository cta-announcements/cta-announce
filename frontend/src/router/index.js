import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: () => import('../views/Submit'),
    alias: '/submit'
  },
  {
    path: '/announcements', 
    component: () => import('../views/Announcements')
  },
  {
    path: '/display',
    component: () => import('../views/Display')
  },
  {
    path: '/admin',
    component: () => import('../views/Admin'),
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
