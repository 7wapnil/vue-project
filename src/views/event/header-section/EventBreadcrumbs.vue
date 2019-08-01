<template>
  <b-breadcrumb
    :items="composedBreadcrumbs"
    class="w-100 letter-spacing-2 pt-4 py-2 py-md-4 px-4 px-md-5"/>

</template>
<script>
export default {
  props: {
    event: {
      type: Object,
      default:
        () => {}
    }
  },
  computed: {
    category () {
      let category = {}
      this.event.scopes.filter((scope) => {
        if (scope.kind === 'category') {
          category = { id: scope.id, name: scope.name }
        }
      })
      return category
    },
    composedBreadcrumbs () {
      if (this.event) {
        return [
          {
            text: this.event.title.name,
            to: { name: 'title', params: { titleKind: this.$route.params.titleKind, titleId: this.event.title.id, } }
          },
          {
            text: this.category.name,
            to: { name: 'category-tournaments', params: { titleKind: this.$route.params.titleKind, titleId: this.event.title.id, categoryId: this.category.id } }
          },
          {
            text: this.event.tournament.name,
            to: { name: 'tournament', params: { titleKind: this.$route.params.titleKind, titleId: this.event.title.id, tournamentId: this.event.tournament.id } }
          },
          { text: this.event.name }]
      }
    }
  }
}
</script>
