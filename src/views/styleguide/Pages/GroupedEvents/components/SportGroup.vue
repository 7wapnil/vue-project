<template>
  <div class="mb-4">
    <header class="d-flex pl-2">
      <h2 class="events-list-title font-weight-light">
        <icon
          class="text-arc-clr-esport-glow px-3"
          name="sidemenu-game-icon"
          size="24px"/>
        CS:GO
      </h2>

      <span class="align-self-center events-list-upcoming-events-hint">
        1 event starts in 20min
      </span>

      <button class="btn border-0 d-flex events-list-upcoming-events-kind-btn">
        CS:GO upcoming
        <icon
          class="align-self-center text-arc-clr-esport-glow pl-4"
          name="arrow-right"
          size="12px"/>
      </button>

    </header>

    <tournament-group
      v-for="x in 2"
      :key="x" />

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
