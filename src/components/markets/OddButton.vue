<template>
  <button
    :disabled="isDisabled"
    :class="{'btn-outline-success': raised, 'btn-outline-danger': !raised}"
    class="btn btn-block btn-outline-primary mb-2"
    @click="obbButtonClick">
    {{ odd.name }} {{ odd.value }} ({{ diff > 0 ? '+' : '' }}{{ diff }})
  </button>
</template>

<script>
import { INACTIVE_STATUS as ODD_INACTIVE_STATUS } from '@/models/odd'

export default {
  props: {
    odd: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      raised: null,
      diff: 0
    }
  },
  computed: {
    isDisabled () {
      return this.disabled || this.odd.status === ODD_INACTIVE_STATUS
    }
  },
  watch: {
    odd (oldOdd, newOdd) {
      this.diff = (newOdd.value - oldOdd.value).toFixed(2)
      this.raised = oldOdd.value < newOdd.value
    }
  },
  methods: {
    obbButtonClick () {
      if (this.isDisabled) { return }
      this.$store.dispatch('addNewEmptyBet', this.odd)
    }
  },
}
</script>
