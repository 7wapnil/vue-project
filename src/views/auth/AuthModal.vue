<template>
  <modal
    id="AuthModal"
    :lazy="false"
    v-model="modalVisible"
    :dialog-class="[ isMobile ? 'auth-modal-dialog-mobile' : '']"
    header-class="auth-modal-header"
    body-class="auth-modal-body">
    <template #modal-header="{ close }">
      <img
        src="~@/assets/images/logo/arcanebet-logo.svg"
        height="20"
        alt="arcanebet-logo">
      <span @click="close">
        <icon
          name="modal-close"
          size="24px"
          color="arc-clr-iron-light"/>
      </span>
    </template>
    <b-tabs
      :value="auth"
      :content-class="[ isMobile ? 'auth-modal-content-mobile' : 'auth-modal-content']"
      justified
      active-tab-class="auth-tabs-active">
      <b-tab
        title-link-class="auth-tabs"
        title="Sign in">
        <login/>
      </b-tab>
      <b-tab
        title-link-class="auth-tabs"
        title="Sign up">
        <sign-up/>
      </b-tab>
    </b-tabs>
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
  computed: {
    ...mapGetters([
      'auth'
    ]),
    modalVisible: {
      get () {
        return this.auth !== null
      },
      set (value) {
        if (!value) {
          this.updateAuth(null)
        }
      }
    }
  },
  created () {
    if (this.$route.query.auth !== undefined) {
      this.updateAuth(this.$route.query.auth)
    }
  },
  methods: {
    ...mapMutations([
      'updateAuth'
    ])
  }
}
</script>
