<template>
  <simple-layout>
    <loader v-if="pageLoading"/>
    <b-row
      v-if="isFormPresent"
      class="d-flex justify-content-center">
      <b-col md="4">
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
      </b-col>
    </b-row>
    <b-row
      v-if="isTokenFeedback"
      class="d-flex justify-content-center">
      <b-col cols="auto">
        <p class="font-size-18 letter-spacing-2 text-arc-clr-iron">
          {{ tokenResultFeedback }}
        </p>
      </b-col>
    </b-row>
    <b-row
      v-if="isResultMessage"
      class="d-flex justify-content-center">
      <b-col cols="auto">
        <p class="font-size-18 letter-spacing-2 text-arc-clr-iron">
          {{ feedback }}
        </p>
        <b-button
          :to="{ name: 'home', query: { login: true }}"
          size="lg"
          variant="arc-secondary"
          class="px-5 bg-arc-clr-esport-bg border-0 letter-spacing-2 font-weight-bold">
          LOG IN
        </b-button>
      </b-col>
    </b-row>
  </simple-layout>
</template>

<script>
import { Form } from '@/helpers'
import { mapActions } from 'vuex'
import { TOKEN_VERIFICATION_QUERY } from '@/graphql/index'

export default {
  data () {
    return {
      form: new Form({
        password: '',
        confirmation: ''
      }),
      feedback: '',
      tokenResultFeedback: '',
      pageLoading: null,
      submitting: false,
      isForm: true,
      isTokenValid: null
    }
  },
  apollo: {
    verifyPasswordToken () {
      this.pageLoading = true
      return {
        query: TOKEN_VERIFICATION_QUERY,
        variables: {
          token: this.$route.params.token || null
        },
        result ({ data: { verifyPasswordToken } }) {
          this.pageLoading = false
          this.isTokenValid = verifyPasswordToken.success
          this.tokenResultFeedback = null || verifyPasswordToken.message
        }
      }
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
    },
    isFormPresent () {
      return this.isForm && !this.pageLoading && !this.isTokenFeedback
    },
    isResultMessage () {
      return !this.isForm && this.feedback
    },
    isTokenFeedback () {
      return !this.isTokenValid && this.tokenResultFeedback !== null
    }
  },
  methods: {
    ...mapActions(['resetPassword']),
    submit () {
      this.form.clearErrors()
      this.submitting = true
      this.isForm = false
      this.feedback = ''

      const input = {
        ...this.form.values(),
        token: this.$route.params.token || null
      }

      this
        .resetPassword(input)
        .then(() => {
          this.feedback = this.$t('userModal.passwordChangeSuccess')
          setTimeout(() => { this.$root.$emit('bv::hide::modal', 'AuthModal') }, 2000)
        })
        .catch((errors) => {
          this.isForm = true
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
