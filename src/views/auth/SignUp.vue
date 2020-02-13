<template>
  <b-form @submit.prevent="submit">
    <signup-form
      :submitting="submitting"
      :dob-proxy="proxyDOB"
      :form="form"
      :countries="countries"/>
  </b-form>
</template>

<script>
import { Form } from '@/helpers'
import SignupForm from './SignupForm'
import SelectInput from '@/components/inputs/SelectInput.vue'
import { getCookie } from '@/helpers/cookies'
import { supportedCountries as countries } from '@/helpers/countries';

export default {
  components: {
    'select-component': SelectInput,
    SignupForm
  },
  data () {
    return {
      form: new Form({
        registration: {
          username: '',
          email: '',
          dateOfBirth: '',
          password: '',
          country: '',
          currency: 'EUR',
          agreedWithPromotional: false,
          agreedWithPrivacy: false,
        }
      }),
      submitting: false,
      countries,
      proxyDOB: {
        day: null,
        month: null,
        year: null
      },
    }
  },
  methods: {
    close () {
      this.$bvModal.hide('AuthModal')
    },
    composeDob () {
      const { year, month, day } = this.proxyDOB
      this.form.registration.dateOfBirth = `${year}-${month}-${day}`
    },
    submit () {
      this.form.clearErrors()
      this.submitting = true
      this.composeDob()
      this.$sbjs.initAndSetData()

      const input = {
        ...this.form.registration,
        bTag: getCookie('btag') || null,
      }

      this.$store
        .dispatch('registerNewUser', [input, this.$sbjs.data])
        .then(({ data: { signUp } }) => this.submitSuccess(signUp))
        .catch(({ graphQLErrors }) => this.submitError(graphQLErrors))
        .finally(() => (this.submitting = false))
    },
    submitSuccess (signUp) {
      this.$store.dispatch('login', signUp)

      this.$gtm.push({
        'event': 'customerCreated',
        'gaClientID': this.computeGaClientID() || null,
        'customerID': signUp.user.id || null,
        'affiliateID': this.computeAffiliateID() || null
      })

      this.$router.push({ name: 'home' })
      this.close()
    },
    submitError (graphQLErrors) {
      const errors = {}
      graphQLErrors.forEach((error) => {
        errors[error.path] = error.message
      })
      this.form.setErrors(errors)
    },
    computeAffiliateID () {
      const path = this.$route.fullPath
      if (path.includes('b-tag=')) {
        return path.substring(path.indexOf('=') + 1, path.lastIndexOf('_'))
      }
    },
    computeGaClientID () {
      return (getCookie('_ga') || '').substring('GA1.2.'.length)
    }
  }
}
</script>
