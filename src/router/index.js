import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      icon: "home"
    },
    component: () => import(/* webpackChunkName: "landing" */ '../views/HomeView.vue')
  },
  {
    path: '/matches',
    name: 'Matches',
    meta: {
      icon: "gamepad"
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "matches" */ '../views/MatchesView.vue')
  },
  {
    path: '/dashboards',
    name: 'Dashboards',
    meta: {
      icon: "chart-simple"
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "dashboards" */ '../views/DashboardsView.vue')
  },
  {
    path: '/legal',
    name: 'Legal',
    meta: {
      icon: "chart-simple"
    },
    component: () => import(/* webpackChunkName: "landing" */ '../views/LegalView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
