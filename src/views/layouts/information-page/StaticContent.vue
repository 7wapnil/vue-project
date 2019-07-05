<template>
  <b-row no-gutters>
    <b-col class="p-4">
      <h2 class="font-weight-light m-4">
        {{ header }}
      </h2>
      <table-of-content
        :items="items"
        class="text-arc-clr-iron letter-spacing-2 line-height-24 text-left px-4 py-2 mb-0"/>
      <h6
        v-if="mainDocument"
        class="text-arc-clr-iron letter-spacing-2 line-height-24 text-left px-4 py-2 mb-0"
        v-html="mainDocument"/>
    </b-col>
  </b-row>
</template>

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import TableOfContent from './TableOfContent'

export default {
  components: { TableOfContent },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    contentfulId: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      viewItems: []
    }
  },
  computed: {
    header () {
      return this.viewItems.header
    },
    mainDocument () {
      if (this.$route.path.includes('terms-and-conditions') || this.$route.path.includes('betting-rules')) {
        return this.viewItems.body
      }
      return documentToHtmlString(this.viewItems.body)
    }
  },
  mounted () {
    this.$contentful.getEntry(this.contentfulId).then(res => {
      this.viewItems = res.fields
    })
  }
}
</script>
<style scoped>
  h4 {
    color: red !important;
  }
</style>
