<template>
  <b-row no-gutters>
    <b-col class="d-none d-lg-block py-4">
      <h3>{{ header }}</h3>
      <span v-html="mainDocument"/>
    </b-col>
  </b-row>
</template>

<script>
import contentfulApi from '@/utils/contentful-client'
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
      return documentToHtmlString(this.viewItems.body)
    }
  },
  mounted () {
    contentfulApi.getEntry(this.contentfulId).then(res => {
      this.viewItems = res.fields
    })
  }
}
</script>
