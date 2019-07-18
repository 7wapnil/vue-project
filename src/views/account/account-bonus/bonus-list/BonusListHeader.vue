<template>
  <div class="mt-4">
    <p class="px-md-5 px-0 py-1 mb-0 text-arc-clr-iron letter-spacing-2">
      {{ $t('account.bonus.longTerms.header') }}
      <strong>
        {{ bonusItem.code }}
      </strong>
    </p>
    <p class="px-md-5 px-0 py-1 mb-0 text-arc-clr-iron letter-spacing-2">
      {{ $t('account.bonus.longTerms.awarded') }}
      <strong>
        {{ bonusItem.amount }}
      </strong>
    </p>
    <p class="px-md-5 px-0 py-1 mb-4 text-arc-clr-iron letter-spacing-2">
      {{ $t('account.bonus.longTerms.paragraph.main') }}
      <router-link
        :to="{ name: 'Terms And Conditions' }"
        class="text-arc-clr-iron letter-spacing-2 font-weight-bold">
        {{ $t('account.bonus.longTerms.paragraph.link') }}
      </router-link>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    bonusItem: {
      type: Object,
      required: true
    }
  }
}
</script>
