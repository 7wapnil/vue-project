<template>
  <b-row no-gutters>
    <b-col cols="8"
           md="4"
           class="px-4 pt-4 pb-2 overview-item-header-block">
      <icon
        :name="category.icon"
        :size="isMobile ? 20 : 26"
        class="overview-item-header-icon ml-md-4 ml-2"/>
      <b-link
        :to="{ name: 'casino-category', params: { category: category.name } }"
        :disabled="!category.name"
        :router-tag="isMobile ? 'h5' : 'h4'"
        class="overview-item-header-title">
        {{ category.label }}
      </b-link>
    </b-col>
    <b-col v-if="!isMobile"
           md="4"
           class="px-4 pt-4 pb-2 overview-item-header-indication-block">
      <overview-item-header-indication/>
    </b-col>
    <b-col cols="4"
           md="4"
           class="px-4 pt-4 pb-2 overview-item-header-viewall-block">
      <b-link
        :to="{ name: 'casino-category', params: { category: category.name } }"
        :disabled="!category.name"
        class="mr-md-2 mr-0">
        {{ this.$i18n.t('casino.viewAll') }}
      </b-link>
    </b-col>
  </b-row>
</template>

<script>
import OverviewItemHeaderIndication from '@/components/casino-games/play-items-list/OverviewItemHeaderIndication'

export default {
  name: 'OverviewItemHeader',
  components: {
    OverviewItemHeaderIndication
  },
  props: {
    category: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
    .overview-item {
        &-header {
            &-block {
                display: inline-flex;
                align-items: center;
            }
            &-icon {
                pointer-events: none;
            }
            &-title {
                margin-left: 12px;
                margin-bottom: 0;
                color: $arc-clr-iron-light;
                font-weight: $font-weight-light;
                letter-spacing: .01em;
                cursor: pointer;
                &:hover {
                    color: $arc-clr-white;
                }
            }
            &-indication-block {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            &-viewall-block {
                text-align: right;
            }
        }
    }
    .disabled {
        pointer-events: none;
        opacity: .3;
    }
</style>
