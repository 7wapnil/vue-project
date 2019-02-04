<template>
  <b-navbar
    fixed="top"
    toggleable="lg"
    class="p-0">
    <b-container
      fluid
      style="max-width: 1920px"
      class="p-0">
      <b-navbar-brand
        :to="{ name: 'home' }"
        class="mr-0"/>
      <b-navbar-toggle
        class="mr-2"
        target="collapsableMenu"/>
      <b-collapse
        id="collapsableMenu"
        is-nav>
        <b-navbar-nav id="top-navigation">
          <b-nav-item
            v-for="item in mainMenu"
            :key="item.path"
            :to="item.path"
            class="navbar-menu-item font-weight-bold">
              {{ item.label }}
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav
          v-if="!isLoggedIn"
          style="max-width: 268px"
          class="ml-auto">
          <b-button
            v-b-modal.AuthModal
            variant="arc-secondary"
            class="m-2"
            @mousedown="authTab = 0">
              Login
          </b-button>

          <b-button
            v-b-modal.AuthModal
            variant="arc-primary"
            class="m-2 mr-4"
            @mousedown="authTab = 1">
              Sign Up
          </b-button>
        </b-navbar-nav>
        <b-navbar-nav
          v-if="isLoggedIn"
          class="ml-auto">
          <balances-list/>
          <user-profile-menu/>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
    <auth-modal :tab="authTab"/>
  </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'
import BalancesList from '@/components/navbar/wallet/BalancesList.vue'
import AuthModal from '@/views/auth/AuthModal'
import UserProfileMenu from '@/components/navbar/profile/UserProfileMenu'

export default {
  components: {
    BalancesList,
    AuthModal,
    UserProfileMenu
  },
  data () {
    return {
      mainMenu: [
        {
          path: '/esports',
          label: 'Esport'
        },
        {
          path: '/sports',
          label: 'Sport'
        },
        {
          path: '/live',
          label: 'Live'
        }
      ],
      authTab: 0
    }
  },
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ])
  }
}
</script>
