<template>
  <b-row no-gutters>
    <b-col class="px-4 pt-4 pb-2 overview-item-header-block">
      <icon
        :name="category.icon"
        :size="26"
        class="overview-item-header-icon"/>
      <b-link
        :to="{ name: 'casino-category', params: { category: categoryName } }"
        :disabled="!categoryName"
        router-tag="h4"
        class="overview-item-header-title">
        {{ category.label }}
      </b-link>
    </b-col>
    <b-col class="px-4 pt-4 pb-2 overview-item-header-indication-block">
      <overview-item-header-indication/>
    </b-col>
    <b-col class="px-4 pt-4 pb-2 overview-item-header-viewall-block">
      <b-link
        :to="{ name: 'casino-category', params: { category: categoryName } }"
        :disabled="!categoryName"
        class="mr-2">
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
  },
  computed: {
    categoryName () {
      const name = this.category.context.split('-')
      return name[0]
    }
  }
}
</script>

<style lang="scss" scoped>
    .overview-item {
        &-header {
            &-block {
                display: inline-flex;
            }
            &-icon {
                margin-left: 26px;
                pointer-events: none;
            }
            &-title {
                margin-left: 14px;
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
