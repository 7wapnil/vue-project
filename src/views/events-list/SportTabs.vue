<template>
  <category-tabs :tabs="tabs">
    <template slot-scope="{ tab }">
      <filter-tabs :title-id="tab.id"/>
    </template>
  </category-tabs>
</template>

<script>
import FilterTabs from './FilterTabs'

export default {
  components: {
    FilterTabs
  },
  data () {
    return {
      tabIndex: 0,
      tabs: [{
        id: null,
        title: 'All',
        icon: 'sidemenu-game-icon'
      }, {
        id: '1',
        title: 'Football',
        icon: 'sidemenu-game-icon'
      }]
    }
  }
}
</script>
