<template>
    <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown"
            v-if="activeWallet">
            <a class="nav-link dropdown-toggle"
               id="wallets-dropdown" href="#"
               role="button"
               data-toggle="dropdown"
               aria-haspopup="true"
               aria-expanded="false">
                {{ displayAmount(activeWallet) }}
            </a>
            <div class="dropdown-menu"
                 v-if="inactiveWalletsList.length">
                <a class="dropdown-item"
                   v-for="wallet in inactiveWalletsList"
                   :key="wallet.currency.code"
                   href="#"
                   @click.prevent="selectWallet(wallet)">
                    {{ displayAmount(wallet) }}
                </a>
            </div>
        </li>
    </ul>
</template>

<script>

  import { default as wallets } from '@/mixins/wallets';

  export default {
    mixins: [ wallets ],
    computed: {
      inactiveWalletsList() {
        const wallets = this.$store.getters.getWallets
        return wallets.filter((wallet) => {
          return (wallet.id != null && this.activeWallet.id != wallet.id)
        })
      }
    },
    created(){
      this.loadWallets()
    },
    methods: {
      displayAmount(wallet) {
        return `${wallet.amount.toFixed(2)} ${wallet.currency.code}`
      },
      selectWallet(wallet) {
        this.$store.dispatch('changeActiveWallet', wallet.id )
      }
    }
  }
</script>
