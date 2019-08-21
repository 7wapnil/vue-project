<template>
  <b-col
    class="font-size-12 font-weight-normal d-flex align-items-center"
    cols="auto">

    <icon
      v-if="status"
      :color="[ status === 1 ? 'wp-clr-notif-red' : 'arc-clr-sport-glow']"
      :class="{ 'rotate-180': status === 2 }"
      name="bonus-chevron-down"
      size="7px"/>

  </b-col>
</template>

<script>
export default {
  props: {
    status: {
      type: Number,
      default: null
    }
  }
}
</script>
