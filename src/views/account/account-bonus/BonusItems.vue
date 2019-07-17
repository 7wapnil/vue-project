<template>
  <b-list-group>
    <b-list-group-item
      v-b-toggle="'account-bonus-' + index"
      v-for="(bonusItem, index) in bonusItems"
      :key="index"
      class="bonus-item bg-arc-clr-soil-light px-md-0 px-4 py-4 border-0">
      <b-row no-gutters>
        <b-col
          cols="auto"
          class="mr-2 d-flex align-items-center">
          <span class="bonus-expand-circle">
            <icon
              name="bonus-chevron-down"
              size="8px"
              color="arc-clr-iron"/>
          </span>
        </b-col>
        <b-col class="d-flex align-items-center pl-2">
          <span class="bonus-item-name text-arc-clr-gold font-weight-bold letter-spacing-2">
            {{ bonusItem.code }}
          </span>
        </b-col>
        <b-col class="text-right d-flex justify-content-end align-items-center">
          <b-button
            variant="arc-secondary"
            class="text-capitalize font-weight-bold text-arc-clr-iron font-size-14 letter-spacing-2">
            {{ bonusItem.status }}
          </b-button>
        </b-col>
      </b-row>
      <b-collapse
        :id="`${'account-bonus-' + index}`"
        accordion="bonus-accordion">
        <bonus-list-header :bonus-item="bonusItem"/>
        <bonus-list :bonus-item="bonusItem"/>
      </b-collapse>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import BonusList from '@/views/account/account-bonus/bonus-list/BonusList'
import BonusListHeader from '@/views/account/account-bonus/bonus-list/BonusListHeader'

export default {
  components: {
    BonusList,
    BonusListHeader
  },
  props: {
    bonusItems: {
      type: Array,
      required: true
    }
  }
}
</script>
