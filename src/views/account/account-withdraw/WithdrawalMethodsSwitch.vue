<template>
  <b-row
    class="p-4 bg-arc-clr-soil-darker border-4"
    no-gutters>
    <b-col
      v-for="(method, index) in methods"
      :key="index"
      class="d-flex align-items-center justify-content-center">
      <payment-method-icon
        :name="method.code"
        class="pointer"
        @click="selectMethod(method)"/>
      <small
        v-if="method.details.title"
        class="text-arc-clr-iron ml-1 letter-spacing-2 pointer"
        @click="selectMethod(method)">
        {{ method.details.title }}
      </small>
    </b-col>
  </b-row>
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
    }
  }
}
</script>
