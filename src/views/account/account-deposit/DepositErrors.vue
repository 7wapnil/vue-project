<template>
  <b-row
    v-if="depositState"
    no-gutters>
    <b-col class="p-md-0 py-2 px-4">
      <b-alert
        :show="!!depositState"
        :variant="mapDepositState"
        class="mb-0">
        {{ depositMessage }}
      </b-alert>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    depositState: {
      type: String,
      default: null
    },
    depositMessage: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      variantMap: {
        pending: 'warning',
        success: 'success',
        fail: 'danger'
      }
    }
  },
  computed: {
    mapDepositState () {
      return this.variantMap[this.depositState]
    }
  }
}
</script>
