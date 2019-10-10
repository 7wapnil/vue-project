<template>
  <div>
    <div v-if="isLoggedIn">
      <account-modal/>
      <account-logout-modal/>
    </div>
    <div v-if="!isLoggedIn">
      <auth-modal/>
    </div>
    <div>
      <connection-modal/>
      <page-leave-modal/>
    </div>
  </div>
</template>

<script>
import AccountModal from '@/views/account/AccountModal'
import AccountLogoutModal from '@/views/account/AccountLogoutModal'
import AuthModal from '@/views/auth/AuthModal'
import ConnectionModal from '@/views/layouts/common/ConnectionModal'
import { mapGetters } from 'vuex'

export default {
  components: {
    AccountModal,
    AccountLogoutModal,
    AuthModal,
    ConnectionModal,
    'PageLeaveModal': () => import(/* webpackChunkName: "PageLeaveModal" */ '@/views/event/PageLeaveModal')
  },
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ])
  }
}
</script>
