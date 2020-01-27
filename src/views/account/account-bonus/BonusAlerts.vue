<template>
  <b-row no-gutters>
    <b-col class="p-md-0 py-2 px-4">
      <b-alert
        :show="showMessage"
        :variant="mapVariant"
        class="my-2">
        {{ cancelBonusMessage }}
      </b-alert>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    cancelBonusStatus: {
      type: String,
      default: null
    },
    cancelBonusMessage: {
      type: String,
      default: null
    }
  },
  computed: {
    mapVariant () {
      if (this.cancelBonusStatus === 'error') return 'danger'

      return 'success'
    },
    showMessage () {
      return this.cancelBonusMessage !== null
    }
  }
}
</script>
