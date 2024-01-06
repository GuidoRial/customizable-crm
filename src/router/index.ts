import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import useAuth from '@/store/auth';
// import useAuth from '@/store/auth';

const routes: Array<RouteRecordRaw> = [
  {
    name: 'app',
    path: '/',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        name: 'home',
        path: '',
        component: HomeView,
      },
      {
        name: 'login',
        path: 'login',
        component: () => import('@/views/LoginView.vue'),
        beforeEnter: (to, from) => {
          const authStore = useAuth();
          if (authStore?.isLoggedIn) {
            return { name: 'home' };
          }
        },
      },
      {
        name: 'signup',
        path: 'signup',
        component: () => import('@/views/SignupView.vue'),
        beforeEnter: (to, from) => {
          const authStore = useAuth();
          if (authStore?.isLoggedIn) {
            return { name: 'home' };
          }
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
