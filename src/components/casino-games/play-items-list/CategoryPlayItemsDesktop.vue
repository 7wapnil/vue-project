<template>
  <b-row
    no-gutters>
    <b-col
      ref="play-items-container"
      class="px-1 px-md-2 pb-4">
      <div
        class="play-items-container">
        <category-play-items-row
          v-for="(row, index) in rows"
          :key="index"
          :row="row"
          :items-per-row="itemsPerRow"
          :category="category"
          :big-align="getAlign(index)"
        />
      </div>
    </b-col>
  </b-row>
</template>

<script>
import CategoryPlayItemsRow from './CategoryPlayItemsRow'

export default {
  name: 'CategoryPlayItemsDesktop',
  components: {
    CategoryPlayItemsRow,
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
  data () {
    return {
      rows: [],
      itemsPerRow: 0
    }
  },
  watch: {
    playItems (val) {
      this.sortItems(val)
    }
  },
  mounted () {
    this.calculateDimensions()
    this.sortItems(this.playItems)
  },
  methods: {
    getAlign (index) {
      if (index === 0 || index % 4 === 0) return 'start'
      else if (index % 4 !== 0 && index % 2 === 0) return 'end'
      return null
    },
    getChunkSize () {
      switch (this.itemsPerRow) {
        case 3:
          return {
            big: 3,
            small: 3
          }
        case 4:
          return {
            big: 5,
            small: 4
          }
        default:
          return {
            big: 7,
            small: 5
          }
      }
    },
    sortItems (arr) {
      let chunkSize = this.getChunkSize()
      let rows = []
      let index = 0
      let chunkType = 'big'
      arr.forEach(a => {
        if (!rows[index]) rows[index] = [];
        if (rows[index].length < chunkSize[chunkType]) rows[index].push(a)
        else {
          index += 1
          chunkType = chunkType === 'big' ? 'small' : 'big'
          rows[index] = []
          rows[index].push(a)
        }
      });
      this.rows = rows;
    },
    calculateDimensions () {
      this.wrapperWidth = this.$refs['play-items-container'].clientWidth
      this.itemWidth = 266 + 20 // play-item-margin, cannot take it before load
      this.itemsPerRow = Math.floor(this.wrapperWidth / this.itemWidth)
    },
  }
}
</script>

<style lang="scss"
       scoped>
  .play-items-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
  }
</style>
