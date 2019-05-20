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
        date_of_birth: '',
        password: '',
        password_confirmation: '',
        country: '',
        first_name: '',
        last_name: '',
        gender: 'male',
        phone: '',
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
        agreed_with_promotional: false
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

      this.$store
        .dispatch('registerNewUser', this.form.values())
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
