<template>
  <b-row
    class="p-2"
    no-gutters>
    <b-col>
      <b-row no-gutters>
        <b-col class="mt-1">
          <small
            class="text-arc-clr-iron text-uppercase font-weight-bold letter-spacing-2">
            {{ $t('betslip.stake') }}
          </small>
        </b-col>
      </b-row>
    </b-col>
    <b-col class="d-flex align-items-center justify-content-end">
      <masked-input
        :mask="mask"
        :disabled="isDisabled"
        v-model="stake"
        name="stake"
        type="text"
        class="betslip-input form-control"
      />
    </b-col>
  </b-row>
</template>

<script>
import MaskedInput from 'vue-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

export default {
  name: 'BetslipStake',
  components: {
    MaskedInput
  },
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    integerLimit: {
      type: Number,
      default: null
    },
    decimalLimit: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      betStake: ''
    }
  },
  computed: {
    mask () {
      return createNumberMask({
        prefix: '',
        allowDecimal: true,
        allowLeadingZeroes: true,
        includeThousandsSeparator: false,
        integerLimit: this.integerLimit,
        decimalLimit: this.decimalLimit
      })
    },
    stake: {
      get () {
        return this.betStake ? this.betStake.toString() : null
      },
      set (value) {
        this.betStake = value > 0 ? value : null
        this.$emit('stake-changed:betslip-stake', this.betStake)
      }
    }
  }
}
</script>
