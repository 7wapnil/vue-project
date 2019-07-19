<template>
  <b-nav
    tag="div"
    class="flex-nowrap"
    vertical>

    <slot/>
    <div v-if="isOpen">
    <b-nav-item
      v-for="(item, index) in menuItems"
      :key="index">

      <menu-item
        :item="item"
        :index="index"/>
    </b-nav-item>
    </div>
    <loader
      v-if="!isOpen"
      class="py-5 px-4 bg-arc-clr-soil-dark"/>
  </b-nav>
</template>

<script>
import MenuItem from './MobileMenuItem'
import { TITLES_QUERY } from '@/graphql'
import { buildTree } from '@/helpers/navigation-tree'

const POLL_INTERVAL = 10000

export default {
  components: {
    MenuItem
  },
  props: {
    titleKind: {
      type: String,
      default: null
    },
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      titles: [],
    }
  },
  apollo: {
    titles () {
      return {
        query: TITLES_QUERY,
        variables () {
          return {
            kind: this.isKindTriggered,
            withScopes: true
          }
        },
        pollInterval: POLL_INTERVAL
      }
    }
  },
  computed: {
    isKindTriggered () {
      return this.titleKind ? this.titleKind : this.$route.params.titleKind
    },
    menuItems () {
      return buildTree(this.isKindTriggered, this.titles, this.$route)
    }
  }
}
</script>
<style scoped>
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
