<template>
  <div
    :class="[isMobile ? 'view-more-item-mobile' : 'view-more-item-desktop']"
    @click="pushCategory">
    <b-row
      class="icon-container"
      no-gutters>
      <b-col class="d-flex align-items-center justify-content-center">
        <icon
          :size="iconSize"
          name="casino-plus-placeholder"
          class="opacity-4 mt-sm-2 mt-3"/>
      </b-col>
    </b-row>
    <div class="description">
      <b-row no-gutters>
        <b-col
          class="d-flex align-items-center justify-content-center font-weight-bold letter-spacing-2 text-arc-clr-iron-light">
          {{ $t('casino.discoverAll') }}
        </b-col>
      </b-row>
      <b-row no-gutters>
        <b-col
          class="d-flex align-items-center justify-content-center letter-spacing-2 opacity-4 font-weight-light">
          {{ categoryLabel }}
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  computed: {
    iconSize () {
      return this.isMobile ? 40 : 75
    },
    categoryLabel () {
      return this.category.label === 'New' ? this.$i18n.t('casino.newGames') : this.category.label
    }
  },
  methods: {
    pushCategory () {
      this.$router.push({ name: `${this.currentLobbyName}-category`,
        params: { category: this.category.context, label: this.category.label }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .view-more-item {
        &-desktop {
            flex: 0 0 auto;
            margin: 10px 0 10px 10px;
            cursor: pointer;
            border-radius: 5px;
            background-image: linear-gradient($arc-clr-soil-dark, #262626);
            height: 200px;
            max-width: 180px;
            width: 100%;
            position: relative;
            .icon-container {
                height: 65%;
            }
            .description {
                height: 35%;
            }
            &:hover {
                filter: brightness(.9);
                i {
                    transition: transform .5s ease;
                    transform: rotate(180deg);
                }

            }
        }
        &-mobile {
            margin: 5px 0 5px 5px;
            border-radius: 5px;
            height: 120px;
            width: 120px;
            background-image: linear-gradient($arc-clr-soil-dark, #262626);
            flex: 0 0 auto;
            overflow: hidden;
            font-size: 12px;
            .icon-container {
                height: 60%;
            }
            .description {
                height: 40%;
            }
        }
    }
</style>
