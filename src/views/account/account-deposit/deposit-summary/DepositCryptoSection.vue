<template>
  <div
    id="cryptoSection"
    :class="{ 'd-none' : !isCryptoSectionShown }">
    <p
      class="text font-size-14 text-justify"
      v-html="$t('account.deposit.crypto.howTo')"/>
    <h5 class="mt-2 mb-1">{{ $t('account.deposit.crypto.copyAddress') }}</h5>
    <p
      v-clipboard:copy="address"
      v-clipboard:success="onCopyAddress"
      class="pointer font-italic font-size-14 text-break mb-0">{{ address }}</p>
    <h5 class="mt-2 mb-1">{{ $t('account.deposit.crypto.scanQRCode') }}</h5>
    <canvas id="qrcode"/>
    <h5 class="font-italic text">Raw address:</h5>
    <h5 class="text-break">{{ address }}</h5>
  </div>
</template>
<script>
export default {
  props: {
    address: {
      type: String,
      default: ''
    },
    isCryptoSectionShown: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onCopyAddress () {
      this.$noty.info(this.$t('account.deposit.crypto.addressCopied'))
    }
  }
}
</script>
