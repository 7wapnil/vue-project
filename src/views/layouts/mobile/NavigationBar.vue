<template>
  <b-navbar
    fixed="top"
    class="navbar-mobile">
    <b-row
      no-gutters
      class="w-100 h-100">
      <b-col
        class="navbar-mobile-burger-section d-flex align-items-center justify-content-start"
        @click="$emit('burger-clicked')">
        <icon
          name="sidebar-menu"
          color="arc-clr-white"
          size="20px"/>
      </b-col>
      <b-col class="navbar-brand-mobile d-flex align-items-center justify-content-center">
        <b-navbar-brand
          :to="{ name: 'home' }"
          class="mb-1">
          <img :src="require(`@/assets/images/logo/arcanebet-logo-mobile.svg`)">
        </b-navbar-brand>
      </b-col>
      <b-col class="navbar-mobile-profile-section">
        <div
          v-if="isLoggedIn"
          class="h-100 w-100 d-flex align-items-center justify-content-end"
          @click="$emit('user-profile-clicked')">
          <b-button variant="arc-profile-button-mobile"/>
        </div>
      </b-col>
    </b-row>
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
