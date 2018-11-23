<template>
  <b-dropdown-item
    text-variant="white"
    class="px-3 py-3 text-left">
    <b-row no-gutters>
      <b-col>
        <small>
          BONUS ACHIVED
        </small>
      </b-col>
      <b-col cols="auto">
        <small>
          <b>
            468
          </b>
        </small>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-progress
          :value="value"
          class="my-2"/>
      </b-col>
    </b-row>

    <small>
      How to get bonuses
    </small>
  </b-dropdown-item>
</template>
<script>
export default {
  data () {
    return {
      value: 45
    }
  }
}
</script>
