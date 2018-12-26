<template>
  <b-dropdown-item
    text-variant="white"
    class="p-0 text-left">
    <b-row
      no-gutters
      class="px-3 pt-3 pb-0">
      <b-col align="center">
        <small class="text-arc-clr-iron">
          BONUS ACHIVED
        </small>
      </b-col>
    </b-row>

    <b-row no-gutters>
      <b-col align="center">
        <small class="text-arc-clr-white">
          468
        </small>
      </b-col>
    </b-row>

    <b-row
      no-gutters
      class="px-3">
      <b-col>
        <b-progress
          :value="value"
          height="12px"/>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col class="pt-1 pb-3 d-flex justify-content-center align-items-center">
        <small>
          <strong class="progress-bar-percent">
            {{ value }}%
          </strong>
        </small>
      </b-col>
    </b-row>
    <b-dropdown-divider class="border-arc-dropdown-divider m-0"/>
    <b-row
      class="p-3"
      no-gutters>
      <b-col class="d-flex  align-items-center">
        <small class="text-arc-clr-iron-light">
          How to get bonuses
        </small>
      </b-col>
      <b-col
        cols="2"
        class="d-flex justify-content-end align-items-center">
        <icon
          name="wallet-arrow-right"
          size="10px"/>
      </b-col>
    </b-row>

  </b-dropdown-item>
</template>
<script>
export default {
  data () {
    return {
      value: 50
    }
  }
}
</script>
