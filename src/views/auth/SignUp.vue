<template>
  <form @submit.prevent="submit">
    <div
      v-show="isCurrentStep(1)"
      class="step">
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
        no-gutters
        class="mt-4">
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
        no-gutters
        class="mt-4">
        <b-col
          sm="3"
          align="right"
          class="mt-2 mr-3">
          <label for="signup-date_of_birth">
            Birth Date
          </label>
        </b-col>
        <b-col cols="6">
          <flat-pickr
            id="signup-date_of_birth"
            v-model="fields.date_of_birth"
            :config="datePickerConfig"
            :class="{'is-invalid': getState('date_of_birth') === false}"
            class="form-control"/>
          <b-form-invalid-feedback
            id="inputFeedbackBirthday"
            :invalid-feedback="errors.date_of_birth"/>
        </b-col>
      </b-row>
      <b-row
        no-gutters
        class="mt-4">
        <b-col
          sm="3"
          align="right"
          class="mt-2 mr-3">
          <label for="signup-password">
            Password
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
        no-gutters
        class="mt-4">
        <b-col
          sm="3"
          align="right"
          class="mt-2 mr-3">
          <label for="signup-password-confirmation">
            Password confirmation
          </label>
        </b-col>
        <b-col cols="6">
          <b-form-input
            id="signup-password-confirmation"
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

      <b-row
        no-gutters
        class="mt-4">
        <b-col
          sm="3"
          align="right"
          class="mt-2 mr-3">
          <label for="signup-country">
            Country
          </label>
        </b-col>
        <b-col cols="6">
          <b-form-select
            id="signup-country"
            :options="countries"
            v-model="fields.country"
            :state="getState('country')"
            aria-describedby="inputFeedbackPasswordConfirmation"
            required/>
          <b-form-invalid-feedback
            id="inputFeedbackCountry"
            :invalid-feedback="errors.country"/>
        </b-col>
      </b-row>

      <b-row v-if="tooYoung">
        <b-col
          align="center"
          class="my-4">
          You should be adult to continue signing up
        </b-col>
      </b-row>

      <b-row no-gutters>
        <b-col
          cols="6"
          class="mr-auto ml-auto">
          <b-button
            :disabled="uncompletedStep || tooYoung"
            class="ml-3"
            block
            @click.prevent="nextStep">
            Continue
          </b-button>
        </b-col>
      </b-row>
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
          required
          @keypress.native="filterAlphabeticalCharacters"/>
      </b-form-group>
      <b-form-group
        :state="getState('last_name')"
        :invalid-feedback="errors.last_name"
        label="Last name">
        <b-form-input
          id="last_name"
          v-model="fields.last_name"
          :state="getState('last_name')"
          required
          @keypress.native="filterAlphabeticalCharacters"/>
      </b-form-group>

      <b-form-group
        :state="getState('gender')"
        :invalid-feedback="errors.gender"
        label="Gender">
        <b-form-radio-group
          id="gender"
          :options="genders"
          v-model="fields.gender"
          :state="getState('gender')"
          required/>
      </b-form-group>

      <b-form-group
        :state="getState('phone')"
        :invalid-feedback="errors.phone"
        label="Phone number">
        <b-form-input
          id="phone"
          :v-mask="'+############'"
          v-model="fields.phone"
          :state="getState('phone')"
          required
          @keypress.native="filterPhoneNumberCharacters"/>
      </b-form-group>
      <span v-show="!isValidPhone">Invalid phone number.</span>

      <b-form-group
        :state="getState('street_address')"
        :invalid-feedback="errors.street_address"
        label="Street address">
        <b-form-input
          id="street_address"
          v-model="fields.street_address"
          :state="getState('street_address')"
          required/>
      </b-form-group>

      <b-form-group
        :state="getState('zip_code')"
        :invalid-feedback="errors.zip_code"
        label="Postal Code">
        <b-form-input
          id="zip_code"
          v-model="fields.zip_code"
          :state="getState('zip_code')"/>
      </b-form-group>

      <b-form-group
        :state="getState('city')"
        :invalid-feedback="errors.city"
        label="City">
        <b-form-input
          id="city"
          v-model="fields.city"
          :state="getState('city')"
          required/>
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
    <b-row no-gutters>
      <b-col
        align="center"
        class="mt-4">
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
import { countries } from 'countries-list'
import { mask } from 'vue-the-mask'
import { parsePhoneNumber } from 'libphonenumber-js'

export default {
  components: {
    flatPickr
  },
  directives: {
    mask
  },

  mixins: [formsMixin],
  props: {
    modalName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      agree: false,
      countries:
        Object.values(countries).map(country => country.name).sort(this.sortAlphabetically),
      genders: [
        { value: 'male', text: 'Male' },
        { value: 'female', text: 'Female' }
      ],
      fields: {
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        date_of_birth: this.dateOfBirthMax(),
        password: '',
        password_confirmation: '',
        country: '',
        gender: 'male',
        phone: '',
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
        agreed_with_promotional: false,
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
        altFormat: 'j F Y',
        maxDate: this.dateOfBirthMax()
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
      let number = this.fields.phone
      if (number.indexOf('+') === -1) number = `+${number}`
      try {
        const phoneNumber = parsePhoneNumber(number)
        return phoneNumber.isValid()
      } catch (err) {
        return false
      }
    }
  },

  watch: {
    'fields.country': function (countryName) {
      const country = Object.values(countries).find(country => country.name === countryName)
      if (!this.isValidPhone) this.fields.phone = country ? `+${country.phone}` : '+'
    },
    'fields.phone': function (phoneNumber) {
      if (phoneNumber.indexOf('+') !== 0) this.fields.phone = `+${this.fields.phone}`
    }
  },

  methods: {
    dateOfBirthMax () {
      return moment().subtract(18, 'years').format('YYYY-MM-DD')
    },
    nextStep () {
      this.step++
    },
    previousStep () {
      this.step--
    },
    isCurrentStep (stepNumber) {
      return this.step === stepNumber
    },
    sortAlphabetically (a, b) {
      if (a < b) return -1
      if (a > b) return 1
      return 0
    },
    filterPhoneNumberCharacters (event) {
      const inputValue = event.which
      const allowedSpecChars = [32, 40, 41, 45];
      // Prevent all except [0..9()+- ]
      if (!(inputValue >= 48 && inputValue <= 57) && (allowedSpecChars.indexOf(inputValue) === -1)) {
        event.preventDefault()
      }
    },
    filterAlphabeticalCharacters (event) {
      const inputValue = event.which
      const allowedSpecChars = [32, 45, 46];
      // Prevent all except [A..Za..z -.]
      if (!(inputValue >= 65 && inputValue <= 122) && (allowedSpecChars.indexOf(inputValue) === -1)) {
        event.preventDefault()
      }
    },
    close () {
      this.$root.$emit('bv::hide::modal', this.modalName)
    },
    submit () {
      this.clearErrors()
      const input = this.fields
      this.submitting = true

      this.$store.dispatch('registerNewUser', input)
        .then(({ data: { signUp } }) => {
          this.$store.dispatch('login', signUp)
          this.$router.push({ name: 'home' })
          this.close()
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
