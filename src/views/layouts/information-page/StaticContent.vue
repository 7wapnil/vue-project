<template>
  <b-row no-gutters>
    <b-col class-name="p-4">
      <h2 className="font-weight-light m-4">
        {{ header }}
      </h2>
      <h6
        v-if="tableOfContents"
        class="text-arc-clr-iron letter-spacing-2 line-height-24 text-left px-4 py-2 mb-0"
        v-html="tableOfContents"/>
      <h6
        v-if="mainDocument"
        class="text-arc-clr-iron letter-spacing-2 line-height-24 text-left px-4 py-2 mb-0"
        v-html="mainDocument"/>
    </b-col>
  </b-row>
</template>

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

export default {
  props: {
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
      if (this.$route.path.includes('terms-and-conditions')) {
        return this.viewItems.body
      }
      return documentToHtmlString(this.viewItems.body)
    },
    tableOfContents () {
      console.log(this.viewItems)
      return this.viewItems.tableofcontents || null
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
