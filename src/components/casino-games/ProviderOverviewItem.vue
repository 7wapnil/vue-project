<template>
  <div
    class="provider-overview-item"
    @click="pushProvider">
    <b-img
      :src="itemImg"
      :alt="provider.name"
      class="provider-overview-item-image"
    />
  </div>
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
    itemImg () {
      const images = require.context('@/assets/images/casino-games/providers', false, /\.svg$/)
      let providerImage = ''
      try {
        providerImage = images(`./${this.provider.internalImageName}.svg`)
      } catch (error) {
        providerImage = this.provider.logoUrl || this.defaultImg
      }
      return providerImage
    },
    defaultImg () {
      return require('@/assets/icons/sidemenu/arcanebet-default-icon.svg')
    }
  },
  methods: {
    pushProvider () {
      this.$router.push({ name: 'casino-games-by-provider-name',
        params: { providerName: this.provider.slug, providerFullName: this.provider.name }
      })
    }
  }
}
</script>

<style lang="scss"
       scoped>
    .provider-overview-item {
        background: #2F2f2f;
        margin: 5px;
        cursor: pointer;
        border-radius: 5px;
        height: 80px;
        overflow: hidden;
        flex: 0 0 160px;
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
        &-image {
            transition: all .4s ease-in-out;
            max-width: 80%;
            height: auto;
        }
    }
    </style>
