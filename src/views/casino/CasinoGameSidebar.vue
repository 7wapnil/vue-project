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
    <casino-recommended-play-items ref="casinoRecommendedPlayItems"/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import CasinoRecommendedPlayItems from '@/views/casino/CasinoRecommendedPlayItems'

export default {
  name: 'CasinoGameSidebar',
  components: {
    CasinoRecommendedPlayItems
  },
  props: {
    playItem: {
      type: Object,
      required: true
    }
  },
  watch: {
    playItem: function (playItem) {
      return this.$refs.casinoRecommendedPlayItems.fetchRecommendedItems(playItem.id)
    }
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
