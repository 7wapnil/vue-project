<template>
  <div v-if="isLoggedIn">
    <account-modal/>
    <account-logout-modal/>
  </div>
</template>

<script>
import AccountModal from '@/views/account/AccountModal'
import AccountLogoutModal from '@/views/account/AccountLogoutModal'
import { mapGetters } from 'vuex'

export default {
  components: {
    AccountModal,
    AccountLogoutModal
  },
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ])
  },
}
</script>
