<template>
  <div>
    <div class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link
        :to="{ name: 'home' }"
        class="navbar-brand">
        ArcaneBet
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        aria-controls="navbar-content"
        aria-expanded="false"
        aria-label="Toggle navigation"
        aria-target="#navbar-content"
        aria-toggle="collapse">
        <span class="navbar-toggler-icon"/>
      </button>
      <div
        id="navbar-content"
        class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li
            v-for="item in mainMenu"
            :key="item.path"
            class="nav-item">
            <router-link
              :to="item.path"
              class="nav-link">
              {{ item.label }}
            </router-link>
          </li>
        </ul>
        <balances-list v-if="loggedIn"/>
        <ul class="navbar-nav">
          <li
            v-if="loggedIn"
            class="nav-item dropleft">
            <a
              id="username-dropdown"
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              {{ user.username }}
            </a>
            <div class="dropdown-menu">
              <router-link
                :to="'account'"
                class="dropdown-item">
                Account
              </router-link>
              <a
                class="dropdown-item"
                href="#"
                @click.prevent="logout">
                Sign Out
              </a>
            </div>
          </li>
          <li
            v-if="!loggedIn"
            class="nav-item">
            <router-link
              :to="'sign-in'"
              class="nav-link">
              Sign In
            </router-link>
          </li>
          <li
            v-if="!loggedIn"
            class="nav-item">
            <router-link
              :to="'sign-up'"
              class="nav-link">
              Sign Up
            </router-link>
          </li>
          <li class="socket">
            <div :class="{'online': socketConnected}"/>
          </li>
        </ul>
      </div>
    </div>
    <div class="container">
      <slot/>
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
  data () {
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
    loggedIn () {
      return this.$store.getters['isLoggedIn']
    },
    user () {
      return this.$store.getters['getUser'] || {}
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout', this)
      this.$noty.success('Signed out successfully')
    }
  }
}
</script>
