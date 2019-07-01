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
        <component :is="formType"/>
        <b-row no-gutters>
          <b-col align="center">
            <b-link
              v-if="isLogin"
              class="font-size-14 letter-spacing-2 text-arc-clr-iron"
              @click="openPasswordResetRequestForm()">
              {{ $t('userModal.forgotPasswordCta') }}
            </b-link>
            <b-link
              v-if="isResetRequestForm"
              class="font-size-14 letter-spacing-2 text-arc-clr-iron"
              @click="openLoginForm()">
              {{ $t('userModal.back') }}
            </b-link>
            <b-link
              v-if="isPasswordResetForm"
              class="font-size-14 letter-spacing-2 text-arc-clr-iron"
              @click="openPasswordResetRequestForm()">
              {{ $t('userModal.backToPasswordRequestForm') }}
            </b-link>
          </b-col>
        </b-row>
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
import PasswordResetRequest from './PasswordResetRequest'
import PasswordResetForm from './PasswordResetForm'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    SignUp,
    Login,
    PasswordResetRequest,
    PasswordResetForm
  },
  data () {
    return {
      formType: Login
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
        if (!value) {
          this.updateAuth(null)
        }
      }
    },
    isLogin () {
      return this.formType === Login
    },
    isPasswordResetForm () {
      return this.formType === PasswordResetForm
    },
    isResetRequestForm () {
      return this.formType === PasswordResetRequest
    }
  },
  created () {
    if (this.$route.query.auth !== undefined) {
      this.updateAuth(this.$route.query.auth)
    }
    if (this.$route.query.resetPassword) {
      this.openResetPasswordForm()
    }
  },
  methods: {
    ...mapMutations([
      'updateAuth'
    ]),
    openPasswordResetRequestForm () {
      this.formType = PasswordResetRequest
    },
    openLoginForm () {
      this.formType = Login
    },
    openResetPasswordForm () {
      this.formType = PasswordResetForm
    }
  }
}
</script>
