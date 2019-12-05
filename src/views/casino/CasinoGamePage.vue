<template>
  <b-row
    :style="{ backgroundImage: `url(${$attrs.item.backgroundImageUrl})`}"
    class="game-background"
    no-gutters>
    <b-col class="game-container">
      <b-embed
        :src="$attrs.launchUrl"
        type="iframe"
        aspect="16by9"
        allowfullscreen
      />
    </b-col>
    <b-col
      v-if="!isMobile"
      class="sidebar-container">
      <casino-game-sidebar/>
    </b-col>
  </b-row>
</template>

<script>
import CasinoGameSidebar from '@/views/casino/CasinoGameSidebar'

export default {
  components: { CasinoGameSidebar },
}
</script>
<style lang="scss"
       scoped>
    .game-container {
        min-height: calc(100vh - 80px);
        padding: 20px;
        .embed-responsive {
            border-radius: 6px;
            box-shadow: 2px 2px 10px 0 black;
        }
    }
    .game-background {
        background-repeat: no-repeat;
        background-size: cover;
    }
    .sidebar-container {
        max-width: 268px;
    }
</style>
