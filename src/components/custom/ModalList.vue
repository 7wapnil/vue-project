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
    </div>
  </div>
</template>

<script>
import AccountModal from '@/views/account/AccountModal'
import AccountLogoutModal from '@/views/account/AccountLogoutModal'
import AuthModal from '@/views/auth/AuthModal'
import ConnectionModal from '@/views/layouts/mobile/ConnectionModal'
import { mapGetters } from 'vuex'

export default {
  components: {
    AccountModal,
    AccountLogoutModal,
    AuthModal,
    ConnectionModal
  },
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ])
  }
}
</script>
