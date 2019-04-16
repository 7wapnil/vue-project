<template>
  <b-row
    v-if="event"
    style="margin-top: 85px;"
    class="pt-4 pb-5 w-100"
    no-gutters>
    <b-col class="text-center pt-4">
      <b-row no-gutters>
        <b-col class="font-weight-bold my-4 letter-spacing-2">
          <!--{{ event.competitors[0].name }}-->
        </b-col>

        <div class="w-100"/>

        <b-col class="mt-1">
          <icon
            v-if="showicons"
            name="sidemenu-game-icon"
            size="56px"/>
        </b-col>
      </b-row>
    </b-col>

    <b-col class="text-center">
      <b-row no-gutters>
        <b-col class="mb-2 letter-spacing-2">
          {{ event.description }}
        </b-col>

        <div class="w-100"/>

        <b-col class="mt-4">
          <span class="text-arc-clr-iron text-uppercase font-size-11 letter-spacing-2">
            Starts
          </span>
        </b-col>

        <div class="w-100"/>

        <b-col class="mb-4 letter-spacing-2">
          {{ event.start_at | asFormattedDate('DD MMMM HH:mm') }}
        </b-col>

        <div class="w-100"/>

        <b-col class="mt-1">
          <span
            v-if="event.state.score"
            class="text-arc-clr-iron text-uppercase font-size-11 letter-spacing-2">
            Score
          </span>
        </b-col>

        <div class="w-100"/>

        <b-col class="mb-4 letter-spacing-2">
          {{ event.state.score }}
        </b-col>

        <div class="w-100"/>

        <b-col class="mt-1">
          <span
            v-if="event.state.time"
            class="text-arc-clr-iron text-uppercase font-size-11 letter-spacing-2">
            Time
          </span>
        </b-col>

        <div class="w-100"/>

        <b-col class="letter-spacing-2">
          {{ event.state.time }}
        </b-col>

      </b-row>
    </b-col>

    <b-col class="text-center pt-4">
      <b-row no-gutters>
        <b-col class="font-weight-bold my-4 letter-spacing-2">
          <!--{{ event.competitors[1].name }}-->
        </b-col>
      </b-row>
      <b-row no-gutters>
        <b-col class="mt-1">
          <icon
            v-if="showicons"
            name="sidemenu-game-icon"
            size="56px"/>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
export default {
  props: {
    event: {
      type: Object,
      required: true
    },
    showicons: {
      type: Boolean,
      default: true
    }
  },
}
</script>
