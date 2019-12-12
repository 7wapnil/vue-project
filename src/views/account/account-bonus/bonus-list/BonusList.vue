<template>
  <ul>
    <li
      v-for="(listItem, index) in activeListItems"
      :key="index"
      :bonus-item="bonusItem"
      class="text-arc-clr-iron letter-spacing-2">
      {{ listItem.description }}
      <strong>
        {{ listItem.data }}
      </strong>
      <span>
        {{ listItem.additionalData }}
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    bonusItem: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      listItems: [
        {
          description: this.$t('account.bonus.longTerms.list.list1'),
          data: this.bonusItem.rolloverInitialValue,
          additionalData: '',
          active: true
        },
        {
          description: this.$t('account.bonus.longTerms.list.list2'),
          data: this.bonusItem.amount,
          additionalData: '',
          active: true
        },
        {
          description: this.$t('account.bonus.longTerms.list.list3'),
          data: this.$options.filters.asFormattedDate(this.bonusItem.expiresAt, 'DD/MM/YYYY', 'DD.MM.YY'),
          additionalData: '',
          active: true
        },
        {
          description: this.$t('account.bonus.longTerms.list.list4'),
          data: this.$tc('account.bonus.longTerms.list.list4Days', this.bonusItem.validForDays, { n: this.bonusItem.validForDays }),
          additionalData: this.$t('account.bonus.longTerms.list.list4Part2'),
          active: true
        },
        {
          description: this.$t('account.bonus.longTerms.list.list5'),
          data: '',
          additionalData: '',
          active: true
        },
        {
          description: this.$t('account.bonus.longTerms.list.list6'),
          data: '',
          additionalData: '',
          active: this.bonusItem.minOddsPerBet
        },
        {
          description: this.$t('account.bonus.longTerms.list.list7'),
          data: '',
          additionalData: '',
          active: true
        },
        {
          description: this.$t('account.bonus.longTerms.list.list8'),
          data: '',
          additionalData: '',
          active: true
        },
        {
          description: this.$t('account.bonus.longTerms.list.list9'),
          data: '',
          additionalData: '',
          active: true
        }
      ]
    }
  },
  computed: {
    activeListItems () {
      return this.listItems.filter(item => item.active)
    }
  }
}
</script>
