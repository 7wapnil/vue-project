<template>
  <div class="header-category-tabs">
    <category-tabs
      :tabs="tabs"
      :arrows="false"
      v-model="activeTabIndex"
      @tab-changed="tab => $emit('tab-changed', tab)"/>
  </div>
</template>

<script>
export default {
  components: {

  },
  data () {
    return {
      activeTabIndex: 0,
      tabs: [
        {
          value: 1,
          label: 'New games',
          icon: 'arcanebet-default-icon'
        },
        {
          value: 2,
          label: 'ArcaneBet favorites',
          icon: 'arcanebet-default-icon'
        },
        {
          value: 3,
          label: 'Slot games',
          icon: 'arcanebet-default-icon'
        },
      ]
    }
  },
}
</script>
