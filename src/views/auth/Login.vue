<template>
  <b-form
    novalidate
    @submit.prevent="submit">
    <b-form-group>
      <b-form-input
        v-model="fields.login"
        placeholder="Username"
        autocomplete="username"
        class="mb-4"
        required/>
      <b-form-input
        v-model="fields.password"
        class="mb-4"
        autocomplete="current-password"
        placeholder="Password"
        type="password"
        required/>
    </b-form-group>
    <b-row
      v-if="isSuspicious"
      no-gutters>
      <b-col align="center">
        <vue-recaptcha
          ref="recaptcha"
          :sitekey="recaptchaSiteKey"
          class="mb-3"
          theme="dark"
          @verify="onCaptchaVerified"
          @expired="resetCaptcha"/>
        <b-alert
          v-if="isCaptchaMissing"
          variant="danger">
          Please, pass Captcha verification!
        </b-alert>
      </b-col>
    </b-row>
    <b-form-invalid-feedback :state="isRequestSuccessful">
      {{ feedback }}
    </b-form-invalid-feedback>
    <b-button
      :disabled="isSubmitDisabled"
      class="mb-3"
      type="submit"
      variant="user-profile-button"
      block>
      Sign in
    </b-button>
    <b-row no-gutters>
      <b-col align="center">
        <b-link class="font-size-14 letter-spacing-2 text-arc-clr-iron">
          Forgot your password? Recover it here
        </b-link>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
import { mapGetters, mapActions } from 'vuex'
import wallets from '@/mixins/wallets'

export default {
  components: {
    VueRecaptcha
  },
  mixins: [wallets],
  data () {
    return {
      feedback: '',
      fields: {
        login: '',
        password: '',
        captcha: null
      },
      recaptchaSiteKey: process.env.VUE_APP_RECAPTCHA_SITE_KEY,
      submitting: false,
      isCaptchaMissing: false,
      isRequestSuccessful: null
    }
  },
  computed: {
    ...mapGetters({
      isSuspicious: 'isSuspicious',
      lastLogin: 'getLastLogin'
    }),
    isSubmitDisabled () {
      const hasLength = !!(this.fields.login && this.fields.password)
      return !hasLength && !this.isCaptchaMissing && !this.submitting
    }
  },
  methods: {
    isCaptchaEmpty () {
      return this.isSuspicious && this.fields.captcha === ''
    },
    onCaptchaVerified (token) {
      this.fields.captcha = token
      this.isCaptchaMissing = false
    },
    resetCaptcha () {
      this.$refs.recaptcha.reset()
      this.fields.captcha = null
    },
    submit () {
      if (this.isCaptchaEmpty()) {
        this.isCaptchaMissing = true
        return
      }
      this.submitting = true

      if (this.lastLogin !== this.fields.login) { this.removeCaptcha() }

      this.authenticate(this.fields)
        .then(this.onSuccess)
        .catch(this.onError)
        .finally(this.done)
    },
    removeCaptcha () {
      this.fields.captcha = null
    },
    onSuccess ({ data: { signIn } }) {
      this.login(signIn)
      this.fetchWallets()
      this.$noty.success('Signed in successfully')
      this.$router.push({ name: 'home' })
      this.$livechat.setUser(signIn.user)
      this.$livechat.initWidget()
      this.close()
    },
    onError (err) {
      if (!err.graphQLErrors && err.graphQLErrors.length) return
      this.feedback = err.graphQLErrors[0].message
      this.isRequestSuccessful = false
      this.rejectLogin({ login: this.fields.login })
        .then(() => {
          if (this.isSuspicious) this.resetCaptcha()
        })
    },
    done () {
      this.submitting = false
    },
    close () {
      this.$root.$emit('bv::hide::modal', 'AuthModal')
    },
    ...mapActions([
      'authenticate',
      'login',
      'rejectLogin'
    ])
  }
}
</script>
