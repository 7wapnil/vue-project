<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <router-link
                    :to="{ name: 'home' }"
                    class="navbar-brand">ArcaneBet
            </router-link>

            <button
                    type="button"
                    class="navbar-toggler"
                    aria-controls="navbar-content"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    aria-target="#navbar-content"
                    aria-toggle="collapse">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div id="navbar-content" class="collapse navbar-collapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item"
                        v-for="item in mainMenu"
                        :key="item.path">

                        <router-link :to="{ name: item.path }"
                                     class="nav-link">
                            {{ item.label }}
                        </router-link>

                    </li>
                </ul>

                <ul class="navbar-nav ml-auto">
                    <li class="nav-item dropdown">
                        <a href="#"
                            id="username-dropdown"
                            role="button"
                            class="nav-link dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                            Customer Name
                        </a>
                        <div class="dropdown-menu">
                            <a href="#" class="dropdown-item" @click.prevent="logout">
                                Sign Out
                            </a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'sign-in' }"
                                     class="nav-link">
                            Sign In
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'sign-up' }"
                                     class="nav-link">
                            Sign Up
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>

        <div class="container">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
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
    methods: {
      logout() {

      }
    }
  }
</script>
