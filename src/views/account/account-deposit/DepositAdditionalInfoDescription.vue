<template>
  <div
    :class="{
      'mb-2 p-2': isMobile,
      'p-4': !isMobile,
    }"
    class="additional-info-container">
    <div class="text-arc-clr-gold font-size-14">{{ $t('auth.depositAdditionalInfo.almostThere') }}!</div>
    <div class="font-size-18">{{ $t('auth.depositAdditionalInfo.additionalInfo') }}</div>
    <div class="text-arc-clr-iron font-size-14">
      <p
        :class="{'mb-0': isMobile}"
        class="mt-2">
        {{ $t('auth.depositAdditionalInfo.beforeContinue') }}<span v-if="!isMobile">.</span>
      </p>
      <p
        v-if="!isMobile"
        class="my-0">{{ $t('auth.depositAdditionalInfo.pleaseComplete') }}!</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .additional-info-container {
    background: $arc-clr-soil-dark;
    border-radius: $input-border-radius;
  }
</style>
