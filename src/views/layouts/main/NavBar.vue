<template>
  <b-navbar
    fixed="top"
    toggleable="lg"
    type="dark"
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
            class="navbar-menu-item"
            active-class="nav-item-active">
            <h6 class="m-0 font-weight-bold text-arc-clr-iron-light">
              {{ item.label }}
            </h6>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav
          v-if="!isLoggedIn"
          style="max-width: 268px"
          class="ml-auto">
          <b-btn
            v-b-modal.AuthModal
            variant="arc-secondary"
            class="m-2"
            @mousedown="authTab = 0">
            <h6 class="m-0 font-weight-bold">
              Login
            </h6>
          </b-btn>

          <b-btn
            v-b-modal.AuthModal
            variant="arc-primary"
            class="m-2 mr-4"
            @mousedown="authTab = 1">
            <h6 class="m-0 font-weight-bold">
              Sign Up
            </h6>
          </b-btn>
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
