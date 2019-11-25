<template>
  <div>
    <b-row
      v-if="!isMobile"
      no-gutters>
      <b-col class="p-3">
        <casino-promotional-item/>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col>
        <casino-sidemenu/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import CasinoPromotionalItem from '@/views/casino/CasinoPromotionalItem'
import CasinoSidemenu from '@/views/casino/CasinoSidemenu'

export default {
  components: {
    CasinoPromotionalItem,
    CasinoSidemenu
  }
}
</script>
