<template>
  <div>
    <b-row
      class="item-header-block mt-2"
      no-gutters>
      <b-col
        cols="8"
        class="d-flex align-items-center p-4">
        <h4
          v-if="!loading"
          class="mb-0 font-weight-light">
          {{ searchMessage }}
        </h4>
      </b-col>
      <b-col
        cols="4"
        class="p-4 d-flex align-items-center justify-content-end pointer"
        @click="pushCasino">
        <icon
          :size="12"
          name="chevron-left"
          class="mr-1"/>
        <span class="mr-1">
          {{ this.$i18n.t('casino.return') }}
        </span>
      </b-col>
    </b-row>
    <b-row
      v-if="!loading && count === 0"
      no-gutters>
      <b-col class="px-4">
        <h6
          class="mb-0 font-weight-light text-arc-clr-iron">
          {{ this.$i18n.t('casino.playItemsList.noResultsFound') }}
        </h6>
      </b-col>
    </b-row>
    <b-row
      v-if="playItems.length > 0"
      no-gutters>
      <b-col class="px-1 px-md-2 pb-4">
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
  name: 'SearchPlayItems',
  components: {
    CategoryPlayItem
  },
  props: {
    playItems: {
      type: Array,
      default: () => { return [] }
    },
    count: {
      type: Number,
      default: null
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      category: {
        name: 'all-games',
        label: 'all-games'
      }
    }
  },
  computed: {
    searchMessage () {
      if (this.count > 0) {
        return this.isMobile
          ? this.$i18n.t('casino.playItemsList.countResultsFound', { count: this.count })
          : this.$i18n.t('casino.playItemsList.countResultsFoundWithQuery', { count: this.count, query: this.$route.query.q })
      } else {
        return this.isMobile
          ? this.$i18n.t('casino.playItemsList.noResultsShort')
          : this.$i18n.t('casino.playItemsList.noResultsForQuery', { query: this.$route.query.q })
      }
    }
  },
  methods: {
    pushCasino () {
      this.$router.replace({ name: this.$route.params.titleKind })
    }
  }
}
</script>

<style lang="scss"
       scoped>
  .play-item {
    &-desktop:first-child {
      margin: 10px;
    }
  }
  .play-items-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: start;
  }
  .play-item {
    &-desktop {
      flex: 0 0 auto;
      margin: 10px;
      cursor: pointer;
      border-radius: 5px;
      height: 177.3px;
      max-width: 266px;
      width: 100%;
      position: relative;
    }
    &-mobile {
      margin: 5px;
      flex: 0 0 46%;
      &:first-child {
        margin-left: 5px;
      }
    }
  }
</style>
