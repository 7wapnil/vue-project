<template>
  <b-alert
    :class="classes"
    :variant="message.variant"
    :show="isShown"
    v-html="message.text"/>
</template>

<script>
import { SUCCESS, DANGER, ODD_DISABLED } from '@/constants/betslip-messages'

export default {
  props: {
    message: {
      type: Object,
      required: true
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    classes () {
      switch (this.message.variant) {
        case SUCCESS:
          return 'success-message mt-3 mx-auto p-2 text-center'
        case DANGER:
          return 'bet-message-alert mt-3 mx-auto p-2 text-center'
        case ODD_DISABLED:
          return 'odd-disabled-message'
      }
    },
    isShown () {
      return this.show && this.message.variant
    }
  }
}
</script>

<style lang="scss" scoped>
.alert-odds-changed {
  margin-top:0.3rem;
  text-align: center;
  font-size: 0.8rem;
  border: 1px solid $arc-clr-gold;
  border-radius: 4px;
  padding: 0.3rem 0;
  color: $arc-clr-gold;
}
</style>
