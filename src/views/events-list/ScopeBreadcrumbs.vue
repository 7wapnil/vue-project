<template>
  <b-breadcrumb
    :items="composedBreadcrumbs"
    class="w-100 letter-spacing-2"/>
</template>
<script>
export default {
  computed: {
    titleLink () {
      return {
        text: 'title',
        to: { name: 'title', params: { titleKind: this.$route.params.titleKind, titleId: this.$route.params.titleId, } }
      }
    },
    categoryLink () {
      let result = null
      if (this.$route.params.categoryId) {
        result = {
          text: 'category',
          to: { name: 'category-tournaments', params: { titleKind: this.$route.params.titleKind, titleId: this.$route.params.titleId, categoryId: this.$route.params.categoryId } }
        }
      }
      return result
    },
    tournamentLink () {
      let result = null
      if (this.$route.params.tournamentId) {
        result = {
          text: 'tournament',
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
