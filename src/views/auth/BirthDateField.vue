<template>
  <b-form-group
    :invalid-feedback="form.errors.get('dateOfBirth')"
    :state="form.errors.state('dateOfBirth')">
    <b-row no-gutters>
      <b-col
        cols="12"
        md="4"
        class="mr-0 mr-md-3 mb-3 mb-md-0">
        <b-form-select
          id="signup-day"
          v-model="model.day"
          :state="form.errors.state('dateOfBirth')"
          :options="days"
          @input="form.clearError(['dateOfBirth'])"/>
      </b-col>
      <b-col
        cols="12"
        md="auto"
        class="mr-0 mr-md-3 mb-3 mb-md-0">
        <b-form-select
          id="signup-month"
          v-model="model.month"
          :state="form.errors.state('dateOfBirth')"
          :options="months"
          @input="form.clearError(['dateOfBirth'])"/>
      </b-col>
      <b-col
        cols="12"
        md="3">
        <b-form-select
          id="signup-year"
          v-model="model.year"
          :state="form.errors.state('dateOfBirth')"
          :options="years"
          @input="form.clearError(['dateOfBirth'])"/>
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
  data () {
    return {
      helpFields: {
        day: null,
        month: null,
        year: null,
      }
    }
  },
  computed: {
    days () {
      const days = [{ value: null, text: 'Day' }]
      const month = moment()

      if (this.model.month) {
        month.month(parseInt(this.model.month) - 1)
      }

      for (let i = 1; i <= month.daysInMonth(); ++i) {
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
  }
}
</script>
