<template>
  <div :class="`items-level-${level}`">
    <div
      v-b-toggle="`item-${item.label}-${level}-${index}`"
      v-if="hasChildren"
      class="collapsed">
      <item-content
        :item="item"
        :level="level"/>
    </div>

    <b-link
      v-if="!hasChildren && item.to"
      :to="item.to"
      exact>
      <item-content
        :item="item"
        :level="level"/>
    </b-link>

    <b-collapse
      v-if="hasChildren"
      :id="`item-${item.label}-${level}-${index}`"
      :visible="item.active"
      :accordion="`${level}-menu`">
      <b-nav
        vertical
        class="flex-nowrap bg-arc-clr-soil-black">
        <b-nav-item
          v-for="(child, childIndex) in item.children"
          :key="childIndex">
          <menu-item
            :item="child"
            :index="childIndex"
            :level="nextLevel"/>

        </b-nav-item>
      </b-nav>
    </b-collapse>
  </div>
</template>

<script>
import ItemContent from './ItemContent'

export default {
  name: 'MenuItem',
  components: {
    ItemContent
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    level: {
      type: Number,
      default: 0
    }
  },
  computed: {
    hasChildren () {
      return this.item.children && this.item.children.length
    },
    nextLevel () {
      return this.level + 1
    }
  }
}
</script>
