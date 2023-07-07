import { createRouter, createWebHistory } from 'vue-router';
import SearchInput from '@/components/SearchInput';
import DocumentationRoot from '@/components/Documentation/DocumentationRoot';
import DocumentationArticle from '@/components/Documentation/DocumentationArticle';
import BlogRoot from '@/components/Blog/BlogRoot';
import BlogPost from '@/components/Blog/BlogPost';
import PersonalInfoForm from '@/components/Profile/Forms/PersonalInfoForm';
import PasswordForm from '@/components/Profile/Forms/PasswordForm';
import PaymentInfoForm from '@/components/Profile/Forms/PaymentInfoForm';
import LocalizationForm from '@/components/Profile/Forms/LocalizationForm';
import NotificationsForm from '@/components/Profile/Forms/NotificationsForm';

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
    meta: {},
    children: [
      {
        path: '',
        name: 'Documentation',
        meta: {
          hasBreadcrumbs: true,
          breadcrumbsSlot: SearchInput,
        },
        component: DocumentationRoot,
      },
      {
        path: ':id',
        name: 'Documentation article',
        meta: {
          hasBreadcrumbs: true,
          isCustomBreadcrumbsTitle: true,
        },
        component: DocumentationArticle,
      }
    ],
    component: () => import(/* webpackChunkName: "landing" */ '../views/DocumentationView.vue')
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
        component: PersonalInfoForm,
      },
      {
        path: 'password',
        name: 'Password and security',
        meta: {
          hasBreadcrumbs: true,
        },
        component: PasswordForm,
      },
      {
        path: 'payment',
        name: 'Payment info',
        meta: {
          hasBreadcrumbs: true,
        },
        component: PaymentInfoForm,
      },
      {
        path: 'localization',
        name: 'Localization',
        meta: {
          hasBreadcrumbs: true,
        },
        component: LocalizationForm,
      },
      {
        path: 'notifications',
        name: 'Notifications',
        meta: {
          hasBreadcrumbs: true,
        },
        component: NotificationsForm,
      },
    ],
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
    meta: {},
    children: [
      {
        path: '',
        name: 'Blog',
        meta: {
          hasBreadcrumbs: true,
          breadcrumbsSlot: SearchInput,
        },
        component: BlogRoot,
      },
      {
        path: ':id',
        name: 'post',
        meta: {
          hasBreadcrumbs: true,
          isCustomBreadcrumbsTitle: true,
        },
        component: BlogPost,
      }
    ],
    component: () => import(/* webpackChunkName: "landing" */ '../views/BlogView.vue')
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
  routes
})

router.beforeEach((to, from) => {
  console.log(from);
})

export default router
