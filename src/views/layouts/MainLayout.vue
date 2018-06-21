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
                        router-link.nav-link(:to="{ name: item.path }")
                            | {{ item.label }}

                ul.navbar-nav.ml-auto
                    li.nav-item.dropdown
                        a#username-dropdown.nav-link.dropdown-toggle(
                            href="#"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        ) Customer Name
                        .dropdown-menu
                            a.dropdown-item(
                                href="#"
                                @click.prevent="logout"
                            ) Sign Out
                    li.nav-item
                        router-link.nav-link(:to="{ name: 'sign-in' }")
                            | Sign In
                    li.nav-item
                        router-link.nav-link(:to="{ name: 'sign-up' }")
                            | Sign Up

        .container
            slot
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
