<template>
  <b-row no-gutters>
    <b-col
      class="promotional-block"
      @click="pushGame"/>
  </b-row>
</template>

<script>
export default {
  methods: {
    pushGame () {
      this.$router.push({ name: 'welcome offer casino' })
    }
  }
}
</script>

<style lang="scss"
       scoped>
    .promotional-block {
        height: 259px;
        max-width: 248px;
        border-radius: 4px;
        box-shadow: 0 0 10px 2px #101010;
        background-image:
                url(#{'~@/assets/images/promotional/arcanebet-casino-page-small-banner.png'});
    }
</style>
