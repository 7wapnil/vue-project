import Affiliates from '@/views/information-pages/affiliates/main/Page'

export default [
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
