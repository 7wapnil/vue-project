<template lang="pug">
    div
        .navbar.navbar-expand-lg.navbar-dark.bg-dark
            router-link.navbar-brand(:to="{ name: 'home' }")
                | ArcaneBet

            button.navbar-toggler(
                type="button"
                aria-controls="navbar-content"
                aria-expanded="false"
                aria-label="Toggle navigation"
                aria-target="#navbar-content"
                aria-toggle="collapse"
            )
                span.navbar-toggler-icon

            #navbar-content.collapse.navbar-collapse
                ul.navbar-nav.mr-auto
                    li.nav-item(v-for="item in mainMenu" :key="item.path")
                        router-link.nav-link(:to="item.path")
                            | {{ item.label }}

                balances-list(v-if="loggedIn")

                ul.navbar-nav
                    li.nav-item.dropdown(v-if="loggedIn")
                        a#username-dropdown.nav-link.dropdown-toggle(
                            href="#"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        ) {{ user.username }}
                        .dropdown-menu
                            a.dropdown-item(
                                href="#"
                                @click.prevent="logout"
                            ) Sign Out
                    li.nav-item(v-if="!loggedIn")
                        router-link.nav-link(:to="'sign-in'")
                            | Sign In
                    li.nav-item(v-if="!loggedIn")
                        router-link.nav-link(:to="'sign-up'")
                            | Sign Up
                    li.socket
                        div(:class="{'online': socketConnected}")

        .container
            slot
</template>

<style>
    li.socket > div {
        width: 8px;
        height: 8px;
        margin: auto;
        border-radius: 50px;
        background: red;
    }
    li.socket > div.online {
        background: green;
    }
</style>

<script>
  import BalancesList from '@/components/custom/BalancesList.vue'

  export default {
    components: {
        BalancesList
    },
    data() {
      return {
        mainMenu: [{
          path: 'esports',
          label: 'Esports'
        }, {
          path: 'live',
          label: 'Live'
        }, {
          path: 'outright',
          label: 'Outrights'
        }, {
          path: 'sports',
          label: 'Sports'
        }, {
          path: 'live-casino',
          label: 'Live casino'
        }]
      }
    },
    computed: {
        loggedIn() {
          return this.$store.getters['isLoggedIn']
        },
        user() {
          return this.$store.getters['getUser'] || {}
        }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout', this)
        this.$noty.success('Signed out successfully')
      }
    }
  }
</script>
