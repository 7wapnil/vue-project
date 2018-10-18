<template>
  <div>
    <titles-list :query-options="queryOptions">

      <nav slot-scope="{ titles }">
        <b-nav vertical>
          <b-nav-item
            v-b-toggle="`title-${title.id}`"
            v-for="title in titles"
            :key="title.id">

            {{ title.name }}

            <b-collapse
              :id="`title-${title.id}`"
              :is-nav="true"
              :visible="title.id === titleId"
              accordion="titles-menu">
              <b-nav v-if="title.tournaments.length">
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
      </nav>

    </titles-list>
  </div>
</template>

<script>
import TitlesList from '@/components/TitlesList'

export default {
  components: {
    TitlesList
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
