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
      <div class="main-body-error"> {{ responseText }}</div>
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

<style lang="scss">
.main-body-error {
    background-color: #7d7d7d;
    border-radius: 4px;
    padding: 10px;
    margin: 10px 0;
}
</style>
