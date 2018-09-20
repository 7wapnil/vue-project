<template>
  <div>
    <slot :titles="titles"/>
  </div>
</template>

<script>
import { TITLES_QUERY } from '@/graphql'

export default {
  props: {
    queryOptions: {
      type: Object,
      default () { return {} }
    }
  },
  apollo: {
    titles () {
      return this.query
    }
  },
  computed: {
    query () {
      return {
        query: TITLES_QUERY,
        variables: this.queryOptions
      }
    }
  }
}
</script>
