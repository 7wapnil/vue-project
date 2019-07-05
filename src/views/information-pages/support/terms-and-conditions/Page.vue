<template>
  <div>
    <static-content
      :items="tableOfContentItems"
      :contentful-id="id"/>
  </div>
</template>

<script>
import StaticContent from '@/views/layouts/information-page/StaticContent'

export default {
  components: { StaticContent },
  data () {
    return {
      id: process.env.VUE_APP_CONTENTFUL_SUPPORT_TERMS_AND_CONDITIONS_ID,
      tableOfContentItems: [
        { name: 'General Terms', id: 'terms' },
        { name: 'Definitions', id: 'definitions' },
        { name: 'Your account', id: 'your-account' },
        { name: 'Your responsibility', id: 'your-responsibility' },
        { name: 'Your warranties & representations', id: 'warranties' },
        { name: 'Financials', id: 'financials' },
        { name: 'Withdrawals', id: 'withdrawals' },
        { name: 'Wagering and making use of the player account', id: 'wagering' },
        { name: 'Verification', id: 'verification' },
        { name: 'Our rights', id: 'our-rights' },
        { name: 'Unplayed, aborted or incomplete games', id: 'unplayed' },
        { name: 'Investigation and suspension', id: 'investigation' },
        { name: 'Acceptable use', id: 'acceptable' },
        { name: 'Limitation of Liability', id: 'limitation' },
        { name: 'Intellectual property', id: 'intellectual' },
        { name: 'Governing law', id: 'law' }
      ]
    }
  }
}
</script>
