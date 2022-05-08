import Vue from 'vue';
import VueRouter from 'vue-router';
import ChangeQnAView from '@/app/admin/ChangeQnAView.vue';
import store from '@/store/admin';
import LoginView from '@/app/admin/LoginView.vue';
import QnAListView from '@/app/admin/ListQnAView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/admin',
    name: 'Main',
    redirect: '/admin/login'
  },
  {
    path: '/admin/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/admin/view',
    name: 'Q&A View',
    component: QnAListView
  },
  {
    path: '/admin/view/:id',
    name: 'Q&A Detail View',
    component: ChangeQnAView,
    props: true
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(function(to, from, next) {  
  const publicPath = ['/admin/login'];
  if(publicPath.includes(to.path)) {
    next();
  } else {
    if(store.getters.isLogin) {
      next();
    } else {
      //login 정보가 없을 경우 login page 로 보낸다.
      next('/admin/login');
    }
  }
});

export default router;
