import Vue from 'vue';
import VueRouter from 'vue-router';
import RegisterQnA from '@/app/qna/RegisterQnAView.vue';
import ListQnAView from '@/app/qna/ListQnAView.vue';
import DetailQnAView from '@/app/qna/DetailQnAView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/qna',
    name: 'View',
    redirect: '/qna/view'
  },
  {
    path: '/qna/register',
    name: 'Q&A Register Page',
    component: RegisterQnA
  },
  {
    path: '/qna/view',
    name: 'Q&A List Page',
    component: ListQnAView
  },
  {
    path: '/qna/view/:id',
    name: 'Q&A Detail Page',
    component: DetailQnAView,
    props: true
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
