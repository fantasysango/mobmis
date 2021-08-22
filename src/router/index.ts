import { createRouter, createWebHashHistory, Router } from 'vue-router';

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/transaction'
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: () => import(/* webpackChunkName: "Transaction" */ '@/views/Transaction/index.vue'),
      children: [
        {
          path: '/transaction/:id',
          component: () => ''
        },
      ]
    }
  ]
});

export default router;
