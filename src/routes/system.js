import PasswordRecoveryPage from '@/views/auth/PasswordResetForm'
import EmailVerificationPage from '@/views/auth/EmailVerification'
import ImpersonatePage from '@/views/auth/Impersonation'
import NotFound from '@/views/layouts/common/NotFound'

export default [
  {
    path: 'reset_password/:token',
    name: 'reset_password',
    components: {
      content: PasswordRecoveryPage,
    }
  },
  {
    path: 'email_verification/:token',
    name: 'email_verification',
    components: {
      content: EmailVerificationPage,
    }
  },
  {
    path: 'impersonate/:token',
    name: 'impersonation',
    components: {
      content: ImpersonatePage,
    }
  },
  {
    path: '*',
    name: 'not-found',
    components: {
      content: NotFound,
    }
  }
]
