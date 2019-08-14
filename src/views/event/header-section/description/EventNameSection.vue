<template>
  <b-row no-gutters>
    <b-col
      v-if="event"
      class="px-4 mb-2 letter-spacing-2 text-center">
      {{ event.description }}
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  }
}
</script>
