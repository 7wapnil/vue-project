<template>
  <b-row no-gutters>
    <b-col
      cols="auto"
      class="mr-4">
      <arc-circle :size="36">
        <icon
          name="bonus-chevron-down"
          size="8px"
          color="arc-clr-iron"/>
      </arc-circle>
    </b-col>
    <b-col class="d-flex align-items-center">
      <h4 class="font-weight-light mb-0">
        {{ $t(item.name) }}
      </h4>
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
