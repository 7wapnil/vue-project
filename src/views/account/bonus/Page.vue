<template>
  <div>
    <h3 class="mb-0 font-weight-light">
      Bonus
    </h3>
    <information-section/>
    <progress-scale :value="value"/>
    <bonus-items :bonus-items="bonusItems"/>
  </div>
</template>

<script>
import ProgressScale from './ProgressScale'
import InformationSection from './InformationSection'
import BonusItems from './BonusItems'

export default {
  components: {
    ProgressScale,
    InformationSection,
    BonusItems
  },
  data () {
    return {
      value: 50,
      bonusItems: [
        { name: 'Bonus name',
          status: 'All completed',
          overallStatus: 'Achived'
        },
        { name: 'Bonus name',
          status: 'All completed',
          overallStatus: 'Achived'
        },
        { name: 'Bonus name',
          overallStatus: '12 of 15 completed',
          status: 'Expires in 3 days 12 hours and 15 minutes',
        },
        { name: 'Bonus name',
          overallStatus: '9 of 15 completed',
          status: 'Expires in 14 days',
        }
      ]
    }
  }
}
</script>
