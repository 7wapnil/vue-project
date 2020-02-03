<template>
  <b-list-group>
    <b-list-group-item
      v-for="method in methods"
      :key="method.id"
      action
      class="d-flex align-items-center justify-content-start pointer bg-arc-clr-soil-light"
      @click="selectMethod(method)">

      <payment-method-icon
        :name="method.code"
        class="mr-4"/>

      <span
        v-if="method.details.title"
        class="text-arc-clr-iron ml-1 letter-spacing-2">
        {{ method.details.title }}
      </span>
    </b-list-group-item>
  </b-list-group>
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
      this.$emit('update:withdraw:method', selectedMethod)
    }
  }
}
</script>
