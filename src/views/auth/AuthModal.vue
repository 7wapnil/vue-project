<template>
  <modal
    id="AuthModal"
    title="Welcome to ArcaneBet"
    title-tag="h4"
    :lazy="false"
    header-class="header">
    <div slot="modal-header-close">
      X <!-- Add custom icon -->
    </div>

    <b-card
      no-body
      bg-variant="arc-clr-soil-dark">
      <b-tabs
        v-model="tabIndex"
        content-class="content">
        <b-tab
          :title-link-class="changeStyleTab(0)"
          title-item-class="w-50 text-center"
          title="Sign in">
          <login
            modal-name="AuthModal"
            @tab-changed="changeTab"/>
        </b-tab>
        <b-tab
          :title-link-class="changeStyleTab(1)"
          title-item-class="w-50 text-center"
          title="Sign up">
          <sign-up
            modal-name="AuthModal"
            @tab-changed="changeTab"/>
        </b-tab>
      </b-tabs>
    </b-card>
  </modal>
</template>

<script>
import Login from './Login'
import SignUp from './SignUp'

export default {
  components: {
    SignUp,
    Login
  },
  props: {
    tab: {
      type: Number,
      default: 0,
      required: false
    },
  },
  data () {
    return {
      tabIndex: this.tab
    }
  },
  watch: {
    tab: function (newTab) {
      this.tabIndex = newTab
    }
  },
  methods: {
    changeStyleTab (index) {
      if (this.tabIndex === index) {
        return 'authActiveTab'
      } else {
        return 'authTab'
      }
    },
    changeTab (tab) {
      this.tabIndex = tab
    }
  }
}
</script>
