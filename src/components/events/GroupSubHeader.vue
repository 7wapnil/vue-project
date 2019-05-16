<template>
  <div class="pt-4">
    <router-link
      :to="tournamentLink"
      class="pl-4 text-arc-clr-gold mb-2 d-block font-size-14 letter-spacing-2">
      {{ item.name }}
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
    }
  }
}
</script>
