<template>
  <div class="py-5">
    <b-list-group>
      <b-list-group-item
        v-b-toggle="'account-bonus-' + index"
        v-for="(bonusItem, index) in bonusItems"
        :key="index"
        class="bonus-item bg-arc-clr-soil-light px-0 py-4 border-0">
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
          <p class="px-5 py-1 mb-0 mt-0 text-arc-clr-iron letter-spacing-2">
            {{ $t('account.bonus.longTerms.header') }} <b>{{ bonusItem.code }}</b>
          </p>
          <p class="px-5 py-1 mb-0 mt-0 text-arc-clr-iron letter-spacing-2">
            {{ $t('account.bonus.longTerms.paragraph.main') }}
            <router-link
              :to="{name: 'terms and conditions'}"
              class="text-arc-clr-iron letter-spacing-2 font-weight-bold">{{ $t('account.bonus.longTerms.paragraph.link') }}</router-link>
          </p>
          <ul>
            <li class="text-arc-clr-iron letter-spacing-2">{{ $t('account.bonus.longTerms.list.list1') }} <b>{{ bonusItem.rollover_initial_value }}</b>
            </li>
            <li class="text-arc-clr-iron letter-spacing-2">{{ $t('account.bonus.longTerms.list.list2') }}</li>
            <li class="text-arc-clr-iron letter-spacing-2">{{ $t('account.bonus.longTerms.list.list3') }} <b>{{ bonusItem.expires_at | dateFormatForBonus('DD.MM.YY', 'DD/MM/YYYY') }}</b></li>
            <li class="text-arc-clr-iron letter-spacing-2">{{ $t('account.bonus.longTerms.list.list4') }} <b>{{ $tc('account.bonus.longTerms.list.list4Days', bonusItem.valid_for_days, { n: bonusItem.valid_for_days }) }} </b> {{ $t('account.bonus.longTerms.list.list4Part2') }}</li>
            <li class="text-arc-clr-iron letter-spacing-2">{{ $t('account.bonus.longTerms.list.list5') }}</li>
            <li class="text-arc-clr-iron letter-spacing-2">{{ $t('account.bonus.longTerms.list.list6') }}</li>
            <li class="text-arc-clr-iron letter-spacing-2">{{ $t('account.bonus.longTerms.list.list7') }}</li>
            <li class="text-arc-clr-iron letter-spacing-2">{{ $t('account.bonus.longTerms.list.list8') }}</li>
          </ul>

        </b-collapse>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  props: {
    bonusItems: {
      type: Array,
      required: true
    }
  },
}
</script>
