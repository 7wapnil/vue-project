<template>
  <b-row no-gutters>
    <b-col class="p-md-0 py-2 px-4">
      <b-alert
        :show="!!bonusError"
        variant="danger"
        class="my-2">
        {{ bonusError }}
      </b-alert>
      <b-alert
        v-show="bonusSuccess"
        variant="success"
        class="my-2">
        {{ bonusSuccess }}
      </b-alert>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    bonusError: {
      type: String,
      default: null
    },
    bonusSuccess: {
      type: String,
      default: ''
    }
  }
}
</script>
