<template>
  <div
    :class="{mobile: isMobile}"
    class="search-game-container"
  >
    <icon
      name="search"
      class="search-icon"
      size="12px"/>
    <input
      v-model.trim="query"
      :placeholder="$i18n.t('casino.playItemsList.search')"
      type="text"
      class="search-game-input"
      @input="setQuery">
    <div
      v-if="query"
      class="search-reset"
      @click="reset">
      <icon
        :color="routeName === 'casino' ? 'arc-clr-casino-glow' : 'arc-clr-live-casino-glow'"
        name="close"
        size="18px"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    routeName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      query: ''
    }
  },
  watch: {
    '$route.query' (to) {
      if (to.q === '' || !to.q) this.query = ''
    }
  },
  created () {
    if (this.$route.query.q) this.query = this.$route.query.q;
  },
  methods: {
    setQuery (e) {
      this.$router.push({ name: `${this.routeName}-search`, query: { q: this.query } })
    },
    reset () {
      this.query = ''
      this.$router.push({ name: this.routeName })
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-game-container {
    position: relative;
    height: 42px;
    background: $arc-clr-soil-cover;
    margin-right: 20px;
    border-radius: $input-border-radius;
    .search-icon {
      position: absolute;
      top: calc(50% - 6px);
      left: 10px;
      color: "#7E7E7E";
    }
    .search-reset {
      position: absolute;
      top: calc(50% - 9px);
      right: 10px;
      color: #1C9CB1;
    }
    .search-game-input {
      padding: 9px 24px 9px 36px;
      background: $arc-clr-soil-cover;
      border: none;
      color: $arc-clr-white;
      border-radius: $input-border-radius;
      &:focus {
        outline: 0;
      }
    }
    &.mobile {
      width: 100%;
      padding: 10px;
      height: 62px;
      background: $arc-clr-soil-light;
      margin-right: 0;
      border-radius: 0;
      .search-icon {
        left: 20px
      }
      .search-reset {
        right: 20px;
      }
      .search-game-input {
        width: 100%;
      }
    }
  }
</style>>
