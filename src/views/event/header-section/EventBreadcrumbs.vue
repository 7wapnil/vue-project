<template>
  <b-breadcrumb
    :items="composedBreadcrumbs"
    class="w-100 letter-spacing-2 pt-4 py-2 py-md-4 px-4 px-md-5"/>

</template>
<script>
import { getTitleShortName } from '@/helpers/titles'
import { CATEGORY } from '@/constants/event-scopes/kinds'

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
        if (scope.kind === CATEGORY) {
          category = { id: scope.id, name: scope.name }
        }
      })
      return category
    },
    composedBreadcrumbs () {
      if (this.event) {
        const titleKind = this.$route.params.titleKind
        return [
          {
            text: getTitleShortName(this.event.title),
            to: {
              name: `${titleKind}-title`,
              params: {
                titleKind: titleKind,
                titleSlug: this.event.title.slug,
              }
            }
          },
          {
            text: this.category.name
          },
          {
            text: this.event.tournament.name,
            to: {
              name: `${titleKind}-tournament`,
              params: {
                titleKind: titleKind,
                titleSlug: this.event.title.slug,
                tournamentSlug: this.event.tournament.slug
              }
            }
          }, {}
        ]
      }
    }
  }
}
</script>
