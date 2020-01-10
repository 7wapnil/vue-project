<template>
  <b-form-group
    :invalid-feedback="form.errors.get('dateOfBirth')"
    :state="form.errors.state('dateOfBirth')">
    <b-row no-gutters>
      <b-col
        cols="4"
        md="4"
        class="mb-3 mb-md-0 pr-1 pr-md-3">
        <b-form-select
          id="signup-day"
          v-model="model.day"
          :state="form.errors.state('dateOfBirth')"
          :options="days"
          @input="form.clearError(['dateOfBirth'])"/>
      </b-col>
      <b-col
        cols="4"
        md="4"
        class="pr-1 pr-md-3 mb-3 mb-md-0">
        <b-form-select
          id="signup-month"
          v-model="model.month"
          :state="form.errors.state('dateOfBirth')"
          :options="months"
          @input="onMonthChange"/>
      </b-col>
      <b-col
        cols="4"
        md="4">
        <b-form-select
          id="signup-year"
          v-model="model.year"
          :state="form.errors.state('dateOfBirth')"
          :options="years"
          @input="onYearChange"/>
      </b-col>
    </b-row>
  </b-form-group>
</template>

<script>
import moment from 'moment'
import { Form } from '@/helpers'

export default {
  value: {
    type: [String, null],
    default: ''
  },
  props: {
    model: {
      type: Object,
      default: () => {}
    },
    form: {
      type: Form,
      required: true
    }
  },
  computed: {
    days () {
      const days = [{ value: null, text: 'Day' }]
      const daysInMonth = this.getNumberOfDaysInMonth()

      for (let i = 1; i <= daysInMonth; ++i) {
        days.push({
          value: (i < 10 ? `0${i}` : `${i}`),
          text: i
        })
      }

      return days
    },
    months () {
      const months = [{ value: null, text: 'Month' }]
      const m = moment()

      for (let i = 0; i < 12; ++i) {
        m.month(i)
        months.push({
          value: m.format('MM'),
          text: m.format('MMMM')
        })
      }

      return months
    },
    years () {
      const years = [{ value: null, text: 'Year' }]
      let minYear = moment().subtract(100, 'years').format('YYYY')
      let maxYear = moment().subtract(18, 'years').format('YYYY')

      while (maxYear >= minYear) {
        years.push({
          value: maxYear,
          text: maxYear
        })

        maxYear--
      }

      return years
    }
  },
  methods: {
    getNumberOfDaysInMonth () {
      const dateTime = moment()

      if (this.model.year) dateTime.year(this.model.year)
      if (this.model.month) dateTime.month(parseInt(this.model.month) - 1)

      return dateTime.daysInMonth()
    },
    onMonthChange (e) {
      this.model.month = e
      const daysInMonth = this.getNumberOfDaysInMonth()
      if (this.model.day > daysInMonth) this.model.day = daysInMonth
      this.form.clearError(['dateOfBirth'])
    },
    onYearChange (e) {
      this.model.year = e
      const daysInMonth = this.getNumberOfDaysInMonth()
      if (this.model.day > daysInMonth) this.model.day = daysInMonth
      this.form.clearError(['dateOfBirth'])
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-group .is-invalid {
    margin-bottom: 0;
  }
</style>
