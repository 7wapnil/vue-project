<template>
  <div
    v-if="row.length === itemsPerRow && !bigAlign"
    class="d-flex play-items-row"
  >
    <category-play-item
      v-for="playItem in row"
      :key="playItem.id"
      :item="playItem"
      :category="category"
    />
  </div>
  <div
    v-else
    class="d-flex play-items-row"
  >
    <div
      v-for="(col, index) in sortedRows"
      :class="col.length === 1 ? 'large' : ''"
      :key="index"
      class="play-item-col"
    >
      <category-play-item
        v-for="playItem in col"
        :class="col.length === 1 ? 'large' : ''"
        :key="playItem.id"
        :item="playItem"
        :category="category"
      />
    </div>
  </div>

</template>

<script>
import CategoryPlayItem from './CategoryPlayItem'
export default {
  name: 'CategoryPlayItemsRow',
  components: {
    CategoryPlayItem
  },
  props: {
    row: {
      type: Array,
      required: true
    },
    itemsPerRow: {
      type: Number,
      required: true
    },
    category: {
      type: Object,
      required: true
    },
    bigAlign: {
      type: String,
      default: null
    }
  },
  computed: {
    sortedRows () {
      let initialRow = [ ...this.row ]
      const pos = this.bigAlign === 'start' ? 0 : initialRow.length - 1
      const big = initialRow.splice(pos, 1)

      let sorted = initialRow.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / 2)
        if (!resultArray[chunkIndex]) resultArray[chunkIndex] = []
        resultArray[chunkIndex].push(item)
        return resultArray
      }, [])
      this.bigAlign === 'start' ? sorted.unshift(big) : sorted.push(big)
      return sorted;
    }
  }
}
</script>

<style lang="scss"
       scoped>
  .play-items-row {
    width: 100%;
  }
  .play-item-col {
    width: 100%;
    max-width: calc(266px + 20px);
    &.large {
      max-width: calc(266px * 2 + 40px);
    }
  }
  .play-item {
    &-desktop {
      margin: 10px !important;
      flex: 0 0 auto;
      cursor: pointer;
      border-radius: 5px;
      height: 177.3px;
      max-width: 266px;
      width: 100%;
      position: relative;
    }
    &-desktop.large {
      max-width: calc(266px * 2 + 20px);
      height: calc(177.3px * 2 + 10px);
      &:hover {
        & /deep/ .image {
          transform: scale(1.05);
        }
      }
    }
  }
</style>
