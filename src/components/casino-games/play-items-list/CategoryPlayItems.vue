<template>
  <div>
    <b-row
      class="mt-2"
      no-gutters>
      <b-col class="header-title d-flex align-items-center p-4">
        <icon
          :name="categoryIcon"
          class="header-icon mx-4"
          color="arc-clr-live-casino-glow"
          size="28px"/>
        <h4 class="mb-0 font-weight-light">
          {{ category.label }}
        </h4>
      </b-col>
      <b-col class="px-4 pt-4 pb-2 mr-4 text-right">
        <span class="mr-1">
          {{ this.$i18n.t('casino.viewAll') }}
        </span>
        {{ playItems.length }}
      </b-col>
    </b-row>
    <b-container
      fluid
      class="p-0">
      <b-row no-gutters>
        <b-col class="p-4">
          <transition-group
            tag="div"
            class="play-items-container d-flex flex-row flex-wrap align-items-center justify-content-start"
            name="play-items">
            <category-play-item
              v-for="playItem in playItems"
              :key="playItem.id"
              :item="playItem"
              :category="category"
            />
          </transition-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import CategoryPlayItem from './CategoryPlayItem'

export default {
  components: {
    CategoryPlayItem
  },
  props: {
    playItems: {
      type: Array,
      default: () => { return [] }
    }
  },
  computed: {
    category () {
      return {
        name: this.$route.params.category,
        label: this.$route.params.label
      }
    },
    categoryIcon () {
      return `${this.$route.params.titleKind}-${this.category.name}`
    }
  }
}
</script>

<style lang="scss"
       scoped>
  .play-items-enter-active, .play-items-leave-active {
    transition: all 1s;
  }
  .play-items-enter, .play-items-leave-to {
    transform: scale(1.1, 1.1);
  }

</style>
