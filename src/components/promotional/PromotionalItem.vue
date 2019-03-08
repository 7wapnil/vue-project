<template>
  <b-img
    :src="uri"
    class="p-0 mb-0 mx-2 promotional-area"
    alt="arcanebet-promocode"
    @click="getBonus"/>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import contentfulApi from '@/utils/contentful-client'
import { PROMOTIONS_BANNER } from '@/constants/contentful/misc-ids'

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
    contentfulApi.getEntry(PROMOTIONS_BANNER).then(res => {
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
      this.changeTabIndex(1)
      this.$root.$emit('bv::show::modal', 'AccountModal')
    },
    showLogin () {
      this.$root.$emit('bv::show::modal', 'AuthModal')
    }
  }
}
</script>
