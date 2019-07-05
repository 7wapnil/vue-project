<template>
  <div class="pt-4">
    <router-link
      :to="tournamentLink"
      class="pl-2 pl-md-4 mb-3 mb-md-2 text-arc-clr-gold d-block font-size-14 letter-spacing-2">
      {{ categoryName }} - {{ item.name }}
    </router-link>

    <div>
      <slot/>
    </div>
    <b-link
      v-if="showMore"
      :to="showMoreLink"
      exact>
      <b-button
        class="mt-2"
        variant="arc-secondary">
        More
      </b-button>
    </b-link>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showMoreLink: { name: 'tournament', params: { titleKind: this.$route.params.titleKind, titleId: this.item.title.id, tournamentId: this.item.id } },
      tournamentLink: { name: 'tournament', params: { titleId: this.item.title.id, tournamentId: this.item.id } }
    }
  },
  computed: {
    showMore () {
      return !!this.$route.params.categoryId && this.item.children.length === 16
    },
    categoryName () {
      return this.item.parent.name
    }
  }
}
</script>
