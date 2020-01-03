<template>
  <b-row
    no-gutters>
    <b-col class="px-1 px-md-2 pb-4">
      <div
        class="play-items-container">
        <category-play-item
          v-for="playItem in playItems"
          :key="playItem.id"
          :item="playItem"
          :category="category"
        />
      </div>
    </b-col>
  </b-row>
</template>

<script>
import CategoryPlayItem from './CategoryPlayItem'
export default {
  name: 'CategoryPlayItemsMobile',
  components: {
    CategoryPlayItem
  },
  props: {
    playItems: {
      type: Array,
      default: () => { return [] }
    },
    category: {
      type: Object,
      required: true
    }
  },
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
    justify-content: flex-start;
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
