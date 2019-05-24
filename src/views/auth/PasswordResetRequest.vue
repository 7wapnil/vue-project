<template>
  <b-form
    @submit.prevent="submit">
    <b-form-group>
      <b-form-input
        id="reset-email"
        v-model="form.email"
        placeholder="Email"
        autocomplete="email"
        class="mb-0"
        required/>
    </b-form-group>
    <b-row
      v-if="feedback"
      no-gutters>
      <b-col class="pb-2">
        <span class="text-arc-clr-white">
          {{ feedback }}
        </span>
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

export default {
  data () {
    return {
      feedback: '',
      form: new Form({
        email: ''
      }),
      submitting: false
    }
  },
  computed: {
    isSubmitDisabled () {
      return !this.form.email || this.submitting
    }
  },
  methods: {
    ...mapActions(['requestPasswordReset']),
    submit () {
      this.form.clearErrors()
      this.submitting = true

      this
        .requestPasswordReset(this.form.values())
        .then(() => {
          this.feedback = `Password reset email successfully sent to:
          ${this.form.values().email}.
          Click the link in the email to reset your password.`
          this.form.reset()
        })
        .catch((errors) => {
          this.form.handleGraphQLErrors(errors)
        })
        .finally(() => {
          this.submitting = false
        })
    }
  }
}
</script>
