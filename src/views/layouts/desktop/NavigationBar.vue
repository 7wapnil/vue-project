<template>
  <b-navbar
    fixed="top"
    class="navbar-desktop">
    <b-container class="navbar-desktop-inner">
      <b-navbar-brand
        :to="{ name: 'home' }"
        class="navbar-brand-desktop">
        <img
          :src="require(`@/assets/images/logo/arcanebet-logo.svg`)"
          alt="arcanebet-logo">
      </b-navbar-brand>
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
          variant="arc-secondary"
          class="m-2"
          @click="showAuthModal(0)">
          Login
        </b-button>

        <b-button
          variant="arc-primary"
          class="m-2 mr-4"
          @click="showAuthModal(1)">
          Sign Up
        </b-button>
      </b-navbar-nav>
      <b-navbar-nav
        v-if="isLoggedIn"
        class="ml-auto">
        <balances-list/>
        <user-profile-menu/>
      </b-navbar-nav>

    </b-container>
  </b-navbar>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
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
          label: this.$i18n.t('homePage.esport')
        },
        {
          path: '/sports',
          label: this.$i18n.t('homePage.sport')
        }
      ],
      authTab: 0
    }
  },
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ])
  },
  methods: {
    ...mapMutations([
      'updateAuth'
    ]),
    showAuthModal (auth) {
      this.updateAuth(auth)
    }
  }
}
</script>
