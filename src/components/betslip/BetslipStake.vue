<template>
  <b-row
    class="p-2"
    no-gutters>
    <b-col>
      <b-row no-gutters>
        <b-col class="mt-1">
          <small
            class="text-arc-clr-iron text-uppercase font-weight-bold letter-spacing-2">
            {{ $t('betslipItem.stake') }}
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
        @input="stakeChanged"
      />
    </b-col>
  </b-row>
</template>

<script>
import Bet from '@/models/bet'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import MaskedInput from 'vue-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { DIGITS_LIMIT_FOR_STAKE } from '@/constants/betslip-settings'

export default {
  name: 'BetslipStake',
  components: {
    MaskedInput
  },
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters('betslip', ['getBetslipStake', 'getBets']),
    mask () {
      return createNumberMask({
        prefix: '',
        allowDecimal: true,
        allowLeadingZeroes: true,
        includeThousandsSeparator: false,
        integerLimit: DIGITS_LIMIT_FOR_STAKE,
        decimalLimit: 2
      })
    },
    stake: {
      get () {
        return this.getBetslipStake ? String(this.getBetslipStake) : undefined
      },
      set (value) {
        this.setBetslipStake(value)
      }
    }
  },
  methods: {
    ...mapActions('betslip', ['resetBetInBetslip']),
    ...mapMutations('betslip', ['setBetslipStake']),
    stakeChanged () {
      this.getBets.forEach((bet) => {
        if (bet.notificationCode === Bet.notificationCodes.liability_limit_reached_error) {
          this.resetBetInBetslip(bet.oddId, true)
        }
      })
    }
  }
}
</script>
