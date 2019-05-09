<template>
  <b-tabs
    v-model="tabIndex"
    active-nav-item-class="sign-form-tabs"
    nav-class="sign-form-tabs"
    content-class="sign-form-tabs-content"
    justified
    end>
    <b-tab
      title="Personal information"
      title-item-class="sign-form-tabs-title">
      <signup-first-step
        :errors="errors"
        @section-one-filled="addFirstStepFields"/>
    </b-tab>
    <b-tab
      title="Contact information"
      title-item-class="sign-form-tabs-title"
      @click="composeFormFields">
      <signup-second-step
        :submiting="submitting"
        :errors="errors"
        @section-two-filled="composeFormFields"
        @step-changed="tabIndex = 0"/>
    </b-tab>
  </b-tabs>
</template>

<script>
import Errors from '@/helpers/forms/errors'
import SignupFirstStep from './SignupFirstStep'
import SignupSecondStep from './SignupSecondStep'
import SelectInput from '@/components/inputs/SelectInput.vue'

export default {
  components: {
    'select-component': SelectInput,
    SignupFirstStep,
    SignupSecondStep,
  },
  data () {
    return {
      fieldsStepOne: {},
      fieldsStepTwo: {},
      submitting: false,
      tabIndex: 0,
      errors: new Errors()
    }
  },
  methods: {
    addFirstStepFields (value) {
      this.fieldsStepOne = value
      this.tabIndex = 1
    },
    composeFormFields (value) {
      this.fieldsStepTwo = value
      this.submit()
    },
    close () {
      this.$root.$emit('bv::hide::modal', 'AuthModal')
    },
    submit () {
      this.errors.clear()
      const input = { ...this.fieldsStepOne, ...this.fieldsStepTwo }
      this.submitting = true
      this.$store.dispatch('registerNewUser', input)
        .then(({ data: { signUp } }) => {
          this.$store.dispatch('login', signUp)
          this.$router.push({ name: 'home' })
          this.close()
          this.$noty.success('Welcome to ArcaneBet!')
        })
        .catch((err) => this.errors.parseGraphQLErrors(err))
        .finally(() => {
          this.submitting = false
        })
    }
  }
}
</script>
