<template>
  <b-form
    novalidate
    @submit.prevent="submit">
    <b-form-group
      :label="$i18n.t('auth.signUpForm.username')"
      label-for="signin-username">
      <b-form-input
        id="signin-username"
        :placeholder="$i18n.t('auth.signUpForm.username')"
        v-model="fields.login"
        autocomplete="username"
        class="mb-4"
        required/>
    </b-form-group>

    <b-form-group
      :label="$i18n.t('auth.signUpForm.password')"
      label-for="signin-password">
      <b-form-input
        id="signin-password"
        :placeholder="$i18n.t('auth.signUpForm.password')"
        v-model="fields.password"
        class="mb-4"
        autocomplete="current-password"
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
  </b-form>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    VueRecaptcha
  },
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
      isRequestSuccessful: null
    }
  },
  computed: {
    ...mapGetters({
      isSuspicious: 'isSuspicious',
      lastLogin: 'getLastLogin',
      onSuccessRedirect: 'getSuccessLoginUrl',
    }),
    ...mapMutations(['storeSuccessLoginUrl']),
    isSubmitDisabled () {
      const hasLength = !!(this.fields.login && this.fields.password)
      return !hasLength || (this.isSuspicious && !this.fields.captcha) || this.submitting
    }
  },
  methods: {
    onCaptchaVerified (token) {
      this.fields.captcha = token
    },
    resetCaptcha () {
      this.$refs.recaptcha.reset()
      this.fields.captcha = null
    },
    submit () {
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
      if (this.onSuccessRedirect) {
        this.$router.push(this.onSuccessRedirect)
        this.storeSuccessLoginUrl(null)
      } else this.$router.push({ name: 'home' })
      this.$livechat.setUser(signIn.user)
      this.$livechat.initWidget()
      this.close()
    },
    onError (err) {
      if (!err.graphQLErrors || !err.graphQLErrors.length) return
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
      this.$bvModal.hide('AuthModal')
    },
    ...mapActions([
      'authenticate',
      'login',
      'rejectLogin'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .form-group {
    & /deep/ label {
      text-transform: uppercase;
      font-size: 0.75rem;
    }
  }
  .invalid-feedback {
    margin-bottom: 8px;
  }
</style>
