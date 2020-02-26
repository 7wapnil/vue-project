<template>
  <div>
    <category-play-items
      :play-items="gamesCollection"/>
    <loader v-if="$apollo.loading"/>
    <b-row no-gutters>
      <b-col
        v-observe-visibility="loadMoreGames"
        v-if="!lastPage"/>
      <b-col
        v-if="!$apollo.loading && !gamesCollection.length"
        class="text-center p-4">
        {{ this.$i18n.t('casino.playItemsList.noResults') }}
      </b-col>
    </b-row>
  </div>
</template>

<script>
import CategoryPlayItems from './play-items-list/CategoryPlayItems'
import { CACHE_AND_NETWORK } from '@/constants/graphql/fetch-policy'
import { GAMES_QUERY } from '@/graphql'
import { mapMutations, mapGetters } from 'vuex'
import { setCookie, getCookie } from '@/helpers/cookies'

export default {
  components: {
    CategoryPlayItems
  },
  props: {
    category: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      gamesCollection: [],
      paginationProps: Object,
      itemsPerPage: 25,
      page: 1,
      positionSet: false
    }
  },
  apollo: {
    games () {
      return {
        query: GAMES_QUERY,
        fetchPolicy: CACHE_AND_NETWORK,
        variables () {
          return {
            context: this.category,
            page: 1,
            perPage: this.getScrollStatus ? Number(getCookie('page')) * this.itemsPerPage : this.itemsPerPage
          }
        },
        result ({ data }) {
          this.gamesCollection = data.games.collection
          this.paginationProps = data.games.pagination

          if (this.getLazyLoadPosition && this.getScrollStatus && !this.positionSet) {
            const nextExists = Number(getCookie('page')) < Math.ceil(this.paginationProps.count / this.itemsPerPage)
            this.paginationProps.next = nextExists ? Number(getCookie('page')) + 1 : null
            this.setPosition()
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'getLazyLoadPageNumber',
      'getLazyLoadPosition',
      'getScrollStatus'
    ]),
    lastPage () {
      return this.paginationProps.next === null
    }
  },
  watch: {
    'page': 'savePageNumber'
  },
  methods: {
    ...mapMutations({
      storeLazyLoadPageNumber: 'storeLazyLoadPageNumber',
      storeLazyLoadPosition: 'storeLazyLoadPosition',
      storeScrollStatus: 'storeScrollStatus'
    }),
    loadMoreGames (isVisible) {
      if (this.$apollo.loading || !isVisible) return

      this.page = this.paginationProps.next
      this.$apollo.queries.games.fetchMore({
        variables: {
          perPage: this.itemsPerPage,
          page: this.page
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult
          return {
            games: {
              collection: this.mergePlayItems(previousResult, fetchMoreResult),
              __typename: previousResult.games.__typename,
              pagination: fetchMoreResult.games.pagination
            }
          }
        }
      })
    },
    mergePlayItems (oldItems, newItems) {
      oldItems.games.collection.push(...newItems.games.collection)

      return oldItems.games.collection
    },
    savePageNumber () {
      return setCookie('page', +this.page)
    },
    setPosition () {
      setTimeout(() => { window.scrollTo(0, this.getLazyLoadPosition.y) }, 1)
      this.positionSet = true
    }
  }
}
</script>
