<template>
  <div>
    <b-nav-item-dropdown
      v-if="isLoggedIn && user"
      class="nav-profile-button"
      no-caret
      right>
      <template slot="button-content">
        <b-btn
          variant="arc-secondary"
          class="arc-profile-button p-0"/>
      </template>
      <b-dropdown-item v-b-modal.AccountModal>
        Profile
      </b-dropdown-item>

      <b-dropdown-divider/>

      <b-dropdown-item @click.prevent="logout">
        Logout
      </b-dropdown-item>
    </b-nav-item-dropdown>
    <account-modal/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AccountModal from '@/views/account/AccountModal'

export default {
  components: {
    AccountModal
  },
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ]),
    ...mapGetters({
      user: 'getUser'
    })
  },
  methods: {
    ...mapActions({
      dispatchLogout: 'logout'
    }),
    logout () {
      this.dispatchLogout(this)
      this.$noty.success('Signed out successfully')
    }
  }
}
</script>
