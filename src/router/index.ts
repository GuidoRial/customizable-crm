import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import useAuth from '@/store/auth';

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
        component: () => import('@/views/Auth/LoginView.vue'),
        beforeEnter: () => {
          const authStore = useAuth();
          if (authStore?.isLoggedIn) {
            return { name: 'home' };
          }
        },
      },
      {
        name: 'signup',
        path: 'signup',
        component: () => import('@/views/Auth/SignupView.vue'),
        beforeEnter: () => {
          const authStore = useAuth();
          if (authStore?.isLoggedIn) {
            return { name: 'home' };
          }
        },
      },
      {
        name: 'dashboard',
        path: 'dashboard',
        component: () => import('@/views/Dashboard.vue'),
        beforeEnter: () => {
          const authStore = useAuth();
          if (!authStore?.isLoggedIn) {
            return { name: 'login' };
          }
        },
        children: [
          {
            name: 'blueprints',
            path: 'blueprints',
            component: () => import('@/views/Blueprints/Blueprints.vue'),
          },
          {
            name: 'blueprints-create',
            path: 'create',
            component: () => import('@/views/Blueprints/CreateBlueprint.vue'),
          },
          {
            name: 'blueprints-about',
            path: 'about',
            component: () => import('@/views/Blueprints/AboutBlueprints.vue'),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
