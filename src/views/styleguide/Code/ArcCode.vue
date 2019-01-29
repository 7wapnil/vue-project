<template>
  <b-card
    no-body
    style="border-radius: 4px; border: 1px solid #FFB960"
    class="my-3 bg-arc-clr-soil-dark">
    <b-row no-gutters>
      <b-col
        cols="auto"
        class="p-4 d-flex justify-content-center align-items-center">
        <icon
          name="chevron-right"
          size="12px"/>
      </b-col>
      <b-col
        v-if="codeText"
        class="p-4 text-truncate">
        <h5 class="m-0 text-arc-clr-gold d-inline-flex align-items-center">
          {{ codeText }}
        </h5>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  props: {
    codeText: {
      type: String,
      default: ''
    }
  }
}
</script>
