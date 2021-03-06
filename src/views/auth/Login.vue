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
        required/>
    </b-form-group>

    <b-form-group
      :label="$i18n.t('auth.signUpForm.password')"
      label-for="signin-password">
      <b-form-input
        id="signin-password"
        :placeholder="$i18n.t('auth.signUpForm.password')"
        v-model="fields.password"
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
      class="mb-4 mt-4"
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
import { getCookie } from '@/helpers/cookies'
import {
  DEPOSIT_TAB_INDEX
} from '@/constants/betslip-settings'

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
    ...mapMutations('tabs', {
      changeTabIndex: 'changeTabIndex',
    }),
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
      this.redirectIfNeeded()
      this.close()
      this.$livechat.setUser(signIn.user)
      this.$livechat.initWidget()
      this.pushGtm(signIn.user)
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
    redirectIfNeeded () {
      if (!this.onSuccessRedirect) return this.$router.push({ name: 'home' })

      if (this.onSuccessRedirect === 'openDeposit') {
        this.changeTabIndex(DEPOSIT_TAB_INDEX)
        // workaround for vue bootstrap rc19 modal bug
        this.$nextTick(() => this.$bvModal.show('AccountModal'))
      } else this.$router.push(this.onSuccessRedirect)
      this.storeSuccessLoginUrl(null)
    },
    done () {
      this.submitting = false
    },
    close () {
      this.$bvModal.hide('AuthModal')
    },
    pushGtm (user) {
      this.$gtm.push({
        'event': 'customerLogin',
        'gaClientID': this.computeGaClientID() || null,
        'customerID': user.id || null
      })
    },
    computeGaClientID () {
      return (getCookie('_ga') || '').substring('GA1.2.'.length)
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
    margin-bottom: 0.5rem;
    & /deep/ label {
      text-transform: uppercase;
      font-size: 0.75rem;
    }
  }
  .invalid-feedback {
    margin-bottom: 8px;
  }
</style>
