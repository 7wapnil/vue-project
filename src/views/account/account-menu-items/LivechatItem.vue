<template>
  <b-nav-item
    :class="[ isMobile ? 'profile-modal-nav-mobile-item' : 'profile-modal-nav-item' ]"
    class="bg-arc-clr-soil-black"
    @click="toggleLivechat">
    <icon
      name="account-livechat"
      class="tab-icon"
      size="24px"/>
    <span class="ml-3 font-weight-bold font-size-14 tab-title">
      {{ title }}
    </span>
  </b-nav-item>
</template>

<script>
export default {
  data () {
    return {
      show: !this.$livechat.isHidden()
    }
  },
  computed: {
    title () {
      return this.show ? this.$i18n.t('account.tabs.livechat.close') : this.$i18n.t('account.tabs.livechat.open')
    }
  },
  created () {
    this.loadLocalStorage()
  },
  methods: {
    toggleLivechat () {
      this.show = !this.show
      localStorage.setItem('livechat_visible', JSON.stringify(this.show))
      return this.$livechat.isHidden() ? this.$livechat.showWidget() : this.$livechat.hideWidget()
    },
    loadLocalStorage () {
      if (localStorage.getItem('livechat_visible')) {
        this.show = JSON.parse(localStorage.getItem('livechat_visible'))
      }
    }
  }
}
</script>
