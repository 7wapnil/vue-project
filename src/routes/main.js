import EventsPage from '@/views/events-list/Page.vue'
import TournamentPage from '@/views/events-list/TournamentPage.vue'

export default [
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
        component: EventsPage
      },
      {
        path: 'title/:titleId',
        name: 'title',
        component: EventsPage
      },
      {
        path: 'title/:titleId/tour/:tournamentId',
        name: 'tournament',
        component: TournamentPage
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
    path: 'reset_password/:token',
    name: 'reset_password',
    component: () => import('@/views/auth/PasswordResetForm')
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
  }
]
