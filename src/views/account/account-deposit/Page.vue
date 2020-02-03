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
      const DepositAdditionalInfo = () => import(`@/views/account/account-deposit/DepositAdditionalInfo`)
      return this.user.needMoreInfo === false ? DepositPage : DepositAdditionalInfo
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
