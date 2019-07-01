<template>
  <b-form @submit.prevent="submit">
    <b-tabs
      v-model="tabIndex"
      active-nav-item-class="sign-form-tabs"
      nav-class="sign-form-tabs"
      content-class="sign-form-tabs-content"
      lazy
      justified
      end>
      <b-tab
        title="Personal information"
        title-item-class="sign-form-tabs-title">
        <signup-first-step
          :form="form"
          @submit="goToStep(1)"/>
      </b-tab>
      <b-tab
        title="Contact information"
        title-item-class="sign-form-tabs-title">
        <signup-second-step
          :submitting="submitting"
          :form="form"
          @return="goToStep(0)"/>
      </b-tab>
    </b-tabs>
  </b-form>
</template>

<script>
import { Form } from '@/helpers'
import SignupFirstStep from './SignupFirstStep'
import SignupSecondStep from './SignupSecondStep'
import SelectInput from '@/components/inputs/SelectInput.vue'
import { mapActions } from 'vuex'
import { getCookie } from '@/helpers/cookies'

export default {
  components: {
    'select-component': SelectInput,
    SignupFirstStep,
    SignupSecondStep
  },
  data () {
    return {
      form: new Form({
        firstStep: {
          username: '',
          email: '',
          dateOfBirth: '',
          password: '',
          passwordConfirmation: '',
          country: '',
          currency: 'EUR',
        },
        secondStep: {
          firstName: '',
          lastName: '',
          gender: 'male',
          phone: '',
          streetAddress: '',
          city: '',
          state: '',
          zipCode: '',
          agreedWithPromotional: false
        }
      }),
      submitting: false,
      tabIndex: 0
    }
  },
  methods: {
    goToStep (step) {
      this.tabIndex = step
    },
    ...mapActions('wallets', ['fetchWallets']),
    close () {
      this.$bvModal.hide('AuthModal')
    },
    submit () {
      this.form.clearErrors()
      this.submitting = true

      const input = {
        ...this.form.firstStep,
        ...this.form.secondStep,
        bTag: getCookie('btag') || null }

      this.$store
        .dispatch('registerNewUser', input)
        .then(({ data: { signUp } }) => {
          this.$store.dispatch('login', signUp)
          this.fetchWallets()
          this.$router.push({ name: 'home' })
          this.close()
          this.$noty.success('Welcome to ArcaneBet!')
        })
        .catch((err) => {
          let { graphQLErrors } = err
          let firstErrorPath = graphQLErrors[0].path.toString()

          if (this.form.firstStep.hasOwnProperty(firstErrorPath)) { this.goToStep(0) }
          this.form.handleGraphQLErrors(err)
        })
        .finally(() => {
          this.submitting = false
        })
    }
  }
}
</script>
