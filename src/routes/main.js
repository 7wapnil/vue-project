import EventsList from '@/views/events-list/Page.vue'
import CategoryPage from '@/views/events-list/CategoryPage.vue'
import TournamentPage from '@/views/events-list/TournamentPage.vue'
import Affiliates from '@/views/information-pages/affiliates/main/Page'
import Promotions from '@/views/information-pages/promotions/main/Page'

export default [
  {
    path: 'promotions',
    component: () => import('@/views/layouts/information-page/Content'),
    children: [
      {
        path: '',
        name: 'Promotions',
        component: Promotions
      }
    ]
  },
  {
    path: ':titleKind',
    component: () => import('@/views/layouts/common/Content'),
    beforeEnter: (to, from, next) => {
      const isKindSupported = to.params.titleKind === 'esports' || to.params.titleKind === 'sports'

      isKindSupported ? next() : next({ name: 'NotFound' })
    },
    children: [
      {
        path: '',
        name: 'title-kind',
        component: EventsList
      },
      {
        path: 'title/:titleId',
        name: 'title',
        component: EventsList
      },
      {
        path: 'title/:titleId/tour/:tournamentId',
        name: 'tournament',
        component: TournamentPage
      },
      {
        path: 'title/:titleId/category/:categoryId/',
        name: 'category-tournaments',
        component: CategoryPage
      },
      {
        path: 'event/:id',
        name: 'event',
        component: () => import('@/views/event/Page'),
        props: true
      },
    ]
  },
  {
    path: 'email_verification/:token',
    name: 'email_verification',
    component: () => import('@/views/auth/EmailVerification')
  },
  {
    path: 'impersonate/:token',
    name: 'impersonation',
    component: () => import('@/views/auth/Impersonation')
  },
  {
    path: 'affiliates',
    component: () => import('@/views/layouts/information-page/Content'),
    children: [
      {
        path: '',
        name: 'affiliates',
        component: Affiliates
      }
    ]
  }
]
