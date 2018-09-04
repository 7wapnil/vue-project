<template>
  <simple-layout>
    <div class="row">
      <div class="col-6 offset-3">
        <form @submit.prevent="submit">
          <h2>Sign Up</h2>
          <hr>
          <b-form-group
            :state="getState('username')"
            :invalid-feedback="errors.username"
            label="Username"
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
            label="Email">
            <b-form-input
              id="email"
              v-model="fields.email"
              :state="getState('email')"
              required="required"/>
          </b-form-group>
          <b-form-group
            :state="getState('first_name')"
            :invalid-feedback="errors.first_name"
            label="First name">
            <b-form-input
              id="first_name"
              v-model="fields.first_name"
              :state="getState('first_name')"
              required="required"/>
          </b-form-group>
          <b-form-group
            :state="getState('last_name')"
            :invalid-feedback="errors.last_name"
            label="Last name">
            <b-form-input
              id="last_name"
              v-model="fields.last_name"
              :state="getState('last_name')"
              required="required"/>
          </b-form-group>
          <b-form-group
            :state="getState('date_of_birth')"
            :invalid-feedback="errors.date_of_birth"
            label="Birth Date">
            <flat-pickr
              id="date_of_birth"
              v-model="fields.date_of_birth"
              :config="datePickerConfig"
              :class="{'is-invalid': getState('date_of_birth') === false}"
              class="form-control"/>
          </b-form-group>
          <b-form-group
            :state="getState('password')"
            :invalid-feedback="errors.password"
            label="Password">
            <b-form-input
              id="password"
              v-model="fields.password"
              :state="getState('password')"
              type="password"
              required="required"/>
          </b-form-group>
          <b-form-group
            :state="getState('password_confirmation')"
            :invalid-feedback="errors.password_confirmation"
            label="Password confirmation">
            <b-form-input
              id="password_confirmation"
              v-model="fields.password_confirmation"
              :state="getState('password_confirmation')"
              type="password"
              required="required"/>
          </b-form-group>
          <button
            :disabled="submitting"
            class="btn btn-dark btn-block"
            type="submit">
            Sign Up
          </button>
          <hr>
          <router-link :to="'sign-in'">
            Have account already? Sign in here
          </router-link>
        </form>
      </div>
    </div>
  </simple-layout>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import moment from 'moment'
import AccountService from '@/services/api/account'
import formsMixin from '@/mixins/forms'

export default {
  components: {
    flatPickr
  },
  mixins: [formsMixin],
  data () {
    return {
      apiService: new AccountService(this),
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

      this
        .apiService
        .signUp(input)
        .then(({ data: { signUp } }) => {
          this.$store.commit('login', signUp)
          this.$router.push({ name: 'home' })
        })
        .catch(this.handleGraphQLErrors)
        .finally(() => {
          this.submitting = false
        })
    }
  }
}
</script>
