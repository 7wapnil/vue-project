<template>
  <b-col
    class="p-4"
    style="min-width: 80px;
           max-width: 80px;
           min-height: 100%;
           position: relative">
    <b-row no-gutters>
      <b-col class="d-flex justify-content-center">
        <strong
          style="font-size: 10px"
          class="text-center text-arc-clr-iron mb-2">
          {{ eventStart | asCalendarDate({
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            lastDay: '[Yesterday]',
            nextWeek: 'DD.MM',
            sameElse: 'DD.MM'}) }}
        </strong>
      </b-col>

      <div class="w-100"/>

      <b-col class="d-flex align-items-start justify-content-center">
        <strong
          style="font-size: 10px"
          class="text-center text-arc-clr-iron">
          {{ eventStart | asFormattedDate('HH:mm') }}
        </strong>
      </b-col>
    </b-row>
  </b-col>
</template>
<script>
export default {
  props: {
    eventStart: {
      type: String,
      required: true
    }
  }
}
</script>
