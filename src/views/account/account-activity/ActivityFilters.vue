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
          variant="arc-filters"
          @click="changeTimeFilter(4)">
          <icon
            :class="[ dateSelected === 4 ? 'text-arc-clr-soil-dark' : 'text-arc-clr-iron']"
            name="calender"
            size="16px"/>
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
export default {
  data () {
    return {
      dateSelected: 0,
      betStateSelected: 0,
      timeButtons: [
        {
          name: 'All',
          event: 'time-all'
        },
        {
          name: 'Today',
          event: 'time-today'
        },
        {
          name: 'Week',
          event: 'time-week'
        },
        {
          name: 'Month',
          event: 'time-month'
        },
      ],
      stateButtons: [
        {
          name: 'All',
          event: 'bets-all'
        },
        {
          name: 'Won',
          event: 'bets-won'
        },
        {
          name: 'Partically won',
          event: 'bets-part-won'
        },
        {
          name: 'Lost',
          event: 'bets-lost'
        },
      ]
    }
  },
  methods: {
    changeTimeFilter (index) {
      if (index === 4) {
        this.dateSelected = index
        this.$emit('table-filtred-by-time', { name: 'Calendar',
          event: 'time-calendar' })
        return
      }
      this.dateSelected = index
      this.$emit('table-filtred-by-time', this.timeButtons[index])
    },
    changeBetFilter (index) {
      this.betStateSelected = index
      this.$emit('table-filtred-by-bet-state', this.stateButtons[index])
    }
  }
}
</script>