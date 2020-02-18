<template>
  <static-content
    :items="tableOfContentItems"
    :contentful-id="id"/>
</template>

<script>
import { buildDefaultMetaTags } from '@/helpers/meta'
import StaticContent from '@/views/layouts/information-page/StaticContent'

export default {
  components: { StaticContent },
  data () {
    return {
      id: process.env.VUE_APP_CONTENTFUL_SUPPORT_BETTING_RULES_ID,
      tableOfContentItems: [
        { name: 'General', id: 'general' },
        { name: 'Soccer', id: 'soccer' },
        { name: 'Tennis', id: 'tennis' },
        { name: 'Basketball', id: 'basketball' },
        { name: 'American Football', id: 'american-football' },
        { name: 'Ice Hockey', id: 'ice-hockey' },
        { name: 'Baseball', id: 'baseball' },
        { name: 'Handball', id: 'handball' },
        { name: 'Volleyball', id: 'volleyball' },
        { name: 'Beach Volleyball', id: 'beach-volleyball' },
        { name: 'Futsal', id: 'futsal' },
        { name: 'Badminton', id: 'badminton' },
        { name: 'Rugby Union & League', id: 'rugby-union-league' },
        { name: 'Darts', id: 'darts' },
        { name: 'Snooker', id: 'snooker' },
        { name: 'Table Tennis', id: 'table-tennis' },
        { name: 'Bowls', id: 'bowls' },
        { name: 'Cricket T20 & ODI', id: 'cricket' },
        { name: 'Squash', id: 'squash' },
        { name: 'Winter Sports', id: 'winter-sports' },
        { name: 'Esports General', id: 'esport-general' },
        { name: 'CS:GO', id: 'cs-go' },
        { name: 'Dota 2 & League of Legends', id: 'dota-lol' }
      ]
    }
  },
  metaInfo () {
    if (!this.$i18n) return

    return buildDefaultMetaTags({
      title: this.$i18n.t('meta.support.bettingRules.title'),
      description: this.$i18n.t('meta.support.bettingRules.description'),
      i18n: this.$i18n,
      siteUrl: window.location.href
    })
  }
}
</script>
