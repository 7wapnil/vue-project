<template>
  <form @submit.prevent="submit">
    <b-row no-gutters>
      <b-col
        sm="3"
        align="right"
        class="mt-2 mr-3">
        <label for="login-username">
          Username
        </label>
      </b-col>
      <b-col cols="6">
        <b-form-input
          id="login-username"
          v-model="fields.login"
          :state="getState('login')"
          type="text"
          aria-describedby="inputFeedbackUser"
          required/>
        <b-form-invalid-feedback
          id="inputFeedbackUser"
          :invalid-feedback="errors.username"/>
      </b-col>
    </b-row>
    <b-row
      class="mt-4"
      no-gutters>
      <b-col
        sm="3"
        align="right"
        class="mt-2 mr-3">
        <label for="login-password">
          Password
        </label>
      </b-col>
      <b-col cols="6">
        <b-form-input
          id="login-password"
          v-model="fields.password"
          :state="getState('password')"
          type="password"
          aria-describedby="inputFeedbackPassword"
          required/>
        <b-form-invalid-feedback
          id="inputFeedbackPassword"
          :invalid-feedback="errors.password"/>
      </b-col>
    </b-row>
    <b-row
      v-if="isSuspectedLogin"
      class="mt-4"
      no-gutters>
      <b-col
        sm="3"
        align="right"
        class="mt-2 mr-3">
        <label for="captcha">
          Captcha
        </label>
      </b-col>
      <b-col cols="6">
        <vue-recaptcha
          ref="recaptcha"
          :sitekey="recaptchaSiteKey"
          theme="dark"
          @verify="onCaptchaVerified"
          @expired="resetCaptcha"/>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col
        cols="6"
        class="mr-auto ml-auto">
        <b-button
          :disabled="submitting"
          class="my-4 ml-3"
          block
          type="submit">
          Sign in
        </b-button>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col align="center">
        <b-link @click="$emit('tab-changed', 1)">
          Have no account yet? Sign up here
        </b-link>
      </b-col>
    </b-row>
  </form>
</template>

<script>
import formsMixin from '@/mixins/forms'
import VueRecaptcha from 'vue-recaptcha'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { VueRecaptcha },
  mixins: [formsMixin],
  props: {
    modalName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      fields: {
        login: '',
        password: '',
        captcha: null
      },
      recaptchaSiteKey: process.env.VUE_APP_RECAPTCHA_SITE_KEY,
      submitting: false
    }
  },
  computed: {
    ...mapGetters({
      isSuspectedLogin: 'isSuspectedLogin',
      lastLogin: 'getLastLogin'
    })
  },
  methods: {
    onCaptchaVerified (token) {
      this.fields.captcha = token
    },
    resetCaptcha () {
      this.$refs.recaptcha.reset();
      this.fields.captcha = ''
    },
    submit () {
      this.clearErrors()
      this.submitting = true

      if (this.lastLogin !== this.fields.login) this.removeCaptcha()

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
      this.$noty.success('Signed in successfully')
      this.$router.push({ name: 'home' })
      this.close()
    },
    onError (err) {
      if (!err.graphQLErrors && err.graphQLErrors.length) return

      this.$noty.warning(err.graphQLErrors[0].message)
      this.unsuccessfulLogin({ login: this.fields.login })
        .then(() => {
          if (this.isSuspectedLogin) this.resetCaptcha()
        })
    },
    done () {
      this.submitting = false
    },
    close () {
      this.$root.$emit('bv::hide::modal', this.modalName)
    },
    ...mapActions([
      'authenticate',
      'login',
      'unsuccessfulLogin'
    ]),
  }
}
</script>
