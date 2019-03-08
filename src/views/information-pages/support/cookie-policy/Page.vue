<template>
  <div>
    <b-row no-gutters >
      <b-col class="d-none d-lg-block py-4">
        <h4>{{ header }}</h4>
        <span v-html="mainDocument"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import contentfulApi from '@/utils/contentful-client'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { SUPPORT_COOKIE_POLICY } from '@/constants/contentful/info-pages-ids'
export default {
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
    contentfulApi.getEntry(SUPPORT_COOKIE_POLICY).then(res => {
      this.viewItems = res.fields
    })
  }
}
</script>
