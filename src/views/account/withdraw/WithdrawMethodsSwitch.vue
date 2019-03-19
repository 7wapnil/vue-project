<template>
  <div>
    <b-row
      class="p-4 bg-arc-clr-soil-darker"
      style="border-radius: 4px"
      no-gutters>
      <b-col
        v-for="(method, index) in filteredMethods"
        :key="index"
        class="d-flex align-items-center justify-content-center">
        <b-img
          :src="method.icon"
          style="cursor: pointer"
          @click="selectMethod(method.code)"/>
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
      withdrawMethods: [
        { name: 'Sofort',
          icon: SofortIcon,
          code: 'sofort'
        },
        { name: 'Skrill',
          icon: SkrillIcon,
          code: 'skrill'
        },
        { name: 'Skinwallet',
          icon: SkinwalletIcon,
          code: 'skinwallet'
        },
        { name: 'Skinpay',
          icon: SkinpayIcon,
          code: 'skinpay'
        },
        { name: 'Qiwi',
          icon: QiwiIcon,
          code: 'qiwi'
        },
        { name: 'Paysafe',
          icon: PaysafeIcon,
          code: 'paysafe'
        },
        { name: 'Mru',
          icon: MruIcon,
          code: 'mru'
        },
        { name: 'Credit Card',
          icon: CreditCardIcon,
          code: 'credit_card'
        },
        { name: 'Bitcoin',
          icon: BitcoinIcon,
          code: 'bitcoin'
        },
        { name: 'Yandex',
          icon: YandexIcon,
          code: 'yandex'
        },
      ]
    }
  },
  computed: {
    filteredMethods () {
      let result = []
      this.methods.forEach(method => {
        this.withdrawMethods.find(el => {
          if (el.code === method.code) {
            el['fields'] = method.fields
            result.push(el)
          }
        })
      })
      return result
    }
  },
  methods: {
    selectMethod (val) {
      this.selectedComponent = this.filteredMethods.find(method => method.code === val)
      this.$emit('clicked-change-method', this.selectedComponent);
    }
  }
}
</script>
