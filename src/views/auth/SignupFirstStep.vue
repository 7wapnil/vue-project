<template>
  <b-form
    novalidate
    @submit.prevent="toStepTwo">
    <b-form-group
      :invalid-feedback="errors.get('username')"
      :state="errors.state('username')">
      <b-form-input
        id="signup-username"
        v-model="fieldsStepOne.username"
        :state="errors.state('username')"
        autocomplete="username"
        placeholder="Username"/>
    </b-form-group>

    <b-form-group
      :invalid-feedback="errors.get('email')"
      :state="errors.state('email')">
      <b-form-input
        id="signup-email"
        v-model="fieldsStepOne.email"
        :state="errors.state('email')"
        autocomplete="email"
        placeholder="Email"/>
    </b-form-group>
    <b-form-group
      :invalid-feedback="errors.get('date_of_birth')"
      :state="errors.state('date_of_birth')">
      <b-row no-gutters>
        <b-col
          cols="3"
          class="mr-3">
          <b-form-select
            v-model="helpFields.day"
            :state="errors.state('date_of_birth')">
            <option
              :value="null"
              disabled>Day</option>
            <option
              v-for="(day, index) in monthDays"
              :key="index"
              :value="day.value">
              {{ day.label }}
            </option>
          </b-form-select>
        </b-col>
        <b-col class="mr-3">
          <b-form-select
            v-model="helpFields.month"
            :state="errors.state('date_of_birth')">
            <option
              :value="null"
              disabled>Month</option>
            <option
              v-for="(month, index) in months"
              :key="index"
              :value="month.value">
              {{ month.label }}
            </option>
          </b-form-select>
        </b-col>
        <b-col cols="3">
          <b-form-select
            v-model="helpFields.year"
            :state="errors.state('date_of_birth')">
            <option
              :value="null"
              disabled>Year</option>
            <option
              v-for="(year, index) in years"
              :key="index"
              :value="year.value">
              {{ year.label }}
            </option>
          </b-form-select>
        </b-col>
      </b-row>
    </b-form-group>
    <b-form-group
      :invalid-feedback="errors.get('password')"
      :state="errors.state('password')">
      <b-form-input
        id="signup-password"
        v-model="fieldsStepOne.password"
        :state="errors.state('password')"
        type="password"
        placeholder="Password"/>
    </b-form-group>
    <b-form-group
      :invalid-feedback="errors.get('password_confirmation')"
      :state="errors.state('password_confirmation')">
      <b-form-input
        id="signup-password-confirmation"
        v-model="fieldsStepOne.password_confirmation"
        :state="errors.state('password_confirmation')"
        type="password"
        placeholder="Repeat password"/>
    </b-form-group>
    <b-row no-gutters>
      <b-col
        cols="7"
        class="mr-3">
        <b-form-group
          :invalid-feedback="errors.get('country')"
          :state="errors.state('country')">
          <b-form-select
            v-model="fieldsStepOne.country"
            :state="errors.state('country')">
            <option
              :value="null"
              disabled>Country</option>
            <option
              v-for="(country, index) in countries"
              :key="index"
              :value="country.value">
              {{ country.text }}
            </option>
          </b-form-select>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group
          :invalid-feedback="errors.get('currency')"
          :state="errors.state('currency')">
          <b-form-select
            v-model="currency"
            :state="errors.state('currency')">
            <option
              :value="null"
              disabled>Currency</option>
            <option
              v-for="(country, index) in countries"
              :key="index"
              :value="country.currency">
              {{ country.currency }}
            </option>
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
    <b-button
      variant="user-profile-button"
      class="my-4"
      type="submit"
      block
      @click.prevent="toStepTwo">
      Next step
    </b-button>
  </b-form>
</template>

<script>
import { countries } from 'countries-list'
import moment from 'moment'

export default {
  props: {
    errors: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      fieldsStepOne: {
        username: '',
        email: '',
        date_of_birth: '',
        password: '',
        password_confirmation: '',
        country: null
      },
      countries: Object.values(countries)
        .map(country => ({
          value: country.name,
          text: country.name,
          currency: country.currency }))
        .sort(),
      years: [],
      months: [],
      currency: null,
      helpFields: {
        day: null,
        month: null,
        year: null,
      },
    }
  },
  computed: {
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
  created () {
    this.months = this.buildMonths()
    this.years = this.buildYears()
  },
  methods: {
    toStepTwo () {
      this.composeDOB()
      this.$emit('section-one-filled', this.fieldsStepOne)
    },
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
    }
  }
}
</script>
