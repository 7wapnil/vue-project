<template>
  <modal
    id="AuthModal"
    :lazy="false"
    title="Welcome to ArcaneBet"
    title-tag="h4"
    v-model="modalVisible"
    header-class="header">
    <b-card
      no-body
      bg-variant="arc-clr-soil-dark">
      <b-tabs
        v-model="auth"
        content-class="content">
        <b-tab
          :title-link-class="changeStyleTab(0)"
          title-item-class="w-50 text-center"
          title="Sign in">
          <login
            modal-name="AuthModal"
            @tab-changed="changeTab"/>
        </b-tab>
        <b-tab
          :title-link-class="changeStyleTab(1)"
          title-item-class="w-50 text-center"
          title="Sign up">
          <sign-up
            modal-name="AuthModal"
            @tab-changed="changeTab"/>
        </b-tab>
      </b-tabs>
    </b-card>
  </modal>
</template>

<script>
import Login from './Login'
import SignUp from './SignUp'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    SignUp,
    Login
  },
  created () {
    if (this.$route.query.auth !== undefined) {
      this.updateAuth(this.$route.query.auth)
    }
  },
  computed: {
    ...mapGetters([
      'auth'
    ]),
    modalVisible: {
      get () {
        return this.auth !== null
      },
      set (value) {
        if(!value) { this.updateAuth(null) }
      }
    }
  },
  methods: {
    ...mapMutations([
      'updateAuth'
    ]),
    changeStyleTab (index) {
      if (this.tabIndex === index) {
        return 'authActiveTab'
      } else {
        return 'authTab'
      }
    },
    changeTab (tab) {
      this.updateAuth(tab)
    }
  }
}
</script>
