<template>
  <b-form
    @submit.prevent="submit">
    <b-form-group>
      <b-form-input
        id="reset-email"
        v-model="form.email"
        placeholder="Username"
        autocomplete="username"
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
      Reset Password
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
      return !this.form.email && !this.submitting
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
          this.form.reset()
          this.feedback = 'All good'
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
