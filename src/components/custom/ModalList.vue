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
      <unavailable-country-modal/>
      <game-mode-modal/>
    </div>
  </div>
</template>

<script>
import AccountModal from '@/views/account/AccountModal'
import AccountLogoutModal from '@/views/account/AccountLogoutModal'
import AuthModal from '@/views/auth/AuthModal'
import ConnectionModal from '@/views/layouts/common/ConnectionModal'
import UnavailableCountryModal from '@/views/casino/modals/UnavailableCountryModal'
import GameModeModal from '@/views/casino/modals/GameModeModal'
import { mapGetters } from 'vuex'

export default {
  components: {
    AccountModal,
    AccountLogoutModal,
    AuthModal,
    ConnectionModal,
    UnavailableCountryModal,
    GameModeModal
  },
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ])
  }
}
</script>
