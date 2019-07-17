<template>
  <b-col class="p-4">
    <b-row
      v-for="(bonusDetail, index) in bonusDetails"
      :key="index"
      no-gutters>
      <b-col class="text-left mr-4">
        <span class="text-arc-clr-iron font-size-14 letter-spacing-2">
          {{ bonusDetail.label }}:
        </span>
      </b-col>
      <b-col class="text-left d-flex align-items-center">
        <span class="text-arc-clr-iron-light font-size-14 letter-spacing-2">
          {{ bonusDetail.data }}
        </span>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
export default {
  props: {
    mainBonus: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      bonusDetails: [
        {
          label: this.$t('account.bonus.bonusAwarded'),
          data: this.mainBonus.amount
        },
        {
          label: this.$t('account.bonus.rolloverRequired'),
          data: this.mainBonus.rolloverInitialValue
        },
        {
          label: this.$t('account.bonus.minimumOdds'),
          data: this.mainBonus.minOddsPerBet
        },
        {
          label: this.$t('account.bonus.maximumRolloverPerBet'),
          data: this.mainBonus.maxRolloverPerBet
        },
        {
          label: this.$t('account.bonus.expiryDate'),
          data: this.$options.filters.asFormattedDate(this.mainBonus.expiresAt, 'DD/MM/YYYY', 'DD.MM.YY')
        },
      ]
    }
  }
}
</script>
