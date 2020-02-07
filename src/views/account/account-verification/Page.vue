<template>
  <div>
    <loader v-if="!user" />
    <component
      v-if="user"
      :is="currentComponent"
      :user="user"
      type="account-verification" />
  </div>
</template>

<script>
import { USER_QUERY } from '@/graphql/index'
export default {
  computed: {
    currentComponent () {
      const AccountVerification = () => import(`@/views/account/account-verification/AccountVerification`)
      const AdditionalInfo = () => import(`@/views/account/account-additional-info/AdditionalInfo`)
      return this.user.needMoreInfo === false ? AccountVerification : AdditionalInfo
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
