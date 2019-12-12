<template>
  <div>
    <b-row
      class="mt-2 item-header-block"
      no-gutters>
      <b-col class="d-flex align-items-center p-4">
        <icon
          :name="categoryIcon"
          class="mx-2 mx-md-4"
          :size="isMobile ? 20 : 26"/>
        <h4 class="mb-0 font-weight-light">
          {{ category.label }}
        </h4>
      </b-col>
      <b-col @click="pushLobby"
             class="px-md-4 px-2 py-4 d-flex align-items-center justify-content-end pointer">
        <icon name="chevron-left"
              class="mr-1"
              :size="12"/>
        <span class="mr-1">
          {{ this.$i18n.t('casino.return') }}
        </span>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col class="px-2 pb-4">
        <div class="play-items-container">
          <category-play-item
            v-for="playItem in playItems"
            :key="playItem.id"
            :item="playItem"
            :category="category"
          />
        </div>
      </b-col>
    </b-row>
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
  },
    methods: {
      pushLobby() {
          const lobby = this.$route.params.titleKind
          this.$router.push({ name: lobby })
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
  .play-item {
    &-desktop:first-child {
      margin: 10px;
    }
  }
  .play-items-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: start;
  }
</style>
