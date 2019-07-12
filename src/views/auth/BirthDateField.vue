<template>
  <b-form-group
    :invalid-feedback="error"
    :state="state">
    <b-row no-gutters>
      <b-col
        cols="12"
        sm="4"
        class="mr-3 mb-3 mb-sm-0">
        <b-form-select
          id="signup-day"
          v-model="model.day"
          :state="state"
          :options="days"/>
      </b-col>
      <b-col
        cols="12"
        sm="auto"
        class="mr-0 mr-sm-3 mb-3 mb-sm-0">
        <b-form-select
          id="signup-month"
          v-model="model.month"
          :state="state"
          :options="months"/>
      </b-col>
      <b-col
        cols="12"
        sm="3">
        <b-form-select
          id="signup-year"
          v-model="model.year"
          :state="state"
          :options="years"/>
      </b-col>
    </b-row>
  </b-form-group>
</template>

<script>
import moment from 'moment'

export default {
  value: {
    type: [String, null],
    default: ''
  },
  props: {
    state: {
      type: [Boolean, null],
      default: false
    },
    model: {
      type: Object,
      default: null
    },
    error: {
      type: [String, null],
      default: null
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
