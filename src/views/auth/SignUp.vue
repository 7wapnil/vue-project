<template>
  <form @submit.prevent="submit">
    <div
      v-show="isCurrentStep(1)"
      class="step"
    >
      <input-component
        id="signup-username"
        :state="getState('username')"
        :feedback="inputFeedback['username']"
        v-model="fieldsStepOne.username"
        type="text"
        label="Username"
        bottom-bar
        aria-describedby="inputFeedbackUsername"
        feedback-id="inputFeedbackUsername"
      />
      <input-component
        id="signup-email"
        :state="getState('email')"
        :feedback="inputFeedback['email']"
        v-model="fieldsStepOne.email"
        type="text"
        label="Email"
        bottom-bar
        aria-describedby="inputFeedbackEmail"
        feedback-id="inputFeedbackEmail"
      />
      <b-row
        align-h="center"
        no-gutters
        class="mt-4">
        <b-col
          lg="3"
          md="1">
          <select-component
            id="signup-day"
            :options="getDays()"
            :state="getState('date_of_birth')"
            :feedback="inputFeedback['date_of_birth']"
            v-model="helpFields.day"
            class-name="day"
            type="select"
            label="Day"
            bottom-bar
            aria-describedby="inputFeedbackDateOfBirth"
            feedback-id="inputFeedbackDateOfBirth"
          />
        </b-col>
        <b-col lg="4">
          <select-component
            id="signup-month"
            :options="getMonths()"
            :state="getState('date_of_birth')"
            v-model="helpFields.month"
            type="select"
            class-name="month"
            label="Month"
            bottom-bar
            aria-describedby="inputFeedbackDateOfBirth"
            feedback-id="inputFeedbackDateOfBirth"
          />
        </b-col>
        <b-col
          md="2"
          lg="3">
          <select-component
            id="signup-year"
            :options="getYears()"
            :state="getState('date_of_birth')"
            v-model="helpFields.year"
            type="select"
            class-name="year"
            label="Year"
            bottom-bar
            aria-describedby="inputFeedbackDateOfBirth"
            feedback-id="inputFeedbackDateOfBirth"
          />
        </b-col>
      </b-row>
      <input-component
        id="signup-password"
        :state="getState('password')"
        :feedback="inputFeedback['password']"
        v-model="fieldsStepOne.password"
        type="password"
        label="Password"
        bottom-bar
        aria-describedby="inputFeedbackPassword"
        feedback-id="inputFeedbackPassword"
      />
      <input-component
        id="signup-password-confirmation"
        :state="getState('password_confirmation')"
        :feedback="inputFeedback['password_confirmation']"
        v-model="fieldsStepOne.password_confirmation"
        type="password"
        label="Password Confirmation"
        bottom-bar
        aria-describedby="inputFeedbackPasswordConfirmation"
        feedback-id="inputFeedbackPasswordConfirmation"
      />
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
            :options="getCountries()"
            :state="getState('country')"
            :feedback="inputFeedback['country']"
            v-model="fieldsStepOne.country"
            type="select"
            label="Country"
            bottom-bar
            aria-describedby="inputFeedbackCountry"
            feedback-id="inputFeedbackCountry"
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
        :state="getState('first_name')"
        :feedback="inputFeedback['first_name']"
        v-model="fieldsStepTwo.first_name"
        type="text"
        label="First Name"
        bottom-bar
        aria-describedby="inputFeedbackFirstName"
        feedback-id="inputFeedbackFirstName"
      />
      <input-component
        id="signup-last_name"
        :state="getState('last_name')"
        :feedback="inputFeedback['last_name']"
        v-model="fieldsStepTwo.last_name"
        type="text"
        label="Last Name"
        bottom-bar
        aria-describedby="inputFeedbackLastName"
        feedback-id="inputFeedbackLastName"
      />
      <radio-button
        id="gender"
        :options="genders"
        v-model="fieldsStepTwo.gender"
        :state="getState('gender')"
        label="Gender"
        required/>

      <input-component
        id="signup-phone"
        :state="getState('phone')"
        :feedback="inputFeedback['phone']"
        v-model="fieldsStepTwo.phone"
        type="tel"
        label="Phone Number"
        bottom-bar
        aria-describedby="inputFeedbackPhone"
        feedback-id="inputFeedbackPhone"
        @input="validatePhoneNumber()"
      />

      <!--<b-form-input-->
      <!--id="phone"-->
      <!--:v-mask="'+############'"-->
      <!--v-model="fields.phone"-->
      <!--:state="getState('phone')"-->
      <!--required-->
      <!--@keypress.native="filterPhoneNumberCharacters"/>-->
      <!--<span v-show="!isValidPhone">Invalid phone number.</span>-->
      <input-component
        id="signup-street_address"
        :state="getState('street_address')"
        :feedback="inputFeedback['street_address']"
        v-model="fieldsStepTwo.street_address"
        type="text"
        label="Street address"
        bottom-bar
      />
      <input-component
        id="signup-zip_code"
        :state="getState('zip_code')"
        :feedback="inputFeedback['zip_code']"
        v-model="fieldsStepTwo.zip_code"
        type="text"
        label="Postal Code"
        bottom-bar/>
      <input-component
        id="signup-city"
        :state="getState('city')"
        :feedback="inputFeedback['city']"
        v-model="fieldsStepTwo.city"
        type="text"
        label="City"
        bottom-bar/>

      <input-component
        id="signup-state"
        :state="getState('state')"
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
        class="btn btn-dark btn-block">
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
            @click="previousStep()">Personal Information
          </button>
          <button
            :class="{'active' : isCurrentStep(2)}"
            class="step-two"
            @click="nextStep()">Contact
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
import formsMixin from '@/mixins/forms'
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
      genders: [
        { value: 'male', text: 'Male' },
        { value: 'female', text: 'Female' }
      ],
      inputFeedback: {},
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
      feedback: '',
      helpFields: {
        day: '',
        month: '',
        year: '',
      },
      step: 2,
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
  },
  watch: {
    'fieldsStepOne.country': function (countryName) {
      const country = Object.values(countries).find(country => country.name === countryName)
      console.log(country)
      this.fieldsStepTwo.phone = country ? `+${country.phone}` : '+'
    },
    'fieldStepTwo.phone': function (phoneNumber) {
      if (phoneNumber.indexOf('+') !== 0) this.fieldsStepTwo.phone = `+${this.fieldsStepTwo.phone}`
    }
  },
  methods: {
    getMonths () {
      return moment.months()
    },
    getYears () {
      let eighteenYearsAgo = moment().subtract(18, 'years').format('YYYY')
      let startYear = moment().subtract(100, 'years').format('YYYY')
      let years = []
      while (startYear <= eighteenYearsAgo) {
        years.push(startYear++)
      }
      return years.reverse()
    },
    getDays () {
      return Array.from({ length: moment().daysInMonth() }, (v, k) => k + 1)
    },
    composeDOB () {
      for (let key in this.helpFields) {
        if (this.helpFields[key] === null || this.helpFields[key] === '') { return false }
      }

      this.fieldsStepOne.date_of_birth = this.helpFields.year + '-' +
          '0' + moment().month(this.helpFields.month).format('M') + '-' +
          this.helpFields.day
      return this.fieldsStepOne.date_of_birth
    },
    getCountries () {
      return Object.values(countries).map(country => country.name).sort()
    },
    errorHandling () {
      if (this.steps[this.step].fields.some(fieldName => !this.fieldsStepOne[fieldName])) {
        this.feedback = 'Please fill all the fields'
        return false
      } else if (this.tooYoung) {
        this.feedback = 'You must be 18 years old to proceed'
        return false
      } else if (this.fieldsStepOne.password !== this.fieldsStepOne.password_confirmation) {
        this.feedback = 'Password does not match the confirm password.'
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
    validatePhoneNumber (e) {
      let regexp = RegExp(/^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$/im)
      console.log(this.fieldsStepTwo.phone)
      console.log(regexp.test(this.fieldsStepTwo.phone))
    },
    submit () {
      this.clearErrors()
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
          }
        })
        .finally(() => {
          this.submitting = false
        })
    }
  },
}
</script>
<style lang="scss">
    @import "../../assets/styles/components/step_switcher";
    @include stepSwitcher(#47D469,#7d7d7d)
    .form-check-label {
        margin-left: 10px;
    }
</style>
