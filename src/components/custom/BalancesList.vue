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
            .dropdown-menu(v-if="walletsList.length")
                a.dropdown-item(
                    v-for="wallet in walletsList"
                    :key="wallet.currency.code"
                    href="#"
                    @click.prevent="selectWallet(wallet)"
                ) {{ displayAmount(wallet) }}
</template>

<script>
    import WalletsService from '@/services/api/wallets'

  export default {
    data() {
      return {
        service: new WalletsService(this),
        wallets: [],
        activeWallet: null
      }
    },
    created() {
        this.service.loadList(`
            id
            amount
            currency {
                code
            }
        `)
          .then(this.setActiveWallet)
    },
    computed: {
      walletsList() {
        if (!this.activeWallet) {
          return this.wallets
        }

        return this.wallets.filter((wallet) => {
          return this.activeWallet.id != wallet.id
        })
      }
    },
    methods: {
      setActiveWallet() {
        let wallet;
        const chosenWalletId = this.$store.getters.getUserData('wallet')

        if (chosenWalletId) {
          wallet = this.wallets.find((item) => {
            return item.id == chosenWalletId
          })
        }

        if (!wallet) {
          wallet = this.wallets[0]
        }

        this.activeWallet = wallet
      },
      displayAmount(wallet) {
        return `${wallet.amount.toFixed(2)} ${wallet.currency.code}`
      },
      selectWallet(wallet) {
        this.$store.commit('userData', { wallet: wallet.id })
        this.activeWallet = wallet
      }
    },
    beforeDestroy() {
      this.service = null
    }
  }
</script>
