<template>
  <div v-if="getBonuses.length">
    <b-row
      no-gutters
      class="px-3 pt-3 pb-0">
      <b-col align="center">
        <small class="text-arc-clr-iron letter-spacing-2 text-uppercase">
          {{ $t('account.bonus.bonusAchieved') }}
        </small>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col align="center">
        <small class="text-arc-clr-white">
          {{ getCurrentBonusValue }}
        </small>
      </b-col>
    </b-row>
    <b-row
      no-gutters
      class="px-3">
      <b-col>
        <b-progress
          :value="value"
          class="arc-wallet-progress-bar"
          height="12px"/>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col class="pt-1 pb-3 d-flex justify-content-center align-items-center">
        <small>
          <strong class="arc-wallet-progress-bar-percent">
            {{ getMainBonusPercentageValue }}%
          </strong>
        </small>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      value: 50
    }
  },
  computed: {
    ...mapGetters('bonus', [
      'getBonuses',
      'getCurrentBonusValue',
      'getMainBonusPercentageValue'
    ])
  }
}
</script>
