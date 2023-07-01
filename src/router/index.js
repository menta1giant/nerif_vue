import { createRouter, createWebHistory } from 'vue-router';
import SearchInput from '@/components/SearchInput';

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      isInMainNavigation: true,
      icon: "home"
    },
    component: () => import(/* webpackChunkName: "landing" */ '../views/HomeView.vue')
  },
  {
    path: '/matches',
    name: 'Matches',
    meta: {
      isInMainNavigation: true,
      icon: "gamepad"
    },
    component: () => import(/* webpackChunkName: "matches" */ '../views/MatchesView.vue')
  },
  {
    path: '/dashboards',
    name: 'Dashboards',
    meta: {
      isInMainNavigation: true,
      icon: "chart-simple"
    },
    component: () => import(/* webpackChunkName: "dashboards" */ '../views/DashboardsView.vue')
  },
  {
    path: '/legal',
    name: 'Legal',
    meta: {
      hasBreadcrumbs: true,
      breadcrumbsSlot: SearchInput,
    },
    component: () => import(/* webpackChunkName: "landing" */ '../views/LegalView.vue')
  },
  {
    path: '/documentation',
    name: 'Documentation',
    meta: {
      hasBreadcrumbs: true,
      breadcrumbsSlot: SearchInput,
    },
    component: () => import(/* webpackChunkName: "landing" */ '../views/DocumentationView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
