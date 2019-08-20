<template>
  <div v-if="titles.length">
    <b-breadcrumb
      :items="composedBreadcrumbs"
      class="px-4 w-100 letter-spacing-2"/>
  </div>
</template>

<script>
import { TITLES_QUERY } from '@/graphql'

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
        if (title.id === this.$route.params.titleId) {
          currentTitle = {
            id: title.id,
            name: title.shortName,
            scopes: title.eventScopes
          }
        }
      })

      return currentTitle
    },
    getTournament () {
      return this.getTitle.scopes.find((scope) => {
        return scope.kind === 'tournament' &&
                scope.id === this.$route.params.tournamentId
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
        return scope.kind === 'category' &&
                scope.id === categoryId
      })
    },
    getEventScopeID () {
      return this.getTournament ? this.getTournament.eventScopeId : null
    },
    titleLink () {
      if (this.getTitle) {
        return {
          text: this.getTitle.name,
          to: {
            name: 'title',
            params: { titleKind: this.$route.params.titleKind, titleId: this.$route.params.titleId }
          }
        }
      }
    },
    categoryLink () {
      if (this.getCategory) {
        return {
          text: this.getCategory.name,
          to: {
            name: 'category-tournaments',
            params: {
              titleKind: this.$route.params.titleKind,
              titleId: this.$route.params.titleId,
              categoryId: this.getCategory.id
            }
          }
        }
      }
    },
    tournamentLink () {
      if (this.getTournament) {
        return {
          text: this.getTournament.name,
          to: {
            name: 'tournament',
            params: {
              titleKind: this.$route.params.titleKind,
              titleId: this.$route.params.titleId,
              tournamentId: this.$route.params.tournamentId
            }
          }
        }
      }
    },
    composedBreadcrumbs () {
      return [this.titleLink, this.categoryLink, this.tournamentLink].filter((link) => !!link)
    }
  }
}
</script>
