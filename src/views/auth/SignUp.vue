<template>
  <form @submit.prevent="submit">
    <b-row no-gutters>
      <b-col
        sm="3"
        align="right"
        class="mt-2 mr-3">
        <label for="signup-username">
          Username
        </label>
      </b-col>
      <b-col cols="6">
        <b-form-input
          id="signup-username"
          v-model="fields.username"
          :state="getState('username')"
          type="text"
          aria-describedby="inputFeedbackUsername"
          required/>
        <b-form-invalid-feedback
          id="inputFeedbackUsername"
          :invalid-feedback="errors.username"/>
      </b-col>
    </b-row>
    <b-row
      class="mt-4"
      no-gutters>
      <b-col
        sm="3"
        align="right"
        class="mt-2 mr-3">
        <label for="signup-email">
          Email
        </label>
      </b-col>
      <b-col cols="6">
        <b-form-input
          id="signup-email"
          v-model="fields.email"
          :state="getState('email')"
          type="text"
          aria-describedby="inputFeedbackEmail"
          required/>
        <b-form-invalid-feedback
          id="inputFeedbackEmail"
          :invalid-feedback="errors.email"/>
      </b-col>
    </b-row>
    <b-row
      class="mt-4"
      no-gutters>
      <b-col
        sm="3"
        align="right"
        class="mt-2 mr-3">
        <label for="signup-first-name">
          First name
        </label>
      </b-col>
      <b-col cols="6">
        <b-form-input
          id="signup-first-name"
          v-model="fields.first_name"
          :state="getState('first_name')"
          type="text"
          aria-describedby="inputFeedbackFirstName"
          required/>
        <b-form-invalid-feedback
          id="inputFeedbackFirstName"
          :invalid-feedback="errors.first_name"/>
      </b-col>
    </b-row>
    <b-row
      class="mt-4"
      no-gutters>
      <b-col
        sm="3"
        align="right"
        class="mt-2 mr-3">
        <label for="signup-last-name">
          Last name
        </label>
      </b-col>
      <b-col cols="6">
        <b-form-input
          id="signup-last-name"
          v-model="fields.last_name"
          :state="getState('last_name')"
          type="text"
          aria-describedby="inputFeedbackLastName"
          required/>
        <b-form-invalid-feedback
          id="inputFeedbackLastName"
          :invalid-feedback="errors.last_name"/>
      </b-col>
    </b-row>
    <b-row
      class="mt-4"
      no-gutters>
      <b-col
        sm="3"
        align="right"
        class="mt-2 mr-3">
        <label for="signup-birthday">
          Birth Date
        </label>
      </b-col>
      <b-col cols="6">
        <flat-pickr
          id="signup-birthday"
          v-model="fields.date_of_birth"
          :config="datePickerConfig"
          :class="{'is-invalid': getState('date_of_birth') === false}"
          class="form-control"/>
        <b-form-invalid-feedback
          id="inputFeedbackBirthDay"
          :invalid-feedback="errors.date_of_birth"/>
      </b-col>
    </b-row>
    <b-row
      class="mt-4"
      no-gutters>
      <b-col
        sm="3"
        align="right"
        class="mt-2 mr-3">
        <label for="signup-password">
          Last name
        </label>
      </b-col>
      <b-col cols="6">
        <b-form-input
          id="signup-password"
          v-model="fields.password"
          :state="getState('password')"
          type="password"
          aria-describedby="inputFeedbackPassword"
          required/>
        <b-form-invalid-feedback
          id="inputFeedbackPassword"
          :invalid-feedback="errors.password"/>
      </b-col>
    </b-row>
    <b-row
      class="mt-4"
      no-gutters>
      <b-col
        sm="3"
        align="right"
        class="mt-2 mr-3">
        <label for="signup-password_confirmation">
          Password confirmation
        </label>
      </b-col>
      <b-col cols="6">
        <b-form-input
          id="signup-password_confirmation"
          v-model="fields.password_confirmation"
          :state="getState('password_confirmation')"
          type="password"
          aria-describedby="inputFeedbackPasswordConfirmation"
          required/>
        <b-form-invalid-feedback
          id="inputFeedbackPasswordConfirmation"
          :invalid-feedback="errors.password_confirmation"/>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col
        cols="6"
        class="mr-auto ml-auto">
        <b-button
          :disabled="submitting"
          class="my-4 ml-3"
          block
          type="submit">
          Sign Up
        </b-button>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col align="center">
        <b-link @click="$emit('tab-changed', 0)">
          Have account already? Sign in here
        </b-link>
      </b-col>
    </b-row>
  </form>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import moment from 'moment'
import formsMixin from '@/mixins/forms'

export default {
  components: {
    flatPickr
  },
  mixins: [formsMixin],
  data () {
    return {
      fields: {
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        date_of_birth: moment().format('YYYY-MM-DD'),
        password: '',
        password_confirmation: ''
      },
      datePickerConfig: {
        altInput: true,
        dateFormat: 'Y-m-d',
        altFormat: 'j F Y'
      },
      submitting: false
    }
  },
  methods: {
    submit () {
      this.clearErrors()
      const input = this.fields
      this.submitting = true

      this.$store.dispatch('registerNewUser', input)
        .then(({ data: { signUp } }) => {
          this.$store.dispatch('login', signUp)
          this.$router.push({ name: 'home' })
        })
        .catch((err) => {
          if (err.graphQLErrors && err.graphQLErrors.length) {
            this.$noty.warning(err.graphQLErrors[0].message)
          }
        })
        .finally(() => {
          this.submitting = false
        })
    }
  }
}
</script>
