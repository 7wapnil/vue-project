<template>
  <div>
    <b-breadcrumb
      :items="composedBreadcrumbs"
      class="w-100 letter-spacing-2"/>
  </div>
</template>
<script>
export default {
  computed: {
    getCache () {
      return this.$apolloProvider.defaultClient.cache.data.data
    },
    getTitle () {
      return this.getCache[`Title:${this.$route.params.titleId}`]
    },
    getCategory () {
      return this.getCache[`Scope:${this.$route.params.categoryId}`]
    },
    getTournament () {
      return this.getCache[`Scope:${this.$route.params.tournamentId}`]
    },
    titleLink () {
      return {
        text: this.getTitle.name,
        to: { name: 'title', params: { titleKind: this.$route.params.titleKind, titleId: this.$route.params.titleId, } }
      }
    },
    categoryLink () {
      if (!this.$route.params.categoryId) return null
      return {
        text: this.getCategory.name,
        to: { name: 'category-tournaments',
          params: {
            titleKind: this.$route.params.titleKind,
            titleId: this.$route.params.titleId,
            categoryId: this.$route.params.categoryId
          }
        }
      }
    },
    tournamentLink () {
      let result = null
      if (this.$route.params.tournamentId) {
        result = {
          text: this.getTournament.name,
          to: { name: 'tournament', params: { titleKind: this.$route.params.titleKind, titleId: this.$route.params.titleId, tournamentId: this.$route.params.tournamentId } }
        }
      }
      return result
    },
    composedBreadcrumbs () {
      return [this.titleLink, this.categoryLink, this.tournamentLink].filter((link) => !!link)
    }
  }
}
</script>
