<template>
  <b-row
    v-if="event"
    class="event-description-section"
    no-gutters>
    <slot/>
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
