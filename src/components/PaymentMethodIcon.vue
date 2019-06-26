<template>
  <b-img
    v-if="source"
    :src="source"
    @click="$emit('click', name)"/>
</template>

<script>
import SofortIcon from '@/assets/images/withdrawal-methods/sofort.png'
import SkrillIcon from '@/assets/images/withdrawal-methods/skrill.png'
import SkinwalletIcon from '@/assets/images/withdrawal-methods/skinwallet.png'
import SkinpayIcon from '@/assets/images/withdrawal-methods/skinpay.png'
import QiwiIcon from '@/assets/images/withdrawal-methods/qiwi.png'
import PaysafecardIcon from '@/assets/images/withdrawal-methods/paysafecard.png'
import MruIcon from '@/assets/images/withdrawal-methods/mru.png'
import CreditCardIcon from '@/assets/images/withdrawal-methods/card.png'
import BitcoinIcon from '@/assets/images/withdrawal-methods/btc.png'
import YandexIcon from '@/assets/images/withdrawal-methods/yandex.png'
import NetellerIcon from '@/assets/images/withdrawal-methods/neteller.png'

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
