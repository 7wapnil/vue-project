<template>
  <b-nav
    class="side-menu flex-nowrap"
    vertical>
    <b-nav-item
      v-for="(item, index) in items"
      :key="index">

      <menu-item
        :item="item"
        :index="index"/>

    </b-nav-item>
  </b-nav>
</template>

<script>
import MenuItem from './MenuItem'

export default {
  components: {
    MenuItem
  },
  data () {
    return {
      items: [
        {
          id: '1',
          label: 'CS:GO',
          icon: 'sidemenu-game-icon',
          children: [
            {
              id: '33',
              label: 'All tournaments',
              to: { name: 'title' }
            },
            {
              id: '22',
              label: 'Tounament 1',
              children: [
                {
                  id: '100',
                  label: 'Submenu 1',
                  to: { name: 'title', params: { titleId: '100' } }
                },
                {
                  id: '100',
                  label: 'Submenu 2'
                }
              ]
            }
          ]
        },
        {
          id: '2',
          label: 'CS:GO',
          icon: 'sidemenu-game-icon',
          children: [
            {
              id: '22',
              label: 'Tounament 1',
              children: [
                {
                  id: '100',
                  label: 'Submenu 1'
                },
                {
                  id: '100',
                  label: 'Submenu 2'
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>
