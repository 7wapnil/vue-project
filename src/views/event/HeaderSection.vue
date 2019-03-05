<template>
  <b-row
    v-if="event"
    class="pt-4 pb-5"
    no-gutters>
    <b-col class="text-center pt-4">
      <b-row no-gutters>
        <b-col class="font-weight-bold my-4">
          {{ event.competitors[0].name }}
        </b-col>

        <div class="w-100"/>

        <b-col class="mt-1">
          <icon
            name="sidemenu-game-icon"
            size="56px"/>
        </b-col>
      </b-row>
    </b-col>

    <b-col class="text-center">
      <b-row no-gutters>
        <b-col class="mb-2">
          {{ event.description }}
        </b-col>

        <div class="w-100"/>

        <b-col class="mt-4">
          <span
            class="text-arc-clr-iron text-uppercase font-size-11">
            Starts
          </span>
        </b-col>

        <div class="w-100"/>

        <b-col class="mb-4">
          {{ event.start_at | asFormattedDate }}
        </b-col>

        <div class="w-100"/>

        <b-col class="mt-1">
          <span
            v-if="event.state.score"
            class="text-arc-clr-iron text-uppercase font-size-11">
            Score
          </span>
        </b-col>

        <div class="w-100"/>

        <b-col class="mb-4">
          {{ event.state.score }}
        </b-col>

        <div class="w-100"/>

        <b-col class="mt-1">
          <span
            class="text-arc-clr-iron text-uppercase font-size-11">
            Match type
          </span>
        </b-col>

        <div class="w-100"/>

        <b-col class="mt-1">
          <span
            v-if="event.state.time"
            class="text-arc-clr-iron text-uppercase font-size-11">
            Time
          </span>
        </b-col>

        <div class="w-100"/>

        <b-col>
          {{ event.state.time }}
        </b-col>

      </b-row>
    </b-col>

    <b-col class="text-center pt-4">
      <b-row no-gutters>
        <b-col class="font-weight-bold my-4">
          {{ event.competitors[1].name }}
        </b-col>
      </b-row>
      <b-row no-gutters>
        <b-col class="mt-1">
          <icon
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
      default: () => {}
    }
  }
}
</script>
