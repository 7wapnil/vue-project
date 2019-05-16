<template>
  <div v-if="getBonuses.length">
    <h3 class="mb-0 font-weight-light">
      {{ $t('account.tabs.bonus') }}
    </h3>
    <information-section
      :bonus-achieved="getCurrentBonusValue"
      :main-bonus="getMainBonus"/>
    <progress-scale :value="getMainBonusPercentageValue"/>
    <bonus-items :bonus-items="getBonuses"/>
  </div>
</template>

<script>
import ProgressScale from './ProgressScale'
import InformationSection from './InformationSection'
import BonusItems from './BonusItems'
import { mapGetters } from 'vuex'

export default {
  components: {
    ProgressScale,
    InformationSection,
    BonusItems
  },
  data () {
    return {
      loading: 0
    }
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
