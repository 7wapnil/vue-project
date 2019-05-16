<template>
  <div>
    <h3 class="mb-0 font-weight-light">
      {{ $t('account.tabs.bonus') }}
    </h3>
    <bonus-placeholder v-if="!getBonuses.length"/>
    <div v-if="getBonuses.length">
      <information-section
        :bonus-achieved="getCurrentBonusValue"
        :main-bonus="getMainBonus"/>
      <progress-scale :value="getMainBonusPercentageValue"/>
      <bonus-items :bonus-items="getBonuses"/>
    </div>
  </div>

</template>

<script>
import ProgressScale from './ProgressScale'
import InformationSection from './InformationSection'
import BonusItems from './BonusItems'
import BonusPlaceholder from './BonusPlaceholder'
import { mapGetters } from 'vuex'

export default {
  components: {
    ProgressScale,
    InformationSection,
    BonusItems,
    BonusPlaceholder
  },
  computed: {
    ...mapGetters('bonus', [
      'getMainBonus',
      'getBonuses',
      'getCurrentBonusValue',
      'getMainBonusPercentageValue'
    ])
  }
}
</script>
