<template>
  <simple-layout>
    <div class="row">
      <div class="col">
        <form @submit.prevent="submit">
          <h2>Sign Up</h2>
          <hr>
          <div
            v-show="isCurrentStep(1)"
            class="step">
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

            <b-form-group
              :state="getState('country')"
              :invalid-feedback="errors.country"
              label="Country">
              <b-form-select
                id="country"
                :options="countries"
                v-model="fields.country"
                :state="getState('country')"
                required="required"/>
            </b-form-group>
            <span v-if="tooYoung">You should be adult to continue signing up.</span>
            <button
              :disabled="uncompletedStep || tooYoung"
              class="btn btn-dark btn-block"
              @click.prevent="nextStep">
              Continue
            </button>
          </div>
          <div
            v-show="isCurrentStep(2)"
            class="step">
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
              :state="getState('gender')"
              :invalid-feedback="errors.gender"
              label="Gender">
              <b-form-select
                id="gender"
                :options="genders"
                v-model="fields.gender"
                :state="getState('gender')"
                required="required"/>
            </b-form-group>

            <b-form-group
              :state="getState('phone')"
              :invalid-feedback="errors.phone"
              label="Phone number">
              <b-form-input
                v-mask="'+############'"
                id="phone"
                v-model="fields.phone"
                :state="getState('phone')"
                required="required"/>
            </b-form-group>
            <span v-show="!isValidPhone">Invalid phone number.</span>
            <b-form-group
              :state="getState('city')"
              :invalid-feedback="errors.city"
              label="City">
              <b-form-input
                id="city"
                v-model="fields.city"
                :state="getState('city')"
                required="required"/>
            </b-form-group>

            <b-form-group
              :state="getState('street_address')"
              :invalid-feedback="errors.street_address"
              label="Address">
              <b-form-input
                id="street_address"
                v-model="fields.street_address"
                :state="getState('street_address')"
                required="required"/>
            </b-form-group>

            <b-form-group
              :state="getState('state')"
              :invalid-feedback="errors.state"
              label="Province">
              <b-form-input
                id="state"
                v-model="fields.state"
                :state="getState('state')"/>
            </b-form-group>

            <b-form-group
              :state="getState('zip_code')"
              :invalid-feedback="errors.zip_code"
              label="ZIP Code">
              <b-form-input
                id="zip_code"
                v-model="fields.zip_code"
                :state="getState('zip_code')"/>
            </b-form-group>

            <b-form-group>
              <b-form-checkbox
                v-model="fields.agreed_with_promotional"
                plain>
                I agree to receive promotional content
              </b-form-checkbox>
            </b-form-group>

            <b-form-group>
              <b-form-checkbox
                v-model="agree"
                plain>
                Confirm I am not underage, agree with T&C, agree with privacy policy
              </b-form-checkbox>
            </b-form-group>

            <button
              :disabled="submitting"
              class="btn btn-dark btn-block"
              @click.prevent="previousStep">
              Back
            </button>
            <button
              :disabled="submitting || ! agree"
              type="submit"
              class="btn btn-dark btn-block">
              Register
            </button>
          </div>
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
import formsMixin from '@/mixins/forms'
import { countries } from 'countries-list'
import { mask } from 'vue-the-mask'
import { isValidNumber } from 'libphonenumber-js'

export default {
  components: {
    flatPickr
  },
  directives: {
    mask
  },

  mixins: [formsMixin],
  data () {
    return {
      agree: false,
      countries: Object.values(countries).map(country => country.name),
      genders: [
        { value: 0, text: 'Male' },
        { value: 1, text: 'Female' }
      ],
      fields: {
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        date_of_birth: moment().format('YYYY-MM-DD'),
        password: '',
        password_confirmation: '',
        country: '',
        gender: '',
        phone: '',
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
        agreed_with_promotional: true,
      },
      step: 1,
      steps: {
        1: {
          fields: ['username', 'email', 'date_of_birth',
            'password', 'password_confirmation', 'country'],
        },
        2: {
          fields: ['first_name', 'last_name', 'gender', 'phone', 'street_address', 'city']
        }
      },
      datePickerConfig: {
        altInput: true,
        dateFormat: 'Y-m-d',
        altFormat: 'j F Y'
      },
      submitting: false
    }
  },
  computed: {
    uncompletedStep () {
      const requiredFields = this.steps[this.step].fields

      return requiredFields.some(fieldName => !this.fields[fieldName])
    },

    tooYoung () {
      return moment().diff(this.fields.date_of_birth, 'years') < 18
    },

    isValidPhone () {
      return isValidNumber(this.fields.phone)
    }
  },

  watch: {
    'fields.country': function (countryName) {
      const country = Object.values(countries).find(country => country.name === countryName)
      this.fields.phone = country ? country.phone : ''
    }
  },

  methods: {
    nextStep () {
      this.step++
    },
    previousStep () {
      this.step--
    },
    isCurrentStep (stepNumber) {
      return this.step === stepNumber
    },

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
  },
}
</script>
