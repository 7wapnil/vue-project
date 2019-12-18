<template>
  <b-alert
    :class="classes"
    :variant="message.variant"
    :show="isShown"
    v-html="message.text"/>
</template>

<script>
import { mapGetters } from 'vuex'
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
    },
    extended: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters('betslip', ['isComboBetsMode']),
    classes () {
      switch (this.message.variant) {
        case SUCCESS:
          return 'success-message mt-3 mx-auto p-2 text-center'
        case DANGER:
          return 'bet-message-alert mt-3 mx-auto p-2 text-center'
        case ODD_DISABLED:
          return {
            'odd-disabled-message': true,
            'combo': this.isComboBetsMode,
            'extended': this.extended
          }
      }
    },
    isShown () {
      return this.show && this.message.variant
    }
  }
}
</script>
