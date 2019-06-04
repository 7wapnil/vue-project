<template>
  <b-img
    v-if="source"
    :src="source"
    @click="$emit('click', name)"/>
</template>

<script>
import SofortIcon from '@/assets/images/withdraw-methods/sofort.png'
import SkrillIcon from '@/assets/images/withdraw-methods/skrill.png'
import SkinwalletIcon from '@/assets/images/withdraw-methods/skinwallet.png'
import SkinpayIcon from '@/assets/images/withdraw-methods/skinpay.png'
import QiwiIcon from '@/assets/images/withdraw-methods/qiwi.png'
import PaysafecardIcon from '@/assets/images/withdraw-methods/paysafecard.png'
import MruIcon from '@/assets/images/withdraw-methods/mru.png'
import CreditCardIcon from '@/assets/images/withdraw-methods/card.png'
import BitcoinIcon from '@/assets/images/withdraw-methods/btc.png'
import YandexIcon from '@/assets/images/withdraw-methods/yandex.png'
import NetellerIcon from '@/assets/images/withdraw-methods/neteller.png'

export default {
  props: {
    name: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      icons: {
        credit_card: CreditCardIcon,
        yandex: YandexIcon,
        mru: MruIcon,
        bitcoin: BitcoinIcon,
        paysafecard: PaysafecardIcon,
        qiwi: QiwiIcon,
        skinpay: SkinpayIcon,
        skinwallet: SkinwalletIcon,
        skrill: SkrillIcon,
        sofort: SofortIcon,
        neteller: NetellerIcon
      }
    }
  },
  computed: {
    source () {
      return this.icons[this.name]
    }
  }
}
</script>
