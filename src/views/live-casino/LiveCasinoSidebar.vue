<template>
  <div>
    <b-row
      v-if="!isMobile"
      no-gutters>
      <b-col class="p-3">
        <live-casino-promotional-item/>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col>
        <live-casino-sidemenu/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import LiveCasinoPromotionalItem from '@/views/live-casino/LiveCasinoPromotionalItem'
import LiveCasinoSidemenu from '@/views/live-casino/LiveCasinoSidemenu'

export default {
  components: {
    LiveCasinoPromotionalItem,
    LiveCasinoSidemenu
  }
}
</script>
