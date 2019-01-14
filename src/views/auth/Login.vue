<template>
  <form @submit.prevent="submit">
    <input-component
      id="login-username"
      :state="getState('username')"
      :feedback="inputFeedback['username']"
      v-model="fields.username"
      class-name="username"
      type="text"
      label="Username"
      bottom-bar
      aria-describedby="inputFeedbackUsername"
      feedback-id="inputFeedbackUser"
    />
    <input-component
      id="login-password"
      :state="getState('password')"
      :feedback="inputFeedback['password']"
      v-model="fields.password"
      type="password"
      label="Password"
      bottom-bar
      aria-describedby="inputFeedbackPassword"
      feedback-id="inputFeedbackPassword"
    />
    <b-row
      v-if="isSuspicious"
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
        <div
          v-if="isCaptchaMissing"
          role="alert"
          class="invalid-feedback d-block">
          Please, pass Captcha verification!
        </div>
      </b-col>
    </b-row>
    <response-panel :response-text="feedback"/>
    <b-row no-gutters>
      <b-col
        cols="6"
        class="mr-auto ml-auto">
        <b-button
          :disabled="submitting"
          class="my-4"
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
import InputComponent from '@/components/inputs/RegularInput.vue'
import VueRecaptcha from 'vue-recaptcha'
import { mapGetters, mapActions } from 'vuex'
import ResponseErrorPanel from '../../components/custom/ResponseErrorPanel.vue'

export default {
  components: {
    VueRecaptcha,
    'input-component': InputComponent,
    'response-panel': ResponseErrorPanel
  },
  mixins: [formsMixin],
  props: {
    modalName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      inputFeedback: {},
      feedback: '',
      fields: {
        login: '',
        password: '',
        captcha: null
      },
      recaptchaSiteKey: process.env.VUE_APP_RECAPTCHA_SITE_KEY,
      submitting: false,
      isCaptchaMissing: false
    }
  },
  computed: {
    ...mapGetters({
      isSuspicious: 'isSuspicious',
      lastLogin: 'getLastLogin'
    })
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
      this.$refs.recaptcha.reset();
      this.fields.captcha = ''
    },
    submit () {
      console.log(this.fields)
      this.clearErrors()

      if (this.isCaptchaEmpty()) {
        this.isCaptchaMissing = true;
        return
      }

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
      this.feedback = err.graphQLErrors[0].message
      this.rejectLogin({ login: this.fields.login })
        .then(() => {
          if (this.isSuspicious) this.resetCaptcha()
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
      'rejectLogin'
    ]),
  }
}
</script>
