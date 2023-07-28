import { createRouter, createWebHistory } from 'vue-router';
import SearchInput from '@/components/SearchInput';
import store from '../store';
import { setMetaData } from '@/lib/meta';
import { finishPageLoading } from '@/lib/loading';

const routes = [
  {
    path: '/home/',
    name: 'Home',
    meta: {
      isInMainNavigation: true,
      icon: "home",
      description: 'Landing page for Nerif - the most advanced CS:GO predicting algorithm.'
    },
    children: [
      {
        path: '/',
        name: 'root',
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
      icon: "gamepad",
      description: 'Matches, predicted by Nerif, and Telegram feed with opinions from revered CS:GO cappers.',
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
      icon: "chart-simple",
      description: 'Dashboards page, concise analysis of Nerif\'s algorithm performance.',
    },
    component: () => import(/* webpackChunkName: "dashboards" */ '../views/DashboardsView.vue')
  },
  {
    path: '/legal',
    name: 'Legal',
    meta: {
      hasBreadcrumbs: true,
      description: 'Nerif legal documents.'
    },
    component: () => import(/* webpackChunkName: "landing" */ '../views/LegalView.vue')
  },
  {
    path: '/documentation',
    name: 'Documentation',
    meta: {
      description: 'Nerif documentation, written guide on how to use Nerif and profit from the platform.',
    },
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
      requiresAuth: true,
      description: 'Nerif profile settings.'
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
    meta: {
      requiresGuest: true,
      description: 'Sign up to Nerif to get rich quickly!',
    },
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
      description: 'Nerif customer service page. We offer multiple ways of communication, so that you, our dear clients, could get the best assistance!',
    },
    component: () => import(/* webpackChunkName: "landing" */ '../views/HelpCenterView.vue')
  },
  {
    path: '/blog',
    name: 'Blog',
    meta: {
      description: 'Nerif blog with all the latest news and updates from the greatest CS:GO predictions algorithm.'
    },
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
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, top: 112, }
    }
    return savedPosition || { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  finishPageLoading();

  setMetaData({
    title: to.matched.find(route => route.name)?.name,
    description: to.meta.description,
  })

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.getIsUserAuthenticated) {
      next({ path: '/', query: { 'log-in': 1 } })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.getters.getIsUserAuthenticated) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
