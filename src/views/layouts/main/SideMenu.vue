<template>
    <b-nav
      vertical v-if="titles">
      <b-nav-item
        v-b-toggle="`title-${title.id}`"
        v-for="title in titles"
        :key="title.id">

        <div class="sidebar-collapsed-title">{{ title.name }}</div>

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
        variables: { kind: 'esports', withTournaments: true },
        result() {
          console.log('GOT TITLES')
        }
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
