<template>
  <b-nav
    v-if="titles"
    vertical>
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
        variables: { kind: this.titlesKind, withTournaments: true }
      }
    }
  },
  computed: {
    titleId () {
      return this.$route.params.titleId || null
    },
    titlesKind () {
      const DEFAULT_KIND = 'esports';
      const currentRouteName = this.$route.name;

      if (this.isOneOfValidKinds(currentRouteName)) {
        return currentRouteName;
      }

      return DEFAULT_KIND;
    },
  },
  methods: {
    isOneOfValidKinds (kind) {
      const VALID_KINDS = [
        'esports',
        'sports',
      ];

      return VALID_KINDS.findIndex((validKind) => kind === validKind) >= 0;
    }
  },
}
</script>
