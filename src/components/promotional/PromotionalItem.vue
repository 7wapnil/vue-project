<template>
  <div v-if="!getBetsCount && uri">
    <b-img
      :src="uri"
      class="p-0 my-4 mx-2 promotional-area"
      alt="arcanebet-promocode"
      @click="getBonus"/>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      banners: []
    }
  },
  computed: {
    ...mapGetters('betslip', [
      'getBetsCount'
    ]),
    ...mapGetters([
      'isLoggedIn'
    ]),
    uri () {
      let url = ''
      if (!this.banners) return null

      this.banners.map(banner => {
        if (banner.fields.title === this.$route.params.titleKind) {
          url = banner.fields.file.url
        }
      })

      return url
    }
  },
  mounted () {
    this.$contentful.getEntry(process.env.VUE_APP_CONTENTFUL_PROMOTIONS_BANNER_ID).then(res => {
      this.banners = res.fields.banners
    })
  },
  methods: {
    ...mapMutations('tabs', {
      changeTabIndex: 'changeTabIndex'
    }),
    getBonus () {
      return this.isLoggedIn ? this.showProfile() : this.showLogin()
    },
    showProfile () {
      this.changeTabIndex(3)
      this.$bvModal.show('AccountModal')
    },
    showLogin () {
      this.$bvModal.show('AuthModal')
    }
  }
}
</script>
