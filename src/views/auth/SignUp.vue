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
          @submit="tabIndex = 1"/>
      </b-tab>
      <b-tab
        title="Contact information"
        title-item-class="sign-form-tabs-title">
        <signup-second-step
          :submitting="submitting"
          :form="form"
          @return="tabIndex = 0"/>
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
        username: '',
        email: '',
        dateOfBirth: '',
        password: '',
        passwordConfirmation: '',
        country: '',
        firstName: '',
        lastName: '',
        gender: 'male',
        phone: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        agreedWithPromotional: false
      }),
      submitting: false,
      tabIndex: 0
    }
  },
  methods: {
    ...mapActions('wallets', ['fetchWallets']),
    close () {
      this.$root.$emit('bv::hide::modal', 'AuthModal')
    },
    submit () {
      this.form.clearErrors()
      this.submitting = true

      const input = {
        ...this.form.values(),
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
        .catch((err) => this.form.handleGraphQLErrors(err))
        .finally(() => {
          this.submitting = false
        })
    }
  }
}
</script>
