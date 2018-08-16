<template lang="pug">
    ul.navbar-nav.ml-auto
        li.nav-item.dropdown(v-if="activeWallet")
            a#wallets-dropdown.nav-link.dropdown-toggle(
            href="#"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            ) {{ displayAmount(activeWallet) }}
            .dropdown-menu(v-if="inactiveWalletsList.length")
                a.dropdown-item(
                    v-for="wallet in inactiveWalletsList"
                    :key="wallet.currency.code"
                    href="#"
                    @click.prevent="selectWallet(wallet)"
                ) {{ displayAmount(wallet) }}
</template>

<script>

  import { default as wallets } from '@/mixins/wallets';
  import WalletsService from '@/services/api/wallets'

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
      getWalletsService(){
        return new WalletsService(this)
      },
      loadWallets() {
        const service = this.getWalletsService()
        service.loadList(`
        id
        amount
        currency {
          code
        }
        `).then(data => {
          this.$store.commit('storeWallets', data.data.wallets)
        } )
      },
      displayAmount(wallet) {
        return `${wallet.amount.toFixed(2)} ${wallet.currency.code}`
      },
      selectWallet(wallet) {
        this.$store.dispatch('changeActiveWallet', wallet.id )
      }
    }
  }
</script>
