<template>
  <b-row
    class="bonus-overview-section p-4 my-4"
    no-gutters>
    <b-col
      cols="4"
      class="d-flex align-items-center justify-content-center mt-4">
      <div class="text-center">
        <h6 class="mb-0 font-weight-bold letter-spacing-2 text-arc-clr-gold">
          {{ $t('account.bonus.bonusAchieved') }}
        </h6>
        <span class="font-size-36 font-weight-bold text-arc-clr-white letter-spacing-5" >
          {{ bonusAchieved }}
        </span>
      </div>
    </b-col>
    <b-col>
      <b-row>
        <b-col>
          <span class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">{{ $t('account.bonus.bonusAwarded') }}:</span>
        </b-col>
        <b-col>
          <span class="ml-4 mb-0 pl-2 text-arc-clr-iron-light font-size-14 letter-spacing-2">{{ mainBonus.rolloverInitialValue }}</span>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <span class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">{{ $t('account.bonus.rolloverRequired') }}:</span>
        </b-col>
        <b-col>
          <span class="ml-4 mb-0 pl-2 text-arc-clr-iron-light font-size-14 letter-spacing-2">{{ mainBonus.rolloverInitialValue }}</span>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <span class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">{{ $t('account.bonus.minimumOdds') }}:</span>
        </b-col>
        <b-col>
          <span class="ml-4 mb-0 pl-2 text-arc-clr-iron-light font-size-14 letter-spacing-2">{{ mainBonus.minOddsPerBet }}</span>
        </b-col>

      </b-row>
      <b-row>
        <b-col>
          <span class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">{{ $t('account.bonus.maximumRolloverPerBet') }}:</span>
        </b-col>
        <b-col>
          <span class="ml-4 mb-0 pl-2 text-arc-clr-iron-light font-size-14 letter-spacing-2">{{ mainBonus.maxRolloverPerBet }}</span>
        </b-col>

      </b-row>
      <b-row>
        <b-col>
          <span class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">{{ $t('account.bonus.expiryDate') }}:</span>
        </b-col>
        <b-col>
          <span class="ml-4 mb-0 pl-2 text-arc-clr-iron-light font-size-14 letter-spacing-2">{{ mainBonus.expiresAt | asFormattedDate('DD/MM/YYYY', 'DD.MM.YY') }}</span>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    bonusAchieved: {
      type: Number,
      required: true
    },
    mainBonus: {
      type: Object,
      required: true
    }
  }
}
</script>
