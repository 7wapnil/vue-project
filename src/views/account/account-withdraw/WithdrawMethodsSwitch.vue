<template>
  <div>
    <b-row
      class="p-4 bg-arc-clr-soil-darker"
      style="border-radius: 4px"
      no-gutters>
      <b-col
        v-for="(method, index) in methods"
        :key="index"
        class="d-flex align-items-center justify-content-center">

        <payment-method-icon
          :name="method.code"
          :class="{ inactive: !isActive(method.code)}"
          class="pointer"
          @click="selectMethod(method)"/>

      </b-col>
    </b-row>
  </div>
</template>

<script>

export default {
  props: {
    methods: {
      type: Array,
      default: () => []
    },
    activeMethods: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    selectMethod (selectedMethod) {
      this.$emit('change', selectedMethod)
    },
    isActive (method) {
      return this
        .activeMethods
        .filter(m => m.code === method)
        .length > 0
    }
  }
}
</script>
