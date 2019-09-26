<template>
  <b-row
    class="yoba"
    no-gutters>
    <b-col class="d-flex align-items-center justify-content-start">
      <span class="text-truncate text-capitalize font-weight-bold text-arc-clr-gold font-size-14 letter-spacing-2">
        {{ item.title }}
      </span>
    </b-col>
    <b-col
      v-if="item.children && item.children.length"
      cols="auto"
      class="d-flex align-items-center justify-content-center">
      <icon
        name="sidemenu-chevron-down"
        color="arc-clr-grey-light"
        size="8px"/>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
