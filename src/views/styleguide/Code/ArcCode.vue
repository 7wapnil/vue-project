<template>
  <b-card
    no-body
    style="border-radius: 4px; border: 1px solid #FFB960"
    class="my-4 bg-arc-clr-soil-dark">
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
        class="py-4 text-truncate d-flex align-items-center">
        <h5 class="m-0 text-arc-clr-gold">
          {{ codeText }}
        </h5>
      </b-col>
    </b-row>
    <b-row v-if="this.$slots.default"
           no-gutters>
      <b-col style="margin-left: 80px">
        <span class="font-weight-bold text-arc-clr-iron">Description:</span>
        <p>
          <slot/>
        </p>
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
