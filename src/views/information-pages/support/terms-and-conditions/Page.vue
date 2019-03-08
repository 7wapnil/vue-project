<template>
  <div>
    <b-row no-gutters>
      <b-col class="d-none d-lg-block py-4">
        <h3>{{ header }}</h3>
        <span v-html="mainDocument"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import contentfulApi from '@/utils/contentful-client'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { SUPPORT_TERMS_AND_CONDITIONS } from '@/constants/contentful/info-pages-ids'

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
    contentfulApi.getEntry(SUPPORT_TERMS_AND_CONDITIONS).then(res => {
      this.viewItems = res.fields
    })
  }
}
</script>
