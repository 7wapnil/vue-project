<template>
  <b-form-group
    :invalid-feedback="error"
    :state="state">
    <b-row no-gutters>
      <b-col
        cols="3"
        class="mr-3">
        <b-form-select
          v-model="day"
          :state="state"
          :options="days"/>
      </b-col>
      <b-col class="mr-3">
        <b-form-select
          v-model="month"
          :state="state"
          :options="months"/>
      </b-col>
      <b-col cols="3">
        <b-form-select
          v-model="year"
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

      if (this.helpFields.month) {
        month.month(parseInt(this.helpFields.month) - 1)
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
    },
    day: {
      get () { return this.helpFields.day },
      set (value) {
        this.helpFields.day = value
        this.triggerUpdate()
      }
    },
    month: {
      get () { return this.helpFields.month },
      set (value) {
        this.helpFields.month = value
        this.triggerUpdate()
      }
    },
    year: {
      get () { return this.helpFields.year },
      set (value) {
        this.helpFields.year = value
        this.triggerUpdate()
      }
    }
  },
  methods: {
    triggerUpdate () {
      const { year, month, day } = this.helpFields
      if (year && month && day) {
        this.$emit('input', `${year}-${month}-${day}`)
      }
    }
  }
}
</script>
