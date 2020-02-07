<template>
  <div>
    <loader v-if="!user" />
    <component
      v-if="user"
      :is="currentComponent"
      :user="user" />
  </div>
</template>

<script>
import { USER_QUERY } from '@/graphql/index'
export default {
  computed: {
    currentComponent () {
      const DepositPage = () => import(`@/views/account/account-deposit/DepositPage`)
      const AdditionalInfo = () => import(`@/views/account/account-additional-info/AdditionalInfo`)
      return this.user.needMoreInfo === false ? DepositPage : AdditionalInfo
    }
  },
  apollo: {
    user () {
      return {
        query: USER_QUERY,
      }
    }
  }
}
</script>
