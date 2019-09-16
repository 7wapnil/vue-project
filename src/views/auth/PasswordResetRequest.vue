<template>
  <b-form
    @submit.prevent="submit">
    <b-form-group>
      <b-form-input
        id="reset-email"
        v-model="fields.email"
        placeholder="Email"
        autocomplete="email"
        class="mb-0"
        required/>
      <b-row
        v-if="form.errors.any()"
        no-gutters>
        <ul class="pt-2 mb-0">
          <li
            v-for="(errorText, errorName) in form.getErrors()"
            :key="errorName"
            class="text-arc-clr-white">
            {{ errorText }}
          </li>
        </ul>
      </b-row>
    </b-form-group>
    <b-row
      v-if="feedback"
      no-gutters>
      <b-col class="pb-3">
        <span class="text-arc-clr-white">
          {{ feedback }}
        </span>
      </b-col>
    </b-row>
    <b-row
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
    <b-button
      :disabled="isSubmitDisabled"
      class="mb-3"
      type="submit"
      variant="user-profile-button"
      block>
      {{ $t('account.cta.resetPassword') }}
    </b-button>
  </b-form>
</template>

<script>
import { Form } from '@/helpers'
import { mapActions } from 'vuex'
import VueRecaptcha from 'vue-recaptcha'

export default {
  components: {
    VueRecaptcha
  },
  data () {
    return {
      feedback: '',
      fields: {
        email: '',
        captcha: null
      },
      form: new Form({
        email: ''
      }),
      recaptchaSiteKey: process.env.VUE_APP_RECAPTCHA_SITE_KEY,
      submitting: false
    }
  },
  computed: {
    isSubmitDisabled () {
      return !this.fields.email || !this.fields.captcha || this.submitting
    }
  },
  methods: {
    ...mapActions(['requestPasswordReset']),
    onCaptchaVerified (token) {
      this.fields.captcha = token
    },
    resetCaptcha () {
      this.$refs.recaptcha.reset()
      this.fields.captcha = null
    },
    submit () {
      this.form.clearErrors()
      this.submitting = true

      this
        .requestPasswordReset(this.fields)
        .then(() => {
          this.feedback = `${this.$t('userModal.resetEmailSuccess1')}
          ${this.form.values().email}.
          ${this.$t('userModal.resetEmailSuccess2')}`
          this.form.reset()
        })
        .catch((errors) => {
          this.form.handleGraphQLErrors(errors)
        })
        .finally(() => {
          this.resetCaptcha()
          this.submitting = false
        })
    }
  }
}
</script>
