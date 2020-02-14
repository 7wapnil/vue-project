<template>
  <b-row
    no-gutters>
    <b-col
      v-if="!depositState"
      cols="6"
      class="p-4">
      <slot name="deposit-amount"/>
      <slot name="deposit-methods"/>
    </b-col>
    <b-col
      :offset="depositState ? 3 : 0"
      cols="6"
      class="p-4">
      <slot name="deposit-bonus"/>
      <slot name="deposit-summary"/>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    depositState: {
      type: String,
      default: ''
    }
  }
}
</script>
