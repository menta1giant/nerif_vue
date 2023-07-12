import { createRouter, createWebHistory } from 'vue-router';
import SearchInput from '@/components/SearchInput';

const routes = [
  {
    path: '/home/',
    name: 'Home',
    meta: {
      isInMainNavigation: true,
      icon: "home"
    },
    children: [
      {
        path: '/',
        name: '',
        component: () => import(/* webpackChunkName: "landing" */ '../views/HomeView.vue')
      }
    ],
    component: () => import(/* webpackChunkName: "landing" */ '../views/HomeView.vue')
  },
  {
    path: '/matches/',
    name: 'Matches',
    meta: {
      isInMainNavigation: true,
      icon: "gamepad"
    },
    children: [
      {
        path: ':date?',
        name: '',
        component: () => import(/* webpackChunkName: "matches" */ '../views/MatchesView.vue')
      }
    ],
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
    meta: {},
    children: [
      {
        path: '',
        name: 'Documentation',
        meta: {
          hasBreadcrumbs: true,
          breadcrumbsSlot: SearchInput,
        },
        component: () => import(/* webpackChunkName: "documentation" */ '@/components/Documentation/DocumentationRoot.vue'),
      },
      {
        path: ':id',
        name: 'Documentation article',
        meta: {
          hasBreadcrumbs: true,
          isCustomBreadcrumbsTitle: true,
        },
        component: () => import(/* webpackChunkName: "documentation" */ '@/components/Documentation/DocumentationArticle.vue'),
      }
    ],
    component: () => import(/* webpackChunkName: "documentation" */ '../views/DocumentationView.vue')
  },
  {
    path: '/profile',
    name: 'Profile settings',
    meta: {
      hasBreadcrumbs: true,
    },
    children: [
      {
        path: 'personal',
        name: 'Personal info',
        meta: {
          hasBreadcrumbs: true,
        },
        component: () => import(/* webpackChunkName: "profile" */ '@/components/Profile/Forms/PersonalInfoForm.vue'),
      },
      {
        path: 'password',
        name: 'Password and security',
        meta: {
          hasBreadcrumbs: true,
        },
        component: () => import(/* webpackChunkName: "profile" */ '@/components/Profile/Forms/PasswordForm.vue'),
      },
      {
        path: 'payment',
        name: 'Payment info',
        meta: {
          hasBreadcrumbs: true,
        },
        component: () => import(/* webpackChunkName: "profile" */ '@/components/Profile/Forms/PaymentInfoForm.vue'),
      },
      {
        path: 'localization',
        name: 'Localization',
        meta: {
          hasBreadcrumbs: true,
        },
        component: () => import(/* webpackChunkName: "profile" */ '@/components/Profile/Forms/LocalizationForm.vue'),
      },
      {
        path: 'notifications',
        name: 'Notifications',
        meta: {
          hasBreadcrumbs: true,
        },
        component: () => import(/* webpackChunkName: "profile" */ '@/components/Profile/Forms/NotificationsForm.vue'),
      },
    ],
    redirect: () => {
      return '/profile/personal'
    },
    component: () => import(/* webpackChunkName: "profile" */ '../views/ProfileView.vue')
  },
  {
    path: '/sign-up',
    name: 'Registration',
    meta: {},
    component: () => import(/* webpackChunkName: "registration" */ '../views/RegistrationView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {},
    component: () => import(/* webpackChunkName: "registration" */ '../views/LoginView.vue')
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
    meta: {},
    children: [
      {
        path: '',
        name: 'Blog',
        meta: {
          hasBreadcrumbs: true,
          breadcrumbsSlot: SearchInput,
        },
        component: () => import(/* webpackChunkName: "blog" */ '@/components/Blog/BlogRoot.vue'),
      },
      {
        path: ':id',
        name: 'post',
        meta: {
          hasBreadcrumbs: true,
          isCustomBreadcrumbsTitle: true,
        },
        component: () => import(/* webpackChunkName: "blog" */ '@/components/Blog/BlogPost.vue'),
      }
    ],
    component: () => import(/* webpackChunkName: "blog" */ '../views/BlogView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Page not found',
    meta: {},
    component: () => import(/* webpackChunkName: "other" */ '../views/PageNotFoundView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, from) => {
  console.log({ from, to });
})

export default router
