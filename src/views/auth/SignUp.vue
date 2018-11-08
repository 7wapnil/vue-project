<template>
  <b-row>
    <b-col>
      <form @submit.prevent="submit">
        <b-form-group
          :state="getState('username')"
          :invalid-feedback="errors.username"
          label="Username"
          label-text-align="right"
          label-class="form-label"
          horizontal
          required="required">
          <b-form-input
            id="username"
            v-model="fields.username"
            :state="getState('username')"
            required="required"/>
        </b-form-group>
        <b-form-group
          :state="getState('email')"
          :invalid-feedback="errors.email"
          label="Email"
          label-text-align="right"
          label-class="form-label"
          label-for="email"
          horizontal>
          <b-form-input
            id="email"
            v-model="fields.email"
            :state="getState('email')"
            required="required"/>
        </b-form-group>
        <b-form-group
          horizontal
          label="First name"
          label-text-align="right"
          label-class="form-label"
          label-for="first_name"
          :state="getState('first_name')"
          :invalid-feedback="errors.first_name">
          <b-form-input
            id="first_name"
            v-model="fields.first_name"
            :state="getState('first_name')"
            required="required"/>
        </b-form-group>
        <b-form-group
          horizontal
          label="Last name"
          label-text-align="right"
          label-class="form-label"
          label-for="last_name"
          :state="getState('last_name')"
          :invalid-feedback="errors.last_name">
          <b-form-input
            id="last_name"
            v-model="fields.last_name"
            :state="getState('last_name')"
            required="required"/>
        </b-form-group>
        <b-form-group
          horizontal
          label="Birth Date"
          label-text-align="right"
          label-class="form-label"
          :state="getState('date_of_birth')"
          :invalid-feedback="errors.date_of_birth">
          <flat-pickr
            id="date_of_birth"
            v-model="fields.date_of_birth"
            :config="datePickerConfig"
            :class="{'is-invalid': getState('date_of_birth') === false}"
            class="form-control"/>
        </b-form-group>
        <b-form-group
          horizontal
          label="Password"
          label-text-align="right"
          label-class="form-label"
          :state="getState('password')"
          :invalid-feedback="errors.password">
          <b-form-input
            id="password"
            v-model="fields.password"
            :state="getState('password')"
            type="password"
            required="required"/>
        </b-form-group>
        <b-form-group
          horizontal
          label="Password confirmation"
          label-text-align="right"
          label-class="form-label"
          label-for="password_confirmation"
          :state="getState('password_confirmation')"
          :invalid-feedback="errors.password_confirmation">
          <b-form-input
            id="password_confirmation"
            v-model="fields.password_confirmation"
            :state="getState('password_confirmation')"
            type="password"
            required="required"/>
        </b-form-group>
        <b-button
          :disabled="submitting"
          block
          type="submit">
          Sign Up
        </b-button>

        <b-link :to="'sign-in'">
          Have account already? Sign in here
        </b-link>
      </form>
    </b-col>
  </b-row>
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
