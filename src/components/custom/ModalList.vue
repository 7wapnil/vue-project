<template>
  <div v-if="isLoggedIn">
    <account-modal/>
  </div>
</template>

<script>
import AccountModal from '@/views/account/AccountModal'
import { mapGetters } from 'vuex'

export default {
  components: {
    AccountModal
  },
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ])
  },
}
</script>
