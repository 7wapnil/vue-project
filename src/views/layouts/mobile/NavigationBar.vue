<template>
  <b-navbar
    fixed="top"
    class="navbar-mobile">
    <b-navbar-nav class="mr-auto">
      <icon
        name="sidebar-menu"
        color="arc-clr-white"
        size="20px"/>
    </b-navbar-nav>
    <b-navbar-brand
      :to="{ name: 'home' }"
      class="navbar-brand-mobile">
      <img
        :src="require(`@/assets/images/logo/arcanebet-logo-mobile.svg`)"
        alt="arcanebet-logo">
    </b-navbar-brand>
    <b-navbar-nav
      v-if="isLoggedIn"
      class="ml-auto">
      <b-button variant="arc-profile-button-mobile"/>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'
import UserProfileMenu from '@/components/navbar/profile/UserProfileMenu'

export default {
  components: {
    UserProfileMenu
  },
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ])
  }
}
</script>
