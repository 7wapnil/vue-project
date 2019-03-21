<template>
  <div>
    <b-row
      class="p-4 bg-arc-clr-soil-darker"
      style="border-radius: 4px"
      no-gutters>
      <b-col
        v-for="(method, index) in methods"
        :key="index"
        class="d-flex align-items-center justify-content-center">
        <b-img
          :src="withdrawIcons[method.code]"
          :class="{ inactive: !method.availability}"
          style="cursor: pointer"
          @click="selectMethod(method)"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import SofortIcon from '@/assets/images/withdraw-methods/sofort.png'
import SkrillIcon from '@/assets/images/withdraw-methods/skrill.png'
import SkinwalletIcon from '@/assets/images/withdraw-methods/skinwallet.png'
import SkinpayIcon from '@/assets/images/withdraw-methods/skinpay.png'
import QiwiIcon from '@/assets/images/withdraw-methods/qiwi.png'
import PaysafeIcon from '@/assets/images/withdraw-methods/paysafe.png'
import MruIcon from '@/assets/images/withdraw-methods/mru.png'
import CreditCardIcon from '@/assets/images/withdraw-methods/card.png'
import BitcoinIcon from '@/assets/images/withdraw-methods/btc.png'
import YandexIcon from '@/assets/images/withdraw-methods/yandex.png'

export default {
  props: {
    methods: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      selectedComponent: null,
      withdrawIcons: {
        'sofort': SofortIcon,
        'yandex': YandexIcon,
        'skrill': SkrillIcon,
        'skinwallet': SkinwalletIcon,
        'skinpay': SkinpayIcon,
        'qiwi': QiwiIcon,
        'paysafe': PaysafeIcon,
        'mru': MruIcon,
        'credit_card': CreditCardIcon,
        'bitcoin': BitcoinIcon
      }
    }
  },
  methods: {
    selectMethod (selectedMethod) {
      selectedMethod['icon'] = this.withdrawIcons[selectedMethod.code]
      this.$emit('clicked-change-method', selectedMethod)
    }
  }
}
</script>
