import Vue from 'vue';
import VueRouter from 'vue-router';
import AdminPage from '@/app/admin/App.vue';

Vue.use(VueRouter)

const routes = [  
  {
    path: '/adminPage',
    name: 'Admin Page',
    redirect: '/admin'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
