<template>
  <b-row
    no-gutters
    class="bg-arc-clr-soil-darker">
    <b-nav
      :tabs="true"
      class="category-tabs">
      <b-nav-item
        :to="{name: 'title-kind', params: {titleKind: titleKind}}"
        exact
        class="category-tab">
        <div class="px-4 py-3">
          <b-row no-gutters>
            <b-col class="d-flex justify-content-center align-items-center">
              <icon
                name="sidemenu-game-icon"
                size="18px"/>
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col>
              <small>
                ALL
              </small>
            </b-col>
          </b-row>
        </div>
      </b-nav-item>
    </b-nav>
    <b-col>
      <b-nav
        :tabs="true"
        class="category-tabs overflow-hidden flex-nowrap w-75">

        <b-nav-item
          v-if="isSliderEnabled"
          @click="() => moveSlider(-1)">
          <icon
            role="button"
            tabindex="0"
            size="15px"
            class="px-4 py-4 d-block"
            name="chevron-left"/>
        </b-nav-item>

        <b-nav-item
          v-for="title in titlesToShow"
          :key="title.id"
          :to="{name: 'title', params: {titleId: title.id}}"
          class="category-tab">
          <div class="px-4 py-3">
            <b-row no-gutters>
              <b-col class="d-flex justify-content-center align-items-center">
                <icon
                  name="sidemenu-game-icon"
                  size="18px"/>
              </b-col>
            </b-row>
            <b-row no-gutters>
              <b-col>
                <small>
                  {{ title.name }}
                </small>
              </b-col>
            </b-row>
          </div>
        </b-nav-item>

        <b-nav-item
          v-if="isSliderEnabled"
          @click="() => moveSlider(1)">
          <icon
            role="button"
            tabindex="0"
            size="15px"
            class="px-4 py-4 d-block"
            name="chevron-right"/>
        </b-nav-item>

      </b-nav>
    </b-col>
  </b-row>
</template>
<script>
import { TITLES_QUERY } from '@/graphql'

const POLL_INTERVAL = 10000
const CONTROL_ELEMENTS_COUNT = 2

export default {
  data () {
    return {
      maxItems: 7,
      currentStartIndex: 0,
      titles: []
    }
  },
  apollo: {
    titles () {
      return {
        query: TITLES_QUERY,
        variables: { kind: this.titleKind, withTournaments: true },
        pollInterval: POLL_INTERVAL
      }
    }
  },
  computed: {
    titleKind () {
      return this.$store.state.titleFilters.titleKind;
    },
    isSliderEnabled () {
      return this.titles.length > this.maxItems;
    },
    titlesToShow () {
      if (this.isSliderEnabled) {
        const lastItemIndex = this.currentStartIndex + this.maxItems - CONTROL_ELEMENTS_COUNT

        return this.titles.slice(this.currentStartIndex, lastItemIndex)
      }
      return this.titles
    },
    maxLastIndex () {
      return this.titles.length - this.maxItems + CONTROL_ELEMENTS_COUNT
    }
  },
  methods: {
    moveSlider (direction) {
      const nextStartIndex = this.currentStartIndex + direction

      this.currentStartIndex = Math.max(0, Math.min(this.maxLastIndex, nextStartIndex)); // range from 0 to last index in titles
    }
  }
}
</script>
