<template>
  <div>
    <b-row
      class="mt-2 mb-4 mb-md-5"
      no-gutters>
      <b-col class="text-center text-md-left">
        <b-button-group
          ref="timeButtons"
          class="mb-4 mb-md-0">
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
            variant="arc-filters"
            @click="toggleCalendar">
            <icon
              name="calender"
              size="16px"/>
          </b-btn>
        </b-button-group>
        <b-button-group
          ref="stateButtons"
          class="ml-0 ml-md-4">
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
    <datepicker
      ref="datepicker"
      v-model="calendarDate"
      calendar-class="activity-calendar ml-4 ml-md-0"
      input-class="activity-calendar-input"
      @selected="calendarChangeTimeFilter"
    />
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'

const getDefaultData = () => {
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
}

export default {
  components: {
    'datepicker': Datepicker
  },
  data: getDefaultData,
  mounted () {
    document.addEventListener('click', this.onClickOutside)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.onClickOutside)
  },
  methods: {
    calendarChangeTimeFilter (date) {
      this.dateSelected = 4
      this.$emit('table-filtered-by-time', { event: moment(date).format('DD/MM/YYYY') })
    },
    changeTimeFilter (index) {
      this.$refs.datepicker.close()
      this.dateSelected = index
      this.$emit('table-filtered-by-time', this.timeButtons[index])
    },
    changeBetFilter (index) {
      this.lazyCloseOpenedCalendar()
      this.betStateSelected = index
      this.$emit('table-filtered-by-bet-state', this.stateButtons[index])
    },
    toggleCalendar () {
      if (this.isOpenedCalendar()) return this.lazyCloseOpenedCalendar(false)

      this.dateSelected = 4
      this.$refs.datepicker.showCalendar()
    },
    lazyCloseOpenedCalendar (lazy = true) {
      if (!this.$refs.datepicker.isOpen) return

      this.$refs.datepicker.close()
      this.dateSelected = 0
      this.$emit('table-filtered-by-time', 0, lazy)
    },
    onClickOutside (event) {
      if (!this.$refs.datepicker || !this.$refs.datepicker.$el) return
      if (!this.$refs.datepicker.isOpen) return
      if (this.isInsideClick(event)) return

      this.lazyCloseOpenedCalendar(false)
    },
    isOpenedCalendar () {
      return this.dateSelected === 4 && this.$refs.datepicker.isOpen
    },
    isInsideClick (event) {
      return this.$refs.datepicker.$el.contains(event.target) ||
             this.$refs.timeButtons.contains(event.target) ||
             this.$refs.stateButtons.contains(event.target)
    },
    resetData () {
      Object.assign(this.$data, getDefaultData())
    }
  },
}
</script>
