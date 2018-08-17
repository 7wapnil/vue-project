<template>
    <div>
        <div class="navbar navbar-expand-lg navbar-dark bg-dark">
            <router-link class="navbar-brand"
                         :to="{ name: 'home' }">
                ArcaneBet
            </router-link>
            <button class="navbar-toggler"
                    type="button"
                    aria-controls="navbar-content"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    aria-target="#navbar-content"
                    aria-toggle="collapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse"
                 id="navbar-content">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item"
                        v-for="item in mainMenu"
                        :key="item.path">
                        <router-link class="nav-link"
                                     :to="item.path">
                            {{ item.label }}
                        </router-link>
                    </li>
                </ul>
                <balances-list v-if="loggedIn"></balances-list>
                <ul class="navbar-nav">
                    <li class="nav-item dropdown"
                        v-if="loggedIn">
                        <a class="nav-link dropdown-toggle"
                             id="username-dropdown"
                             href="#"
                             role="button"
                             data-toggle="dropdown"
                             aria-haspopup="true"
                             aria-expanded="false">
                            {{ user.username }}
                        </a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item"
                               href="#"
                               @click.prevent="logout">
                                Sign Out
                            </a>
                        </div>
                    </li>
                    <li class="nav-item"
                        v-if="!loggedIn">
                        <router-link class="nav-link"
                                     :to="'sign-in'">
                            Sign In
                        </router-link>
                    </li>
                    <li class="nav-item"
                        v-if="!loggedIn">
                        <router-link class="nav-link"
                                     :to="'sign-up'">
                            Sign Up
                        </router-link>
                    </li>
                    <li class="socket">
                        <div :class="{'online': socketConnected}"></div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="container">
            <slot></slot>
        </div>
    </div>
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
