<template>
  <b-col
    cols="12"
    md="4"
    class="d-flex align-items-center justify-content-center pb-4 pt-5">
    <div class="text-center">
      <h6 class="mb-0 font-weight-bold letter-spacing-2 text-arc-clr-gold">
        {{ $t('account.bonus.bonusAchieved') }}
      </h6>
      <span class="font-size-36 font-weight-bold text-arc-clr-white letter-spacing-5">
        {{ bonusAchieved }}
      </span>
    </div>
  </b-col>
</template>

<script>
export default {
  props: {
    bonusAchieved: {
      type: Number,
      required: true
    }
  }
}
</script>
