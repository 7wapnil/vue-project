<template>
  <div class="provider-overview-item">
    <b-img
      :src="itemImg"
      :alt="provider.representationName"
      class="provider-overview-item-image"
      center/>
  </div>
</template>

<script>
import { slug } from '@/helpers/strings';

export default {
  props: {
    provider: {
      type: Object,
      required: true
    }
  },
  computed: {
    itemImg () {
      const images = require.context('@/assets/images/casino-games/providers', false, /\.svg$/)
      let providerImage = ''
      try {
        providerImage = images(`./${this.itemTitle}.svg`)
      } catch (error) {
        providerImage = this.provider.logoUrl || this.defaultImg
      }
      return providerImage
    },
    defaultImg () {
      return require('@/assets/icons/sidemenu/arcanebet-default-icon.svg')
    },
    itemTitle () {
      return slug(this.provider.representationName)
    }
  }
}
</script>

<style lang="scss"
       scoped>
    .provider-overview-item {
        background: #2F2f2f;
        flex: 0 0 auto;
        margin: 5px;
        cursor: pointer;
        border-radius: 5px;
        height: 80px;
        max-width: 160px;
        overflow: hidden;
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        &:first-child {
            margin-left: 0;
        }
        &:last-child {
            margin-right: 0;
        }
        &:hover {
            & > .provider-overview-item-image {
                transform: scale(1.2);
            }
        }
        .provider-overview-item-image {
            overflow: hidden;
            transition: all .4s ease-in-out;
            width: 120px;
            height: 60px;
        }
    }
    </style>
