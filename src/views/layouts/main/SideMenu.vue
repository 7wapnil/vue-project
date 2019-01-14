<template>
  <b-nav
    class="side-menu flex-nowrap"
    vertical>
    <b-nav-item
      v-for="title in titles"
      v-if="title"
      :key="title.id"
      class="sidemenu">
      <span v-b-toggle="`title-${title.id}`">
        <b-row
          class="sidebar-collapsed-title"
          no-gutters>
          <b-col
            cols="auto"
            class="px-4 py-3 sidemenu-main-logo d-flex align-items-center justify-content-center">
            <icon
              name="sidemenu-game-icon"
              size="24px"/>
          </b-col>
          <b-col class="py-4 d-flex align-items-center justify-content-start">
            <h6 class="mb-0">
              <b>
                {{ title.name }}
              </b>
            </h6>
          </b-col>
          <b-col
            cols="auto"
            class="bg-arc-clr-esport-opacity-like px-4 sidemenu-chevron d-flex align-items-center justify-content-center">
            <icon
              name="sidemenu-chevron-down"
              size="8px"/>
          </b-col>
        </b-row>
      </span>

      <b-collapse
        :id="`title-${title.id}`"
        :is-nav="true"
        :visible="title.id === titleId"
        accordion="titles-menu">

        <b-nav
          v-if="title.tournaments.length"
          class="px-2 py-3"
          vertical>
          <b-nav-item
            :to="{ name: 'title', params: { titleKind: titlesKind, titleId: title.id } }"
            class="topmenu"
            exact>
            <strong>
              All tournaments
            </strong>
          </b-nav-item>

          <b-nav-item
            v-b-toggle="`submenu-${index}`"
            v-for="(tournament, index) in title.tournaments"
            :key="index"
            role="button"
            class="topmenu"
            tabindex="0">

            <b-row no-gutters>
              <b-col class="text-truncate mr-4">
                {{ tournament.name }}
              </b-col>

              <b-col
                cols="auto"
                class="d-flex align-items-center justify-content-center">
                <icon
                  name="sidemenu-triangle-down"
                  size="6px"/>
              </b-col>
            </b-row>

            <b-collapse
              :id="`submenu-${index}`"
              accordion="sub-menu"
              role="tabpanel">

              <b-nav-item
                v-for="(submenu, index) in submenuItems"
                :key="index"
                class="submenu">
                {{ submenu.title }}
              </b-nav-item>
            </b-collapse>
          </b-nav-item>
        </b-nav>
      </b-collapse>
    </b-nav-item>
  </b-nav>
</template>

<script>
import TitlesList from '@/components/TitlesList'
import { TITLES_QUERY } from '@/graphql'

const POLL_INTERVAL = 10000

export default {
  components: {
    TitlesList
  },
  data () {
    return {
      submenuItems: [
        { title: 'Submenu1' },
        { title: 'Submenu2' },
        { title: 'Submenu3' }
      ]
    }
  },
  apollo: {
    titles () {
      return {
        query: TITLES_QUERY,
        variables: { kind: this.titlesKind, withTournaments: true },
        pollInterval: POLL_INTERVAL
      }
    }
  },
  computed: {
    titleId () {
      return this.$route.params.titleId || null
    },
    titlesKind () {
      const DEFAULT_KIND = 'esports';
      const currentTitleKind =
        this.$route.params.titleKind ||
        this.$store.state.titleFilters.titleKind;

      if (this.isOneOfValidKinds(currentTitleKind)) {
        return currentTitleKind;
      }

      return DEFAULT_KIND;
    },
  },
  watch: {
    '$route' () {
      this.$apollo.queries.titles.refetch({
        kind: this.titlesKind,
      });
    }
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
