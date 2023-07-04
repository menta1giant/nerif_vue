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
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      hasBreadcrumbs: true,
    },
    component: () => import(/* webpackChunkName: "profile" */ '../views/ProfileView.vue')
  },
  {
    path: '/sign-up',
    name: 'Registration',
    meta: {},
    component: () => import(/* webpackChunkName: "profile" */ '../views/RegistrationView.vue')
  },
  {
    path: '/help-center',
    name: 'Help Center',
    meta: {
      hasBreadcrumbs: true,
    },
    component: () => import(/* webpackChunkName: "landing" */ '../views/HelpCenterView.vue')
  },
  {
    path: '/blog',
    name: 'Blog',
    meta: {
      hasBreadcrumbs: true,
      breadcrumbsSlot: SearchInput,
    },
    component: () => import(/* webpackChunkName: "landing" */ '../views/BlogView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
