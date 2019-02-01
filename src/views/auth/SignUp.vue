<template>
  <form @submit.prevent="submit()">
    <div
      v-show="isCurrentStep(1)"
      class="step"
    >
      <input-component
        id="signup-username"
        :feedback="inputFeedback['username']"
        v-model="fieldsStepOne.username"
        type="text"
        label="Username"
        bottom-bar
        aria-describedby="inputFeedbackUsername"
      />
      <input-component
        id="signup-email"
        :feedback="inputFeedback['email']"
        v-model="fieldsStepOne.email"
        type="text"
        label="Email"
        bottom-bar
        aria-describedby="inputFeedbackEmail"
      />
      <b-row
        align-h="center"
        no-gutters
        class="mt-4">
        <b-col
          lg="3"
          md="4">
          <select-component
            id="signup-day"
            :options="monthDays"
            :feedback="inputFeedback['date_of_birth']"
            v-model="helpFields.day"
            class-name="day"
            type="select"
            label="Day"
            bottom-bar
            aria-describedby="inputFeedbackDateOfBirth"
          />
        </b-col>
        <b-col
          md="4"
          lg="4">
          <select-component
            id="signup-month"
            :options="months"
            v-model="helpFields.month"
            type="select"
            class-name="month"
            label="Month"
            bottom-bar
            aria-describedby="inputFeedbackDateOfBirth"
          />
        </b-col>
        <b-col
          md="4"
          lg="3">
          <select-component
            id="signup-year"
            :options="years"
            v-model="helpFields.year"
            type="select"
            class-name="year"
            label="Year"
            bottom-bar
            aria-describedby="inputFeedbackDateOfBirth"
          />
        </b-col>
      </b-row>
      <b-row
        no-gutters
        class="mt-4">
        <b-col
          md="12"
          lg="10"
          class="mr-auto ml-auto ml-3"
          block>
          <div class="input-group-custom">
            <b-form-input
              id="signup-password"
              v-model="fieldsStepOne.password"
              type="password"
              autocomplete="new-password"
              aria-describedby="inputFeedbackPassword"
              required/>
            <span class="bar"/>
            <label
              class="text-input"
              for="signup-password">
              Password
            </label>
          </div>
        </b-col>
      </b-row>

      <b-row
        no-gutters
        class="mt-4">
        <b-col
          md="12"
          lg="10"
          class="mr-auto ml-auto ml-3"
          block>
          <div class="input-group-custom">
            <b-form-input
              id="signup-password-confirmation"
              v-model="fieldsStepOne.password_confirmation"
              type="password"
              autocomplete="new-password"
              aria-describedby="inputFeedbackPassword"
              required/>
            <span class="bar"/>
            <label
              class="text-input"
              for="signup-password-confirmation">
              Password Confirmation
            </label>
          </div>
        </b-col>
      </b-row>
      <b-row
        no-gutters
        class="mt-4">
        <b-col
          lg="10"
          md="12"
          class="mr-auto ml-auto ml-3"
          block>
          <select-component
            id="signup-country"
            :options="countries"
            :feedback="inputFeedback['country']"
            v-model="fieldsStepOne.country"
            type="select"
            label="Country"
            bottom-bar
            aria-describedby="inputFeedbackCountry"
          />
        </b-col>
      </b-row>
      <response-panel :response-text="feedback"/>
    </div>
    <div
      v-show="isCurrentStep(2)"
      class="step"
    >
      <input-component
        id="signup-first_name"
        :feedback="inputFeedback['first_name']"
        v-model="fieldsStepTwo.first_name"
        type="text"
        label="First Name"
        bottom-bar
        aria-describedby="inputFeedbackFirstName"
      />
      <input-component
        id="signup-last_name"
        :feedback="inputFeedback['last_name']"
        v-model="fieldsStepTwo.last_name"
        type="text"
        label="Last Name"
        bottom-bar
        aria-describedby="inputFeedbackLastName"
      />
      <radio-button
        id="gender"
        :options="genders"
        v-model="fieldsStepTwo.gender"
        label="Gender"
        required/>

      <input-component
        v-mask="'+############'"
        id="signup-phone"
        :feedback="inputFeedback['phone']"
        v-model="fieldsStepTwo.phone"
        :value-init="fieldsStepTwo.phone"
        type="tel"
        label="Phone Number"
        bottom-bar
        aria-describedby="inputFeedbackPhone"
      />
      <input-component
        id="signup-street_address"
        :feedback="inputFeedback['street_address']"
        v-model="fieldsStepTwo.street_address"
        type="text"
        label="Street address"
        bottom-bar
      />
      <input-component
        id="signup-zip_code"
        :feedback="inputFeedback['zip_code']"
        v-model="fieldsStepTwo.zip_code"
        type="text"
        label="Postal Code"
        bottom-bar/>
      <input-component
        id="signup-city"
        :feedback="inputFeedback['city']"
        v-model="fieldsStepTwo.city"
        type="text"
        label="City"
        bottom-bar/>

      <input-component
        id="signup-state"
        :feedback="inputFeedback['state']"
        v-model="fieldsStepTwo.state"
        type="text"
        label="Province"
        bottom-bar
      />
      <b-row
        no-gutters
        class="mt-4">
        <b-col
          md="12"
          lg="10"
          class="mr-auto ml-auto ml-3"
          block>
          <b-form-group>
            <b-form-checkbox
              v-model="fieldsStepTwo.agreed_with_promotional"
              plain>
              I agree to receive promotional content
            </b-form-checkbox>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row
        no-gutters
        class="mt-4">
        <b-col
          md="12"
          lg="10"
          class="mr-auto ml-auto ml-3"
          block>
          <b-form-group>
            <b-form-checkbox
              v-model="agree"
              plain>
              Confirm I am not underage, agree with T&C, agree with privacy policy
            </b-form-checkbox>
          </b-form-group>
        </b-col>
      </b-row>
      <button
        :disabled="submitting || ! agree"
        type="submit"
        class="btn btn-dark btn-block"
        @click.prevent="submit()">
        Register
      </button>
      <response-panel :response-text="feedback"/>
    </div>
    <b-row
      class="mt-4 mr-auto ml-auto"
      no-gutters>
      <b-col
        lg="8"
        class="mr-auto ml-auto">
        <div class="progressbar">
          <button
            :class="{'active' : isCurrentStep(1) || isCurrentStep(2)}"
            class="step-one"
            block
            @click="previousStep">Personal Information
          </button>
          <button
            :class="{'active' : isCurrentStep(2)}"
            class="step-two"
            @click="nextStep">Contact
            Information
          </button>
        </div>
      </b-col>
    </b-row>

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
import moment from 'moment'
import { mask } from 'vue-the-mask'
import { countries } from 'countries-list'
import RegularInput from '@/components/inputs/RegularInput.vue'
import SelectInput from '@/components/inputs/SelectInput.vue'
import RadioButton from '@/components/inputs/RadioButton.vue'
import ResponseErrorPanel from '@/components/custom/ResponseErrorPanel.vue'

export default {
  components: {
    'input-component': RegularInput,
    'select-component': SelectInput,
    'radio-button': RadioButton,
    'response-panel': ResponseErrorPanel
  },
  directives: { mask },

  props: {
    modalName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      agree: false,
      genders: [
        { value: 'male', text: 'Male' },
        { value: 'female', text: 'Female' }
      ],
      years: [],
      months: [],
      countries: Object.values(countries).map(country => ({ value: country.name, label: country.name })).sort(),
      errorMessages: {
        emptyFieldsError: 'Please fill all the fields.',
        ageError: 'You must be 18 years old to proceed.',
        passwordsNotMatchingError: 'Password does not match the confirm password.',
        dateError: 'Please provide valid date.'
      },
      inputFeedback: {},
      feedback: '',
      fieldsStepTwo: {
        first_name: '',
        last_name: '',
        gender: 'male',
        phone: '',
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
        agreed_with_promotional: false,
      },
      fieldsStepOne: {
        username: '',
        email: '',
        date_of_birth: '',
        password: '',
        password_confirmation: '',
        country: '',
      },
      helpFields: {
        day: '',
        month: '',
        year: '',
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
      submitting: false
    }
  },
  computed: {
    tooYoung () {
      let dateOfBirth = this.helpFields.year + '-' + this.helpFields.month + '-' + this.helpFields.day
      return moment().diff(dateOfBirth, 'years') < 18
    },
    monthDays () {
      const days = []
      const month = moment()

      if (this.helpFields.month) {
        month.month(parseInt(this.helpFields.month) - 1)
      }

      for (let i = 1; i <= month.daysInMonth(); ++i) {
        days.push({
          value: (i < 10 ? `0${i}` : `${i}`),
          label: i
        })
      }

      return days
    },

  },
  watch: {
    'fieldsStepOne.country': function (countryName) {
      const country = Object.values(countries).find(country => country.name === countryName)
      this.fieldsStepTwo.phone = country ? `+${country.phone}` : '+'
    },
    'fieldsStepTwo.phone': function (phoneNumber) {
      if (phoneNumber.indexOf('+') !== 0) {
        this.fieldsStepTwo.phone = `+${this.fieldsStepTwo.phone}`
        return this.fieldsStepTwo.phone
      }
    }
  },
  created () {
    this.months = this.buildMonths()
    this.years = this.buildYears()
  },
  methods: {
    buildMonths () {
      const months = []
      const m = moment()

      for (let i = 0; i < 12; ++i) {
        m.month(i)
        months.push({
          value: m.format('MM'),
          label: m.format('MMMM')
        })
      }

      return months
    },
    buildYears () {
      let eighteenYearsAgo = moment().subtract(18, 'years').format('YYYY')
      let startYear = moment().subtract(100, 'years').format('YYYY')
      let years = []
      while (startYear <= eighteenYearsAgo) {
        years.push({
          value: startYear,
          label: startYear
        })

        startYear++
      }

      return years.reverse()
    },
    composeDOB () {
      for (let key in this.helpFields) {
        if (this.helpFields[key] === null || this.helpFields[key] === '') { return false }
      }
      this.fieldsStepOne.date_of_birth = this.helpFields.year + '-' + this.helpFields.month + '-' + this.helpFields.day
    },
    errorHandling () {
      if (this.steps[this.step].fields.some(fieldName => !this.fieldsStepOne[fieldName])) {
        this.feedback = this.errorMessages.emptyFieldsError
        return false
      } else if (this.tooYoung) {
        this.feedback = this.errorMessages.ageError
        return false
      } else if (this.fieldsStepOne.password !== this.fieldsStepOne.password_confirmation) {
        this.feedback = this.errorMessages.passwordsNotMatchingError
        return false
      } else if (!moment(this.fieldsStepOne.date_of_birth).isValid()) {
        this.feedback = this.errorMessages.dateError
        return false
      } else {
        return true
      }
    },
    nextStep () {
      this.composeDOB()
      if (this.errorHandling()) {
        this.feedback = ''
        this.step++
      }
    },
    previousStep () {
      if (!this.isCurrentStep(1)) {
        this.step--
      }
    },
    isCurrentStep (stepNumber) {
      return this.step === stepNumber
    },
    close () {
      this.$root.$emit('bv::hide::modal', this.modalName)
    },
    submit () {
      this.inputFeedback = {}
      this.feedback = ''
      const input = { ...this.fieldsStepOne, ...this.fieldsStepTwo }
      this.submitting = true
      this.$store.dispatch('registerNewUser', input)
        .then(({ data: { signUp } }) => {
          this.$store.dispatch('login', signUp)
          this.$router.push({ name: 'home' })
          this.close()
        })
        .catch((err) => {
          if (err.graphQLErrors && err.graphQLErrors.length) {
            if (this.fieldsStepOne[err.graphQLErrors[0].path]) {
              this.previousStep()
            }
            this.inputFeedback[err.graphQLErrors[0].path] = err.graphQLErrors[0].message
            this.feedback = err.graphQLErrors[0].message
          }
        })
        .finally(() => {
          this.submitting = false
        })
    }
  },
}
</script>
