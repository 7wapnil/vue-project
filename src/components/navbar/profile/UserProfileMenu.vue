<template>
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
    <b-dropdown-item @click="showModal">
      Profile
    </b-dropdown-item>
    <b-dropdown-divider class="border-arc-dropdown-divider m-0"/>

    <b-dropdown-item @click.prevent="logout">
      Logout
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
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
    },
    showModal () {
      this.$root.$emit('bv::show::modal', 'AccountModal')
    }
  }
}
</script>
