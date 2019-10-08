<template>
  <div>
    <menu-section-header
      v-if="section.title"
      :section="section"/>
    <div v-if="hasItems">
      <menu-item
        v-for="(item, index) in section.items"
        :key="index"
        :item="item"/>
    </div>
  </div>
</template>

<script>
import MenuItem from './MenuItem'
import MenuSectionHeader from './MenuSectionHeader'

export default {
  components: {
    MenuSectionHeader,
    MenuItem
  },
  props: {
    section: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasItems () {
      return this.section.items && this.section.items.length
    },

  }
}
</script>
