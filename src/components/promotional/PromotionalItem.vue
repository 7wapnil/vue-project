<template>
  <div v-if="!isLoggedIn || isLoggedIn && !getBetsCount">
    <div class="px-2 py-4 text-center text-arc-clr-iron">
      <h6 class="m-0">Sign up now and get bonuses!</h6>
    </div>
    <b-img
      :src="bannerKind[$route.params.titleKind]"
      class="p-0 mb-0 mx-2 promotional-area"
      alt="arcanebet-promocode"
      @click="getBonus"/>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import esports from '@/assets/images/promotionals/arcanebet-esports-promo-banner.png'
import sports from '@/assets/images/promotionals/arcanebet-sports-promo-banner.png'

export default {
  computed: {
    ...mapGetters('betslip', [
      'getBetsCount'
    ]),
    ...mapGetters([
      'isLoggedIn'
    ]),
    bannerKind () {
      return {
        esports,
        sports
      }
    }
  },
  methods: {
    ...mapMutations('tabs', {
      changeTabIndex: 'changeTabIndex'
    }),
    getBonus () {
      return this.isLoggedIn ? this.showProfile() : this.showLogin()
    },
    showProfile () {
      this.changeTabIndex(1)
      this.$root.$emit('bv::show::modal', 'AccountModal')
    },
    showLogin () {
      this.$root.$emit('bv::show::modal', 'AuthModal')
    }
  }
}
</script>
