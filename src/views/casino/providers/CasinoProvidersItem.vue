<template>
  <b-row
    no-gutters
    @click="pushProviderPage">
    <b-col class="bg-arc-clr-soil-dark mx-2 my-1 m-md-2 p-0 p-md-4 border-4 pointer">
      <b-row
        class="mb-0 mb-md-4"
        no-gutters>
        <b-col class="p-3 p-md-0">
          <b-img
            :height="50"
            :width="100"
            :src="itemImg"
          />
        </b-col>
        <b-col class="text-right p-3 p-md-0 d-flex align-items-start justify-content-end item-header-block">
          <b-link
            v-if="!isMobile"
            router-tag="h6">
            {{ $t('casino.viewGames') }}
            <icon
              :size="12"
              name="chevron-right"
              class="ml-1 d-inline-flex"/>
          </b-link>
          <icon
            v-if="isMobile"
            :size="12"
            name="chevron-right"/>
        </b-col>
      </b-row>
      <b-row no-gutters>
        <b-col class="px-3 pt-1 pb-3 p-md-0">
          <h4 class="font-weight-light mb-0">
            {{ provider.name }}
          </h4>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    provider: {
      type: Object,
      required: true
    }
  },
  computed: {
    defaultImg () {
      return require('@/assets/icons/sidemenu/arcanebet-default-icon.svg')
    },
    itemImg () {
      const images = require.context('@/assets/images/casino-games/providers', false, /\.svg$/)
      let providerImage = ''
      try {
        providerImage = images(`./${this.provider.internalImageName}.svg`)
      } catch (error) {
        providerImage = this.provider.logoUrl || this.defaultImg
      }
      return providerImage
    }
  },
  methods: {
    pushProviderPage () {
      this.$router.push({ name: 'casino-games-by-provider-name',
        params: { providerName: this.provider.slug } })
    }
  }
}
</script>
