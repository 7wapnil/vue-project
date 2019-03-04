<template>
  <div>
    <b-row
      class="p-4 bg-arc-clr-soil-darker"
      style="border-radius: 4px"
      no-gutters>
      <b-col
        v-for="(method, index) in withdrawMethods"
        :key="index"
        class="d-flex align-items-center justify-content-center">
        <b-img
          :src="method.icon"
          style="cursor: pointer"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Sofort from './withdraw-methods/Sofort'
import Skrill from './withdraw-methods/Skrill'
import Skinwallet from './withdraw-methods/Skinwallet'
import Skinpay from './withdraw-methods/Skinpay'
import Qiwi from './withdraw-methods/Qiwi'
import Paysafe from './withdraw-methods/Paysafe'
import Mru from './withdraw-methods/Mru'
import CreditCard from './withdraw-methods/CreditCard'
import Bitcoin from './withdraw-methods/Bitcoin'
import Yandex from './withdraw-methods/Yandex'
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
  components: {
    Sofort,
    Skrill,
    Skinwallet,
    Skinpay,
    Qiwi,
    Paysafe,
    Mru,
    CreditCard,
    Bitcoin,
    Yandex
  },
  data () {
    return {
      withdrawMethods: [
        { name: 'Sofort',
          component: Sofort,
          icon: SofortIcon
        },
        { name: 'Skrill',
          component: Skrill,
          icon: SkrillIcon
        },
        { name: 'Skinwallet',
          component: Skinwallet,
          icon: SkinwalletIcon
        },
        { name: 'Skinpay',
          component: Skinpay,
          icon: SkinpayIcon
        },
        { name: 'Qiwi',
          component: Qiwi,
          icon: QiwiIcon
        },
        { name: 'Paysafe',
          component: Paysafe,
          icon: PaysafeIcon
        },
        { name: 'Mru',
          component: Mru,
          icon: MruIcon
        },
        { name: 'Credit Card',
          component: CreditCard,
          icon: CreditCardIcon
        },
        { name: 'Bitcoin',
          component: Bitcoin,
          icon: BitcoinIcon
        },
        { name: 'Yandex',
          component: Yandex,
          icon: YandexIcon
        },
      ]
    }
  }
}
</script>
