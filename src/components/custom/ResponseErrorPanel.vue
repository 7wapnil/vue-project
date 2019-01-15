<template>
  <b-row
    v-if="responseText"
    no-gutters
    class="mt-4"
    align="center">
    <b-col
      lg="10"
      md="12"
      class="mr-auto ml-auto ml-3"
      block>
      <div class="p-2 my-2 text-center bg-arc-clr-soil-light"> {{ responseText }}</div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'ResponseErrorPanel',
  props: {
    responseText: {
      type: String,
      default: ''
    }
  }
}
</script>
