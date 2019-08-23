<template>
  <ul>
    <li
      v-for="(listItem, index) in listItems"
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
          additionalData: ''
        },
        {
          description: this.$t('account.bonus.longTerms.list.list2'),
          data: this.bonusItem.amount,
          additionalData: ''
        },
        {
          description: this.$t('account.bonus.longTerms.list.list3'),
          data: this.$options.filters.asFormattedDate(this.bonusItem.expiresAt, 'DD/MM/YYYY', 'DD.MM.YY'),
          additionalData: ''
        },
        {
          description: this.$t('account.bonus.longTerms.list.list4'),
          data: this.$tc('account.bonus.longTerms.list.list4Days', this.bonusItem.validForDays, { n: this.bonusItem.validForDays }),
          additionalData: this.$t('account.bonus.longTerms.list.list4Part2')
        },
        {
          description: this.$t('account.bonus.longTerms.list.list5'),
          data: '',
          additionalData: ''
        },
        {
          description: this.$t('account.bonus.longTerms.list.list6'),
          data: '',
          additionalData: ''
        },
        {
          description: this.$t('account.bonus.longTerms.list.list7'),
          data: '',
          additionalData: ''
        },
        {
          description: this.$t('account.bonus.longTerms.list.list8'),
          data: '',
          additionalData: ''
        }
      ]
    }
  }
}
</script>
