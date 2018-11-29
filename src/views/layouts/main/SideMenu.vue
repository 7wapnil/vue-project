<template>
  <b-nav
    v-if="titles"
    vertical>
    <b-nav-item
      v-b-toggle="`title-${title.id}`"
      v-for="title in titles"
      :key="title.id">

      <b-row
        class="sidebar-collapsed-title"
        no-gutters>
        <b-col
          cols="auto pr-3"
          class="sidemenu-main-logo d-flex align-items-center justify-content-center">
          <icon
            name="sidemenu-game-icon"
            size="24px"/>
        </b-col>
        <b-col class="d-flex align-items-center justify-content-start">
          {{ title.name }}
        </b-col>
        <b-col
          cols="auto"
          class="sidemenu-chevron d-flex align-items-center justify-content-end">
          <icon name="sidemenu-chevron-down"/>
        </b-col>
      </b-row>

      <b-collapse
        :id="`title-${title.id}`"
        :is-nav="true"
        :visible="title.id === titleId"
        accordion="titles-menu">
        <b-nav
          v-if="title.tournaments.length"
          vertical>
          <b-nav-item
            :to="{ name: 'esports-title', params: { titleId: title.id } }"
            exact>
            All tournaments
          </b-nav-item>
          <b-nav-item
            v-for="tournament in title.tournaments"
            :key="tournament.id"
            :to="{ name: 'esports-tournament', params: { titleId: title.id, tournamentId: tournament.id } }"
            exact>
            {{ tournament.name }}
          </b-nav-item>
        </b-nav>
      </b-collapse>
    </b-nav-item>
  </b-nav>
</template>

<script>
import TitlesList from '@/components/TitlesList'
import { TITLES_QUERY } from '@/graphql'

export default {
  components: {
    TitlesList
  },
  apollo: {
    titles () {
      return {
        query: TITLES_QUERY,
        variables: { kind: 'esports', withTournaments: true }
      }
    }
  },
  computed: {
    queryOptions () {
      return { kind: 'esports', withTournaments: true }
    },
    titleId () {
      return this.$route.params.titleId || null
    }
  }
}
</script>
