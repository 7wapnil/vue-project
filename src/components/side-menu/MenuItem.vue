<template>
  <div :class="`items-level-${level}`">
    <span
      v-b-toggle="`item-${level}-${index}`"
      v-if="hasChildren">
      <item-content
        :item="item"
        :level="level"/>
    </span>

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
      :id="`item-${level}-${index}`"
      :is-nav="true"
      :accordion="`${level}-menu`">
      <b-nav vertical>
        <b-link
          v-if="item.children.length > 1 && item.allTournaments"
          :to="item.allTournaments.to">
          <item-content
            :item="item.allTournaments"
            :level="nextLevel"/>
        </b-link>
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
