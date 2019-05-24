<template>
  <b-form
    @submit.prevent="submit">
    <h5 class="font-size-19 letter-spacing-2 text-arc-clr-iron mb-4">
      {{ $t('userModal.resetPasswordHeader') }}
    </h5>
    <b-form-group>
      <b-form-input
        id="reset-new-password"
        v-model="form.password"
        type="password"
        placeholder="Enter new password"/>
    </b-form-group>
    <b-form-group>
      <b-form-input
        id="reset-password-confirmation"
        v-model="form.confirmation"
        type="password"
        placeholder="Repeat password"/>
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
        password: '',
        confirmation: ''
      }),
      hide: false,
      submitting: false
    }
  },
  computed: {
    anyEmptyField () {
      return Object.values(this.form).some((value) => {
        return value === null || value === ''
      })
    },
    isSubmitDisabled () {
      return this.anyEmptyField || this.submitting
    }
  },
  methods: {
    ...mapActions(['resetPassword']),
    submit: function () {
      const input = {
        ...this.form.values(),
        ...{
          token: this.$route.query.token || null
        }
      }

      this.form.clearErrors()
      this.submitting = true

      this
        .resetPassword(input)
        .then(() => {
          this.feedback = this.$t('userModal.passwordChangeSuccess')
          setTimeout(() => { this.$root.$emit('bv::hide::modal', 'AuthModal') }, 2000)
        })
        .catch((errors) => {
          this.form.handleGraphQLErrors(errors)
          this.feedback = errors.graphQLErrors[0].message
        })
        .finally(() => {
          this.submitting = false
        })
    }
  }
}
</script>
