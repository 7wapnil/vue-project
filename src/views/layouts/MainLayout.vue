<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <router-link
                    :to="{ path: 'home' }"
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

                        <router-link :to="{ path: item.path }"
                                     class="nav-link">
                            {{ item.label }}
                        </router-link>

                    </li>
                </ul>

                <ul class="navbar-nav mr-auto">
                    <li class="nav-item"
                        v-for="item in authMenu"
                        :key="item.path">

                        <router-link :to="{ path: item.path }"
                                     class="nav-link">
                            {{ item.label }}
                        </router-link>

                    </li>
                </ul>
            </div>
        </nav>

        <div class="container">
            <router-view></router-view>
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
          path: 'outrights',
          label: 'Outrights'
        }, {
          path: 'sports',
          label: 'Sports'
        }, {
          path: 'live-casino',
          label: 'Live casino'
        }],
        authMenu: []
      }
    }
  }
</script>
