<template>
  <div class="pt-4">
    <router-link
      :to="{name: 'tournament', params: {titleId: titleId, tournamentId: item.id}}"
      class="pl-4 text-arc-clr-gold mb-2 d-block font-size-14 letter-spacing-2">
      {{ item.name }}
    </router-link>
    <div>
      <slot/>
    </div>
    <b-link
      v-if="showMore"
      :to="{ name: 'tournament', params: { titleKind: $route.params.titleKind, titleId: titleId, tournamentId: item.id } }"
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
  computed: {
    showMore () {
      return !!this.$route.params.categoryId && this.item.children.length === 16
    },
    titleId () {
      return this.item.title.id
    }
  }
}
</script>
