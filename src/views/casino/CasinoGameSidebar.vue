<template>
  <div>
    <b-row no-gutters>
      <b-col class="p-4">
        <b-button
          variant="user-profile-button"
          block
          @click="goToDeposit">
          {{ $t('casino.cta.depositNow') }}
        </b-button>
      </b-col>
    </b-row>
    <casino-recommended-games v-bind="$attrs"/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import CasinoRecommendedGames from '@/views/casino/CasinoRecommendedGames'

export default {
  components: {
    CasinoRecommendedGames
  },
  methods: {
    ...mapMutations('tabs', {
      changeTabIndex: 'changeTabIndex'
    }),
    goToDeposit () {
      this.changeTabIndex(3)
      this.$bvModal.show('AccountModal')
    }
  }
}
</script>
