<template>
  <div v-if="titles.length">
    <b-breadcrumb
      :items="composedBreadcrumbs"
      class="px-4 w-100 letter-spacing-2"/>
  </div>
</template>

<script>
import { TITLES_QUERY } from '@/graphql'
import { getTitleShortName } from '@/helpers/titles'
import { CATEGORY, TOURNAMENT } from '@/constants/event-scopes/kinds'

export default {
  data () {
    return {
      titles: []
    }
  },
  apollo: {
    titles () {
      return {
        query: TITLES_QUERY,
        variables () {
          return {
            kind: this.$route.params.titleKind,
            withScopes: true
          }
        }
      }
    }
  },
  computed: {
    getTitle () {
      let currentTitle

      this.titles.filter(title => {
        if (title.slug === this.$route.params.titleSlug) {
          currentTitle = {
            id: title.id,
            name: getTitleShortName(title),
            scopes: title.eventScopes
          }
        }
      })

      return currentTitle
    },
    getTournament () {
      return this.getTitle.scopes.find((scope) => {
        return scope.kind === TOURNAMENT &&
               scope.slug === this.$route.params.tournamentSlug
      })
    },
    getCategory () {
      let categoryId

      if (this.$route.params.categoryId) {
        categoryId = this.$route.params.categoryId
      } else {
        categoryId = this.getEventScopeID
      }

      return this.getTitle.scopes.find((scope) => {
        return scope.kind === CATEGORY &&
                scope.id === categoryId
      })
    },
    getEventScopeID () {
      return this.getTournament ? this.getTournament.eventScopeId : null
    },
    titleLink () {
      if (this.getTitle) {
        const titleKind = this.$route.params.titleKind
        return {
          text: this.getTitle.name,
          to: {
            name: `${titleKind}-title`,
            params: { titleKind: titleKind, titleSlug: this.$route.params.titleSlug }
          }
        }
      }
    },
    categoryLink () {
      if (this.getCategory) {
        return {
          text: this.getCategory.name
        }
      }
    },
    tournamentLink () {
      if (this.getTournament) {
        const titleKind = this.$route.params.titleKind
        return {
          text: this.getTournament.name,
          to: {
            name: `${titleKind}-tournament`,
            params: {
              titleKind: titleKind,
              titleSlug: this.$route.params.titleSlug,
              tournamentSlug: this.$route.params.tournamentSlug
            }
          }
        }
      }
    },
    composedBreadcrumbs () {
      return [this.titleLink, this.categoryLink, this.tournamentLink, {}].filter((link) => !!link)
    }
  }
}
</script>
