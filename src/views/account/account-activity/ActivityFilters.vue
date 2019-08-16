<template>
  <b-row
    class="mt-2 mb-5"
    no-gutters>
    <b-col>
      <b-button-group>
        <b-btn
          v-for="(timeButton, index) in timeButtons"
          :key="index"
          :class="{ active: dateSelected === index }"
          variant="arc-filters"
          @click="changeTimeFilter(index)">
          {{ timeButton.name }}
        </b-btn>
        <b-btn
          :class="{ active: dateSelected === 4 }"
          variant="arc-filters">
          <datepicker
            :v-model="calendarDate"
            :calendar-button="true"
            wrapper-class="calendar"
            input-class="date-input"
            calendar-button-icon="arc arc-calender text-arc-clr-iron"
            @selected="calendarChangeTimeFilter"
          />
        </b-btn>
      </b-button-group>
      <b-button-group class="ml-4">
        <b-btn
          v-for="(stateButton, index) in stateButtons"
          :key="index"
          :class="{ active: betStateSelected === index }"
          variant="arc-filters"
          @click="changeBetFilter(index)">
          {{ stateButton.name }}
        </b-btn>
      </b-button-group>
    </b-col>
  </b-row>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'

export default {
  components: {
    'datepicker': Datepicker
  },
  data () {
    return {
      calendarDate: new Date(),
      dateSelected: 0,
      betStateSelected: 0,
      timeButtons: [
        {
          name: 'All',
          event: ''
        },
        {
          name: 'Today',
          event: 'today'
        },
        {
          name: 'Week',
          event: 'week'
        },
        {
          name: 'Month',
          event: 'month'
        },
      ],
      stateButtons: [
        {
          name: 'All',
          event: ''
        },
        {
          name: 'Won',
          event: 'won'
        },
        {
          name: 'Lost',
          event: 'lost'
        },
      ]
    }
  },
  methods: {
    calendarChangeTimeFilter (date) {
      this.dateSelected = 4
      this.$emit('table-filtered-by-time', { event: moment(date).format('DD/MM/YYYY') })
    },
    changeTimeFilter (index) {
      this.dateSelected = index
      this.$emit('table-filtered-by-time', this.timeButtons[index])
    },
    changeBetFilter (index) {
      this.betStateSelected = index
      this.$emit('table-filtered-by-bet-state', this.stateButtons[index])
    }
  },
}
</script>
