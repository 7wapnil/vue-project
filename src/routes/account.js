import Account from '@/views/account/Account.vue'
import UploadForm from '@/views/account/UploadForm.vue'
import NotImplemented from '@/views/account/NotImplemented.vue'

export default [
  {
    path: '',
    label: 'Account',
    name: 'account',
    component: Account
  },
  {
    path: 'activity',
    label: 'Activity',
    name: 'activity',
    component: NotImplemented
  }, {
    path: 'deposit',
    label: 'Deposit funds',
    name: 'deposit',
    component: NotImplemented
  }, {
    path: 'withdraw',
    label: 'Withdraw funds',
    name: 'withdraw',
    component: NotImplemented
  }, {
    path: 'verification',
    label: 'Account verification',
    name: 'verification',
    component: UploadForm
  },
]
