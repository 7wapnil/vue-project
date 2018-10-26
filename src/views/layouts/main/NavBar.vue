<template>
  <b-navbar
    toggleable="md"
    type="dark"
    class="py-md-0">
    <b-navbar-brand
      href="/"
      tag="h1">
      ArcaneBet
    </b-navbar-brand>
    <b-navbar-toggle target="collapsableMenu"/>
    <b-collapse
      id="collapsableMenu"
      is-nav>
      <b-navbar-nav id="top-navigation">
        <b-nav-item
          v-for="item in mainMenu"
          :key="item.path"
          :to="item.path">
          {{ item.label }}
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav
        v-if="!isLoggedIn"
        class="ml-auto">
        <b-button
          :to="{ name: 'sign-in' }"
          variant="outline-warning"
          class="m-2">
          Login
        </b-button>
        <b-button
          :to="{ name: 'sign-up' }"
          variant="warning"
          class="m-2">
          Sign Up
        </b-button>
      </b-navbar-nav>
      <b-navbar-nav
        v-if="isLoggedIn && user"
        class="ml-auto">
        <balances-list v-if="isLoggedIn"/>
        <b-dropdown
          id="username-dropdown"
          :text="`${user.username}`"
          class="ml-2"
          variant="warning"
          right>
          <b-dropdown-item :to="{ name: 'account' }">
            Profile
          </b-dropdown-item>
          <b-dropdown-divider/>
          <b-dropdown-item @click.prevent="logout">
            Logout
          </b-dropdown-item>
        </b-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BalancesList from '@/components/custom/BalancesList.vue'

export default {
  components: {
    BalancesList
  },
  data () {
    return {
      mainMenu: [{
        path: '/esports',
        label: 'ESPORTS'
      }, {
        path: '/live',
        label: 'LIVE'
      }, {
        path: '/outright',
        label: 'OUTRIGHTS'
      }, {
        path: '/sports',
        label: 'SPORTS'
      }]
    }
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
