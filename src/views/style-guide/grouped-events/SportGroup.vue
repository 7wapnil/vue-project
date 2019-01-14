<template>
  <div class="mb-4">
    <!-- SPORT GROUP HEADER -->
    <header class="d-flex pl-2">
      <!-- SPORT WITH ICON -->
      <h2 class="events-list-title font-weight-light">
        <icon
          class="text-arc-clr-esport-glow px-3"
          name="sidemenu-game-icon"
          size="24px"/>
        CS:GO
      </h2>
      <!-- SPORT WITH ICON  END-->

      <!-- UPCOMING EVENTS HIGHLIHT -->
      <span class="align-self-center events-list-upcoming-events-hint">
        1 event starts in 20min
      </span>
      <!-- UPCOMING EVENTS HIGHLIHT END -->

      <!-- UPCOMING EVENTS LINK -->
      <button class="btn border-0 d-flex events-list-upcoming-events-kind-btn">
        CS:GO upcoming
        <icon
          class="align-self-center text-arc-clr-esport-glow pl-4"
          name="arrow-right"
          size="12px"/>
      </button>
      <!-- UPCOMING EVENTS LINK END-->
    </header>
    <!-- SPORT GROUP HEADER END -->

    <!-- TOURNAMENTS LIST -->
    <tournament-group
      v-for="x in 2"
      :key="x" />
      <!-- TOURNAMENTS END -->
  </div>
</template>
<script>
import TournamentGroup from './TournamentGroup.vue'

export default {
  components: {
    TournamentGroup
  }
}
</script>
